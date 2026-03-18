import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SCRAPE_URL =
  'https://www.sharefoodprogram.org/wp-json/wpgmza/v1/features/base64eJyrVkrLzClJLVKyUqqOUcpNLIjPTIlRsopRMo5R0gEJFGeUFni6FAPFomOBAsmlxSX5uW6ZqTkpELFapVoABaMWvA';

function htmlToText(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function extractStreet(address: string): string {
  return address.split(', ')[0];
}

Deno.serve(async () => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );

  const response = await fetch(SCRAPE_URL, {
    headers: { 'User-Agent': 'PostmanRuntime/7.43.0' },
  });
  const data = await response.json();

  const now = new Date().toISOString();

  // deno-lint-ignore no-explicit-any
  const resources = data.markers
    .filter((m: any) => m.approved === '1')
    .map((m: any) => ({
      date_created: now,
      creator: 'phlask',
      last_modified: now,
      last_modifier: 'phlask',
      source: { type: 'WEB_SCRAPE', url: SCRAPE_URL },
      verification: { verified: true, last_modified: now, verifier: 'phlask' },
      resource_type: 'FOOD',
      address: extractStreet(m.address),
      city: 'Philadelphia',
      state: 'PA',
      zip_code: null, // TODO: reverse geocode from lat/lng
      latitude: parseFloat(m.lat),
      longitude: parseFloat(m.lng),
      name: m.title,
      description: htmlToText(m.description),
      status: 'OPERATIONAL',
      entry_type: 'UNSURE',
      images: [],
      food: {
        food_type: [],
        distribution_type: [],
        organization_type: 'UNSURE',
        organization_url: 'https://www.sharefoodprogram.org',
      },
      providers: [
        {
          name: 'Share Food Program',
          logo_url:
            'https://www.sharefoodprogram.org/wp-content/themes/sharefood-theme/images/svg/share-food-program-logo.svg',
          url: 'https://www.sharefoodprogram.org',
        },
      ],
      version: 1,
    }));

  // Remove stale scraped entries before inserting fresh data
  const { error: deleteError } = await supabase
    .from('resources')
    .delete()
    .eq('source->>url', SCRAPE_URL);

  if (deleteError) {
    return new Response(JSON.stringify({ error: deleteError.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { error: insertError } = await supabase
    .from('resources')
    .insert(resources);

  if (insertError) {
    return new Response(JSON.stringify({ error: insertError.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ inserted: resources.length }), {
    headers: { 'Content-Type': 'application/json' },
  });
});
