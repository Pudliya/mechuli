import React from 'react';
import DetailBar from '../components/DetailBar';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <DetailBar />
    </QueryClientProvider>
  );
}

export default Home;
