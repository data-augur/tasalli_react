import jwt from 'jsonwebtoken';
import { Redirect } from 'react-router-dom';

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
        title: 'Admins',
        type: 'item',
        icon: 'people',
        url: '/admin-users'
      },
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
        icon: 'people',
        url: '/brand-users'
      },
      {
        id: 'app-user-component',
        title: 'App Users',
        type: 'item',
        icon: 'people',
        url: '/app-users'
      }
    ]
  },
  {
    id: 'applications',
    title: 'Notifications',
    type: 'group',
    icon: 'whatshot',
    children: [
      {
        id: 'notifications-component',
        title: 'Notifications',
        type: 'item',
        icon: 'book',
        url: '/notifications'
      },
    ]
  },
  {
    id: 'applications',
    title: 'Ads',
    type: 'group',
    icon: 'whatshot',
    children: [
      {
        id: 'companies-component',
        title: 'Ads',
        type: 'item',
        icon: 'book',
        url: '/ads'
      },
      {
        id: 'companies-component',
        title: 'Survey',
        type: 'item',
        icon: 'book',
        url: '/surveys'
      },
    ]
  },
  {
    id: 'applications',
    title: 'Warranty Management',
    type: 'group',
    icon: 'whatshot',
    children: [
      {
        id: 'companies-component',
        title: 'Products',
        type: 'item',
        icon: 'book',
        url: '/products'
      },
      {
        id: 'companies-component',
        title: 'Warranty Registration',
        type: 'item',
        icon: 'note',
        url: '/warranty-registration'
      },
      {
        id: 'companies-component',
        title: 'Warranty Claim',
        type: 'item',
        icon: 'note',
        url: '/warranty-claim'
      },
      {
        id: 'companies-component',
        title: 'Warranty Completion',
        type: 'item',
        icon: 'note',
        url: '/warranty-completion'
      }
    ]
  },
  {
    id: 'applications',
    title: 'User Warranty',
    type: 'group',
    icon: 'whatshot',
    children: [
      {
        id: 'companies-component',
        title: 'Registered Warranty',
        type: 'item',
        icon: 'note',
        url: '/warranty-register'
      },
      {
        id: 'companies-component',
        title: 'Claimed Warranty',
        type: 'item',
        icon: 'note',
        url: '/warranty-claimed'
      },
    ]
  },
  {
    id: 'applications',
    title: 'User Logs',
    type: 'group',
    icon: 'whatshot',
    children: [
      {
        id: 'companies-component',
        title: 'Logs',
        type: 'item',
        icon: 'book',
        url: '/logs'
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
        url: '/brands'
      }
    ]
  },
  {
    id: 'applications',
    title: 'Warranty Management',
    type: 'group',
    icon: 'whatshot',
    children: [
      {
        id: 'companies-component',
        title: 'Products',
        type: 'item',
        icon: 'book',
        url: '/products'
      },
      {
        id: 'companies-component',
        title: 'Warranty Registration',
        type: 'item',
        icon: 'note',
        url: '/warranty-registration'
      },
      {
        id: 'companies-component',
        title: 'Warranty Claim',
        type: 'item',
        icon: 'note',
        url: '/warranty-claim'
      },
      {
        id: 'companies-component',
        title: 'Warranty Completion',
        type: 'item',
        icon: 'note',
        url: '/warranty-completion'
      }
    ]
  },
  {
    id: 'applications',
    title: 'User Warranty',
    type: 'group',
    icon: 'whatshot',
    children: [
      {
        id: 'companies-component',
        title: 'Registered Warranty',
        type: 'item',
        icon: 'note',
        url: '/warranty-register'
      },
      {
        id: 'companies-component',
        title: 'Claimed Warranty',
        type: 'item',
        icon: 'note',
        url: '/warranty-claimed'
      },
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
