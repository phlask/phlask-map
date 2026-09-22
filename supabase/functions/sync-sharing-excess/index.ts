// Sharing Excess Calendar Sync — Supabase Edge Function
// Fetches upcoming events from the Sharing Excess public Google Calendar,
// geocodes locations, and upserts them into the `resources` table.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import ICAL from "https://esm.sh/ical.js@2.1.0";

// --- Config ---

const CALENDAR_ID =
  Deno.env.get("GOOGLE_CALENDAR_ID") ??
  "c_d43974649dbbaa8699b3583c8aa847737aecda4539202c423471282eedd44bbc@group.calendar.google.com";

const LOOK_FORWARD_DAYS = Number(Deno.env.get("LOOK_FORWARD_DAYS") ?? "30");
const TABLE_NAME = "resources";
const CREATOR = "phlask-sharing-excess-sync";
const SOURCE_URL = "https://www.sharingexcess.com/find-food";
const NOMINATIM_ENDPOINT = "https://nominatim.openstreetmap.org/search";
const NOMINATIM_UA = "phlask-map/2.0 (https://phlask.me)";

// --- Address parsing ---

interface ParsedLocation {
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
}

function parseLocation(location: string): ParsedLocation {
  if (!location) return {};

  const pattern =
    /^(.+),\s*([^,]+),\s*([A-Z]{2})\s+(\d{5})(?:-\d{4})?(?:,\s*USA)?$/;
  const m = location.trim().match(pattern);
  if (!m) return { address: location };

  const [, streetPart, city, state, zipCode] = m;
  const parts = streetPart.split(",").map((p) => p.trim());
  let address = parts[parts.length - 1];
  for (let i = parts.length - 1; i >= 0; i--) {
    if (parts[i] && /^\d/.test(parts[i])) {
      address = parts[i];
      break;
    }
  }

  return {
    address,
    city: city.trim(),
    state: state.trim(),
    zip_code: zipCode.trim(),
  };
}

function cleanAddress(address: string): string {
  let cleaned = address.replace(/(\d+)-\d+\b/g, "$1");
  cleaned = cleaned.replace(/\s*[#][\w-]+/g, "");
  cleaned = cleaned.replace(
    /,?\s*\b(?:ste|suite|apt|unit|room|rm|fl|floor)\b\.?\s*\S+/gi,
    ""
  );
  return cleaned.trim().replace(/,$/, "");
}

// --- Geocoding ---

async function geocodeQuery(
  query: string
): Promise<[number, number] | null> {
  try {
    const url = new URL(NOMINATIM_ENDPOINT);
    url.searchParams.set("q", query);
    url.searchParams.set("format", "json");
    url.searchParams.set("limit", "1");
    const resp = await fetch(url.toString(), {
      headers: { "User-Agent": NOMINATIM_UA },
    });
    if (!resp.ok) return null;
    const results = await resp.json();
    if (results.length > 0) {
      return [parseFloat(results[0].lat), parseFloat(results[0].lon)];
    }
  } catch (e) {
    console.error(`  Geocoding failed for '${query}':`, e);
  }
  return null;
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

function joinParts(parts: (string | undefined)[]): string {
  return parts.filter(Boolean).join(", ");
}

async function geocodeLocation(
  location: string | null,
  parsed: ParsedLocation
): Promise<[number, number] | null> {
  if (!location) return null;

  // Attempt 1: full location string
  let coords = await geocodeQuery(location);

  // Fallback 1: parsed street address + city/state/zip
  if (!coords && parsed.address) {
    await sleep(1000);
    coords = await geocodeQuery(
      joinParts([parsed.address, parsed.city, parsed.state, parsed.zip_code])
    );
  }

  // Fallback 2: cleaned address (simplify ranges, drop suite numbers)
  if (!coords && parsed.address) {
    const cleaned = cleanAddress(parsed.address);
    if (cleaned !== parsed.address) {
      await sleep(1000);
      coords = await geocodeQuery(
        joinParts([cleaned, parsed.city, parsed.state, parsed.zip_code])
      );
    }
  }

  // Fallback 3: venue/landmark name + city/state
  if (!coords && parsed.city && parsed.state) {
    const parts = location.split(",").map((p) => p.trim());
    const venue = parts[0];
    if (venue && !/^\d/.test(venue)) {
      await sleep(1000);
      coords = await geocodeQuery(`${venue}, ${parsed.city}, ${parsed.state}`);
    }
  }

  return coords;
}

// --- iCal fetch & recurring event expansion ---

interface RawEvent {
  uid: string;
  summary: string;
  start_at: string;
  end_at: string | null;
  description: string | null;
  location: string | null;
  all_day: boolean;
}

function fetchAndExpandEvents(
  icalText: string,
  lookForwardDays: number
): RawEvent[] {
  const jcal = ICAL.parse(icalText);
  const comp = new ICAL.Component(jcal);
  const vevents = comp.getAllSubcomponents("vevent");

  const now = new Date();
  const cutoff = new Date(now.getTime() + lookForwardDays * 86400_000);

  const events: RawEvent[] = [];

  for (const vevent of vevents) {
    const event = new ICAL.Event(vevent);

    if (event.isRecurring()) {
      const iter = event.iterator();
      let next: ICAL.Time | null;
      while ((next = iter.next())) {
        const jsDate = next.toJSDate();
        if (jsDate > cutoff) break;
        if (jsDate < now) continue;

        const duration = event.duration;
        const endTime = next.clone();
        endTime.addDuration(duration);

        events.push({
          uid: event.uid + "_" + next.toString(),
          summary: event.summary ?? "",
          start_at: jsDate.toISOString(),
          end_at: endTime.toJSDate().toISOString(),
          description: event.description ?? null,
          location: event.location ?? null,
          all_day: next.isDate,
        });
      }
    } else {
      const start = event.startDate;
      const end = event.endDate;
      const jsStart = start.toJSDate();

      if (jsStart > cutoff || jsStart < now) continue;

      events.push({
        uid: event.uid ?? "",
        summary: event.summary ?? "",
        start_at: jsStart.toISOString(),
        end_at: end ? end.toJSDate().toISOString() : null,
        description: event.description ?? null,
        location: event.location ?? null,
        all_day: start.isDate,
      });
    }
  }

  events.sort((a, b) => a.start_at.localeCompare(b.start_at));
  return events;
}

// --- Normalization ---

function parseEventDt(isoStr: string): Date {
  return new Date(isoStr);
}

function buildHours(startDt: Date, endDt: Date | null) {
  function timePoint(dt: Date, truncated = false) {
    // Google day numbering: 0=Sun…6=Sat. JS getUTCDay() is the same.
    return {
      date: dt.toISOString().slice(0, 10),
      truncated,
      day: dt.getUTCDay(),
      hour: dt.getUTCHours(),
      minute: dt.getUTCMinutes(),
    };
  }
  return [
    {
      open: timePoint(startDt),
      close: endDt ? timePoint(endDt) : timePoint(startDt, true),
    },
  ];
}

function buildDescription(
  original: string | null,
  startIso: string,
  endIso: string | null
): string {
  const endPart = endIso ? ` | end: ${endIso}` : "";
  const header = `[[ start: ${startIso}${endPart} ]]`;
  return original ? `${header}\n${original}` : header;
}

// deno-lint-ignore no-explicit-any
async function eventToResource(event: RawEvent): Promise<Record<string, any> | null> {
  const parsed = parseLocation(event.location ?? "");
  const coords = await geocodeLocation(event.location, parsed);

  if (!coords) {
    console.warn(
      `  Skipping '${event.summary}' — could not geocode: '${event.location}'`
    );
    return null;
  }

  const [lat, lon] = coords;
  await sleep(1000); // Nominatim rate limit
  const nowIso = new Date().toISOString();
  const startDt = parseEventDt(event.start_at);
  const endDt = event.end_at ? parseEventDt(event.end_at) : null;

  return {
    version: 1,
    creator: CREATOR,
    last_modifier: CREATOR,
    date_created: nowIso,
    last_modified: nowIso,
    source: { type: "WEB_SCRAPE", url: SOURCE_URL },
    verification: {
      verified: false,
      last_modified: nowIso,
      last_modifier: CREATOR,
    },
    resource_type: "FOOD",
    status: "OPERATIONAL",
    entry_type: "UNSURE",
    name: event.summary,
    description: buildDescription(
      event.description,
      event.start_at,
      event.end_at
    ),
    address: parsed.address ?? null,
    city: parsed.city ?? null,
    state: parsed.state ?? null,
    zip_code: parsed.zip_code ?? null,
    latitude: lat,
    longitude: lon,
    gp_id: event.uid,
    food: {
      food_type: [],
      distribution_type: ["PICKUP"],
      organization_type: "NON_PROFIT",
      organization_name: "Sharing Excess",
      organization_url: SOURCE_URL,
      tags: [],
    },
    hours: buildHours(startDt, endDt),
    images: null,
    guidelines: null,
    water: null,
    forage: null,
    bathroom: null,
  };
}

// --- Supabase helpers ---

// deno-lint-ignore no-explicit-any
async function upsertResources(supabase: any, resources: Record<string, any>[]) {
  if (!resources.length) {
    console.log("No resources to upsert.");
    return;
  }

  const gpIds = resources.map((r) => r.gp_id);
  const { data: existing } = await supabase
    .from(TABLE_NAME)
    .select("id, gp_id, date_created")
    .in("gp_id", gpIds);

  // deno-lint-ignore no-explicit-any
  const existingMap = new Map((existing ?? []).map((r: any) => [r.gp_id, r]));

  const toInsert = [];
  const toUpdate = [];

  for (const r of resources) {
    // deno-lint-ignore no-explicit-any
    const prev = existingMap.get(r.gp_id) as any;
    if (prev) {
      toUpdate.push({ id: prev.id, row: { ...r, date_created: prev.date_created } });
    } else {
      toInsert.push(r);
    }
  }

  if (toInsert.length) {
    await supabase.from(TABLE_NAME).insert(toInsert);
    console.log(`Inserted ${toInsert.length} new resource(s).`);
  }

  for (const { id, row } of toUpdate) {
    await supabase.from(TABLE_NAME).update(row).eq("id", id);
  }
  if (toUpdate.length) {
    console.log(`Updated ${toUpdate.length} existing resource(s).`);
  }
}

// deno-lint-ignore no-explicit-any
async function deleteStaleResources(supabase: any, currentGpIds: string[]) {
  if (!currentGpIds.length) return;
  await supabase
    .from(TABLE_NAME)
    .delete()
    .filter("source->>url", "eq", SOURCE_URL)
    .not("gp_id", "in", `(${currentGpIds.join(",")})`);
  console.log("Removed stale Sharing Excess resources outside the current window.");
}

// --- Handler ---

Deno.serve(async (req) => {
  // Optional: protect with a shared secret
  const authHeader = req.headers.get("Authorization");
  const expectedToken = Deno.env.get("SYNC_SECRET");
  if (expectedToken && authHeader !== `Bearer ${expectedToken}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Fetch iCal
    const icalUrl = `https://calendar.google.com/calendar/ical/${encodeURIComponent(CALENDAR_ID)}/public/basic.ics`;
    console.log(`Fetching calendar from ${icalUrl}...`);
    const icalResp = await fetch(icalUrl);
    if (!icalResp.ok) {
      throw new Error(`Failed to fetch calendar: ${icalResp.status}`);
    }
    const icalText = await icalResp.text();

    // Parse & expand recurring events
    const events = fetchAndExpandEvents(icalText, LOOK_FORWARD_DAYS);
    console.log(`Found ${events.length} event(s) in window. Geocoding...`);

    // Normalize
    const resources = [];
    for (const event of events) {
      console.log(`  Processing: ${event.summary}`);
      const resource = await eventToResource(event);
      if (resource) resources.push(resource);
    }
    console.log(`Normalized ${resources.length} resource(s).`);

    // Upsert & clean up
    await upsertResources(supabase, resources);
    await deleteStaleResources(
      supabase,
      resources.map((r) => r.gp_id)
    );

    return new Response(
      JSON.stringify({
        ok: true,
        fetched: events.length,
        synced: resources.length,
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Sync failed:", err);
    return new Response(
      JSON.stringify({ ok: false, error: String(err) }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});
