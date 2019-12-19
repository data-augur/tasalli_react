import WarrantyClaimApp from './WarrantyClaimApp';

export const WarrantyClaimAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes: [
        {
            path: '/warranty-claim',
            component: WarrantyClaimApp
        }
    ]
};
