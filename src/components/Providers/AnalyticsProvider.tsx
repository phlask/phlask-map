import { PostHogProvider } from 'posthog-js/react';
import type { PropsWithChildren } from 'react';

const APIHOST = 'https://us.i.posthog.com';
const APIKEY = import.meta.env.VITE_PUBLIC_POSTHOG_KEY;

const postHogOptions = {
  api_host: APIHOST,
  mask_all_text: true
};

const AnalyticsProvider = ({ children }: PropsWithChildren) => {
  // Do not enable analytics for local development
  // This helps save on analytics costs and API limits
  if (
    window.location.host.includes('localhost') ||
    window.location.host.includes('127.0.0.1')
  )
    return children;

  if (!APIKEY) {
    const message = import.meta.env.DEV
      ? 'PostHog credentials are missing! Make sure that `VITE_PUBLIC_POSTHOG_KEY` is defined in your `.env` file. Refer to `.example.env`.'
      : 'An unexpected error happened with analytics. Please try again later.';
    throw new Error(message);
  }

  return (
    <PostHogProvider apiKey={APIKEY} options={postHogOptions}>
      {children}
    </PostHogProvider>
  );
};

export default AnalyticsProvider;
