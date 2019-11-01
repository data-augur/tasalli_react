import AdminUserApp from './AdminUserApp';
export const AdminUsersAppConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  routes: [
    {
      path: '/admin-users',
      component: AdminUserApp
    }
  ]
};
