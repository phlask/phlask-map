#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';

// Configuration - uses environment variables or defaults
const databaseUrl =
  process.env.VITE_DB_URL || 'https://wantycfbnzzocsbthqzs.supabase.co';
const databaseApiKey =
  process.env.VITE_DB_API_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndhbnR5Y2Zibnp6b2NzYnRocXpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcwNDY2OTgsImV4cCI6MjA1MjYyMjY5OH0.yczsMOx3Y-zsWu-GjYEajIb0yw9fYWEIUglmmfM1zCY';

const supabase = createClient(databaseUrl, databaseApiKey);

// Known tables in the project
const KNOWN_TABLES = ['resources', 'contributors', 'contact_submissions'];

async function fetchEntries(tableName, limit = 100, orderBy = null) {
  let query = supabase.from(tableName).select('*').limit(limit);

  // If orderBy column is specified, order descending (most recent first)
  if (orderBy) {
    query = query.order(orderBy, { ascending: false });
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return data;
}

function printUsage() {
  console.log(`
Usage: yarn fetch-supabase <table-name> [options]

Arguments:
  table-name    Name of the Supabase table to fetch from

Options:
  --limit, -l   Number of entries to fetch (default: 100)
  --order, -o   Column to order by (descending, most recent first)
  --pretty, -p  Pretty print JSON output
  --help, -h    Show this help message

Known tables: ${KNOWN_TABLES.join(', ')}

Examples:
  yarn fetch-supabase resources
  yarn fetch-supabase resources --limit 50 --order created_at
  yarn fetch-supabase contributors -l 10 -p
`);
}

async function main() {
  const args = process.argv.slice(2);

  // Parse arguments
  let tableName = null;
  let limit = 100;
  let orderBy = null;
  let pretty = false;

  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];

    if (arg === '--help' || arg === '-h') {
      printUsage();
      process.exit(0);
    } else if (arg === '--limit' || arg === '-l') {
      i += 1;
      limit = parseInt(args[i], 10);
      if (Number.isNaN(limit) || limit < 1) {
        console.error('Error: --limit must be a positive number');
        process.exit(1);
      }
    } else if (arg === '--order' || arg === '-o') {
      i += 1;
      orderBy = args[i];
    } else if (arg === '--pretty' || arg === '-p') {
      pretty = true;
    } else if (!arg.startsWith('-')) {
      tableName = arg;
    }
  }

  if (!tableName) {
    console.error('Error: Table name is required\n');
    printUsage();
    process.exit(1);
  }

  try {
    console.error(`Fetching up to ${limit} entries from "${tableName}"...`);

    const data = await fetchEntries(tableName, limit, orderBy);

    console.error(`Retrieved ${data.length} entries\n`);

    // Output JSON to stdout (errors/info go to stderr)
    if (pretty) {
      console.log(JSON.stringify(data, null, 2));
    } else {
      console.log(JSON.stringify(data));
    }
  } catch (error) {
    console.error(`Error fetching from "${tableName}":`, error.message);
    process.exit(1);
  }
}

main();
