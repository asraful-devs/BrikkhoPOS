import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
    {
        path: '/',
        element: <div>Hello World</div>,
    },
    {
        path: '/fuck',
        element: <div>Hello fuck </div>,
    },
    // {
    //     path: '/dashboard',
    //     Component: Dashboard,
    //     children: [
    //         { index: true, Component: Home },
    //         { path: 'settings', Component: Settings },
    //     ],
    // },
]);

export default router;
