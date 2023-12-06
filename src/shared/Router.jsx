import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../components/Layout';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
