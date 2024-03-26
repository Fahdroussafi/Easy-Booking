import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { useState } from 'react';

import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '@/components/layouts/AppLayout';
import DevTools from '@/components/Devtools';
import { config } from '@/lib/react-query-config';

const env = process.env.NODE_ENV;
if (env === 'production') {
  console.log = () => {};
} else {
}

function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient(config));

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Head>
          <title>Bus Booking</title>
        </Head>
        <MantineProvider withGlobalStyles withNormalizeCSS>
          {/* <GlobalRoleProvider> */}
          <Layout>
            <Component {...pageProps} />
          </Layout>
          {/* </GlobalRoleProvider> */}
        </MantineProvider>
      </Hydrate>
      <DevTools />
    </QueryClientProvider>
  );
}

export default App;
