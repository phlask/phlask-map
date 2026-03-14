import { z } from 'zod';

const envSchema = z.object({
  DB_API_KEY: z.string(),
  GOOGLE_MAPS_API_KEY: z.string(),
  OPEN_ROUTE_SERVICE_API_KEY: z.string(),
  PUBLIC_POSTHOG_KEY: z.string(),
  VERIFICATION_PASSWORD: z.string(),
});

export const env = envSchema.parse({
  DB_API_KEY: import.meta.env.VITE_DB_API_KEY,
  GOOGLE_MAPS_API_KEY: import.meta.env.VITE_REACT_GOOGLE_MAPS_API_KEY,
  OPEN_ROUTE_SERVICE_API_KEY: import.meta.env.VITE_OPEN_ROUTE_SERVICE_API_KEY,
  PUBLIC_POSTHOG_KEY: import.meta.env.VITE_PUBLIC_POSTHOG_KEY,
  VERIFICATION_PASSWORD: import.meta.env.VITE_VERIFICATION_PASSWORD,
});
