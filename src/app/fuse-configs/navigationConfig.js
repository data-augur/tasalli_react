import jwt from 'jsonwebtoken';
// import { Redirect } from 'react-router-dom';

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
        id: 'users',
        title: 'Users',
        type: 'group',
        icon: 'whatshot',
        children: [
            {
                id: 'admin-users',
                title: 'Admins',
                type: 'item',
                icon: 'people',
                url: '/admin-users'
            },
            {
                id: 'companies',
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
                title: 'Client Users',
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
            },
            {
                id: 'retailers-component',
                title: 'Retailers',
                type: 'item',
                icon: 'people',
                url: '/retailers'
            }
        ]
    },
    {
        id: 'notifications',
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
        id: 'cyphemecode',
        title: 'Cypheme Code',
        type: 'group',
        icon: 'whatshot',
        children: [
            {
                id: 'cyphemeCode-component',
                title: 'Verify Code',
                type: 'item',
                icon: 'search',
                url: '/uploadPictures'
            },
        ]
    },
    {
        id: 'ads-group',
        title: 'Ads',
        type: 'group',
        icon: 'whatshot',
        children: [
            {
                id: 'ads-component',
                title: 'Ads',
                type: 'item',
                icon: 'book',
                url: '/ads'
            },
            {
                id: 'surveys-component',
                title: 'Survey',
                type: 'item',
                icon: 'book',
                url: '/surveys'
            },
            {
                id: 'banner-ads-component',
                title: 'Banner Ads',
                type: 'item',
                icon: 'book',
                url: '/banner-ads'
            },
            {
                id: 'popup-component',
                title: 'Pop up',
                type: 'item',
                icon: 'book',
                url: '/popups'
            }
        ]
    },
    {
        id: 'warranty-group',
        title: 'Warranty Management',
        type: 'group',
        icon: 'whatshot',
        children: [
            {
                id: 'products-component',
                title: 'Products',
                type: 'item',
                icon: 'book',
                url: '/products'
            },
            {
                id: 'warranty-registration-component',
                title: 'Warranty Registration',
                type: 'item',
                icon: 'note',
                url: '/warranty-registration'
            },
            {
                id: 'warranty-claim-component',
                title: 'Warranty Claim',
                type: 'item',
                icon: 'note',
                url: '/warranty-claim'
            },
            {
                id: 'warranty-completion-component',
                title: 'Warranty Completion',
                type: 'item',
                icon: 'note',
                url: '/warranty-completion'
            }
        ]
    },
    {
        id: 'user-warranty',
        title: 'User Warranty',
        type: 'group',
        icon: 'whatshot',
        children: [
            {
                id: 'warranty-register-component',
                title: 'Registered Warranty',
                type: 'item',
                icon: 'note',
                url: '/warranty-register'
            },
            {
                id: 'warranty-claimed-component',
                title: 'Claimed Warranty',
                type: 'item',
                icon: 'note',
                url: '/warranty-claimed'
            },
        ]
    },
    {
        id: 'logs-group',
        title: 'User Logs',
        type: 'group',
        icon: 'whatshot',
        children: [
            {
                id: 'logs-component',
                title: 'Logs',
                type: 'item',
                icon: 'book',
                url: '/logs'
            },
            {
                id: 'qrCode-component',
                title: 'QR Code',
                type: 'item',
                icon: 'book',
                url: '/qrcodes'
            }
        ]
    },
    {
        id: 'user-auth',
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
        id: 'warranty-group',
        title: 'Warranty Management',
        type: 'group',
        icon: 'whatshot',
        children: [
            {
                id: 'products-component',
                title: 'Products',
                type: 'item',
                icon: 'book',
                url: '/products'
            },
            {
                id: 'warranty-registration-component',
                title: 'Warranty Registration',
                type: 'item',
                icon: 'note',
                url: '/warranty-registration'
            },
            {
                id: 'warranty-claim-component',
                title: 'Warranty Claim',
                type: 'item',
                icon: 'note',
                url: '/warranty-claim'
            },
            {
                id: 'warranty-completion-component',
                title: 'Warranty Completion',
                type: 'item',
                icon: 'note',
                url: '/warranty-completion'
            }
        ]
    },
    {
        id: 'user-warranty',
        title: 'User Warranty',
        type: 'group',
        icon: 'whatshot',
        children: [
            {
                id: 'warranty-register-component',
                title: 'Registered Warranty',
                type: 'item',
                icon: 'note',
                url: '/warranty-register'
            },
            {
                id: 'warranty-claimed-component',
                title: 'Claimed Warranty',
                type: 'item',
                icon: 'note',
                url: '/warranty-claimed'
            },
        ]
    },
    {
        id: 'user-auth',
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

localStorage.setItem('Role', role);
var navigationConfig =
    role === 'superAdmin'
        ? superAdminNavigationConfig
        : role === 'brandAdmin'
        ? companyAdminnavigationConfig
        : role === 'companyAdmin'
            ? companyAdminnavigationConfig
            : superAdminNavigationConfig;
export default navigationConfig;
