import { PostHogProvider } from 'posthog-js/react';
import type { PropsWithChildren } from 'react';
import { env } from 'config';

const APIHOST = 'https://us.i.posthog.com';
const APIKEY = env.PUBLIC_POSTHOG_KEY;

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

  return (
    <PostHogProvider apiKey={APIKEY} options={postHogOptions}>
      {children}
    </PostHogProvider>
  );
};

export default AnalyticsProvider;
