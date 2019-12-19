import WarrantyRegistrationApp from "./WarrantyRegistrationApp";

export const WarrantyRegistrationAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes: [
        {
            path: '/warranty-registration',
            component: WarrantyRegistrationApp
        }
    ]
};
