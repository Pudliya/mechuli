import React from 'react';
import DetailBar from '../components/DetailBar';
import { QueryClient, QueryClientProvider } from 'react-query';
import DetailModal from '../components/DetailModal';

const queryClient = new QueryClient();

function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <DetailBar />
      <DetailModal />
    </QueryClientProvider>
  );
}

export default Home;
