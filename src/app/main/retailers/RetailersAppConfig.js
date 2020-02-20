import RetailersApp from './RetailersApp';

export const RetailersAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes: [
        {
            path: '/retailers',
            component: RetailersApp
        }
    ]
};
