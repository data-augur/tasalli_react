import jwt from 'jsonwebtoken';

let role = null;
const token = localStorage.getItem('jwtToken');
if (token) {
  var bearer = token.split(' ');

  try {
    const decoded = jwt.verify(bearer[1], 'secret');
    if (decoded) {
      role = decoded.role;
    }
  } catch (err) {
    if (err) {
      console.log(err);
      this.props.history.push('/login');
    }
  }
}
// else
// {
//   if(window.location.pathname === '/su-admin/'||window.location.pathname === '/su-admin') {
//     window.location = '/su-admin/login';
//   }
// }
const superAdminNavigationConfig = [
  {
    id: 'applications',
    title: 'Users',
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
        id: 'company-admin-component',
        title: 'Company Users',
        type: 'item',
        icon: 'whatshot',
        url: '/brand-users'
      },
      {
        id: 'app-user-component',
        title: 'App Users',
        type: 'item',
        icon: 'whatshot',
        url: '/app-users'
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

const companyAdminnavigationConfig = [
  {
    id: 'applications',
    title: 'Applications',
    type: 'group',
    icon: 'whatshot',
    children: [
      {
        id: 'brands-component',
        title: 'Brands',
        type: 'item',
        icon: 'whatshot',
        url: '/brands'        //company admin brandss 
      },
      {
        id: 'brand-admin-component',
        title: 'Manage Users',
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

localStorage.setItem('Role',role);
var navigationConfig =
  role === 'superAdmin'
    ? superAdminNavigationConfig
    : role === 'brandAdmin'
    ? companyAdminnavigationConfig
    : role === 'companyAdmin'
    ? companyAdminnavigationConfig
    : superAdminNavigationConfig;
export default navigationConfig;
