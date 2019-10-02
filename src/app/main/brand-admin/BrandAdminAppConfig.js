import BrandAdminApp from './BrandAdminApp';
export const BrandAdminAppConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  routes: [
    {
      path: '/brand-users',
      component: BrandAdminApp
    }
  ]
};
