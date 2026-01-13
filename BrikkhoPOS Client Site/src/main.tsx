import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';
import './index.css';
import { ThemeProvider } from './provider/theme-provider';
import { store } from './redux/store';
import router from './routers/router';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ReduxProvider store={store}>
            <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
                <RouterProvider router={router} />
                <Toaster richColors />
            </ThemeProvider>
        </ReduxProvider>
    </StrictMode>
);
