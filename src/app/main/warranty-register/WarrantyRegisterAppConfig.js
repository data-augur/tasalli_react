import WarrantyRegisterApp from "./WarrantyRegisterApp";

export const WarrantyRegisterAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes: [
        {
            path: '/warranty-register',
            component: WarrantyRegisterApp
        }
    ]
};
