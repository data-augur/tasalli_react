const navigationConfig = [
  {
    id: 'applications',
    title: 'Applications',
    type: 'group',
    icon: 'whatshot',
    children: [
      {
        id: 'companies-component',
        title: 'Companies',
        type: 'item',
        icon: 'whatshot',
        url: '/companies'
      },
      {
        id: 'brands-component',
        title: 'Brands',
        type: 'item',
        icon: 'whatshot',
        url: '/brands'
      },
      {
        id: 'brand-admin-component',
        title: 'Brand Users',
        type: 'item',
        icon: 'whatshot',
        url: '/brand-users'
      }
    ]
  },
  {
    id: 'user auth',
    title: 'User Management',
    type: 'group',
    icon: 'whatshot',
    children: [
      // {
      //   id: 'login-component',
      //   title: 'Login',
      //   type: 'item',
      //   icon: 'whatshot',
      //   url: '/su-admin/login'
      // },
      {
        id: 'logout-component',
        title: 'Logout',
        type: 'item',
        icon: 'whatshot',
        url: '/logout'
      }
    ]
  }
];

export default navigationConfig;
