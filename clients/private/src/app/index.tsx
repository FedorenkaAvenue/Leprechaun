import * as ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import router from './router';
import { store } from './store';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
        <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            closeOnClick
            theme="colored"
            transition={Bounce}
            limit={5}
        />
    </StrictMode>,
);
