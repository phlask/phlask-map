import { PostHogProvider } from 'posthog-js/react';
import { PropsWithChildren } from 'react';

const postHogOptions = {
  api_host:
    import.meta.env.VITE_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
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
    <PostHogProvider
      apiKey={
        import.meta.env.VITE_PUBLIC_POSTHOG_KEY ||
        'phc_I0pbyDLZ2ifEgaQaum7vDVkqmwSrLle3SHbNi8tgwpY'
      }
      options={postHogOptions}
    >
      {children}
    </PostHogProvider>
  );
};

export default AnalyticsProvider;
