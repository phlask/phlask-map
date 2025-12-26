import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default queryClient;

window.__TANSTACK_QUERY_CLIENT__ = queryClient;
