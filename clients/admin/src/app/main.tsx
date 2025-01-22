import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce, ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux'

import { store } from './store.ts';
import router from './router.tsx';
import './index.css';
import cacheClient from './cacheClient.ts';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <QueryClientProvider client={cacheClient}>
                <RouterProvider router={router} />
                <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    closeOnClick
                    theme="colored"
                    transition={Bounce}
                />
            </QueryClientProvider>
        </Provider>
    </StrictMode>,
)
