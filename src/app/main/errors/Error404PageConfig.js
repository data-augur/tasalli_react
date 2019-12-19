import Error404Page from './Error404Page';

export const Error404PageConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes: [
        {
            path: '/404',
            component: Error404Page
        }
    ]
};
