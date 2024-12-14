import React from 'react';
import { createRoot } from 'react-dom/client';

import { ConfigProvider } from './contexts/ConfigContext';

import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { QueryClient, QueryClientProvider } from 'react-query';

const container = document.getElementById('root');
const root = createRoot(container);

// Create a client
const queryClient = new QueryClient();

root.render(
  <ConfigProvider>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </ConfigProvider>
);

reportWebVitals();
