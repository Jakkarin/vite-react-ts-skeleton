import React from 'react';
import ReactDOM from 'react-dom/client';

import '@/index.css';

import routes from '@/routes';

import AxiosProvider from '@/providers/AxiosProvider';
import RouterProvider from '@/providers/RouterProvider';

import { ChakraProvider } from '@chakra-ui/react';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AxiosProvider baseURL='/api'>
      <ChakraProvider>
        <RouterProvider routes={routes} />
      </ChakraProvider>
    </AxiosProvider>
  </React.StrictMode>
);
