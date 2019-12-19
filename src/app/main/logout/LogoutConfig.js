import React from 'react';
import store from 'app/store';
import {logoutUser} from 'app/auth/store/actions/login.actions';
import {Redirect} from 'react-router-dom';

export const LogoutConfig = {
    // auth: authRoles.user,
    routes: [
        {
            path: '/logout',
            component: () => {
                store.dispatch(logoutUser());
                if (localStorage.getItem('Role') === 'superAdmin' || localStorage.getItem('Role') === 'tasaliAdmin') {
                    localStorage.removeItem('Role');
                    return <Redirect to="/su-admin/login"/>;
                } else {
                    localStorage.removeItem('Role');
                    return <Redirect to="/login"/>;
                }
            }
        }
    ]
};
