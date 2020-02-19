import QrcodesApp from './QrCodesApp';

export const QrCodesAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes: [
        {
            path: '/qrcodes',
            component: QrcodesApp
        }
    ]
};
