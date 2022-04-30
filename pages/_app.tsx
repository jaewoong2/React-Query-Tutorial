// _app.tsx
import '@styles/globals.css';

import { FC } from 'react';
import { AppProps } from 'next/app';
import { DefaultOptions, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

// staleTime 을 지정해줘야 쓸대 없는 re-fetch를 막을 수 있음 ( 똑같은 key를 fetch를 연속으로 안보냄 )
const defaultOptions: DefaultOptions = {
  queries: {
    staleTime: 5 * 1000,
  },
};

const reactQueryClient = new QueryClient({ defaultOptions });

const MyApp: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={reactQueryClient}>
      <ReactQueryDevtools initialIsOpen={true} />
      <Component {...pageProps} />
    </QueryClientProvider>
  );
};

export default MyApp;
