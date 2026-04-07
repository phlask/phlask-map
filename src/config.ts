import { z } from 'zod';

const envSchema = z.object({
  VITE_DB_API_KEY: z.string().min(1),
  VITE_REACT_GOOGLE_MAPS_API_KEY: z.string().min(1),
  VITE_OPEN_ROUTE_SERVICE_API_KEY: z.string().min(1),
  VITE_PUBLIC_POSTHOG_KEY: z.string().min(1),
  VITE_VERIFICATION_PASSWORD: z.string().min(1)
});

const result = envSchema.safeParse(import.meta.env);

if (!result.success) {
  console.error(result.error);
  throw new Error(
    `Environment variables are missing or invalid in your .env file. Check the error details above.`
  );
}

export const env = result.data;
