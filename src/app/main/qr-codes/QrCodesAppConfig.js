import QrCodesApp from './QrCodesApp';

export const QrCodesAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes: [
        {
            path: '/qrcodes',
            component: QrCodesApp
        }
    ]
};
