import CompaniesApp from './CompaniesApp';

export const CompaniesAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes: [
        {
            path: '/companies',
            component: CompaniesApp
        }
    ]
};
