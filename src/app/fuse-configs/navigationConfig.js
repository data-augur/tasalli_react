const navigationConfig = [
  {
    id: 'applications',
    // title: 'Applications',
    type: 'group',
    icon: 'whatshot',
    children: [
      {
        id: 'brand-admin-component',
        title: 'Brand Users',
        type: 'item',
        icon: 'whatshot',
        url: '/brand-users'
      },
      {
        id: 'login-component',
        title: 'Login',
        type: 'item',
        icon: 'whatshot',
        url: '/login'
      },
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
