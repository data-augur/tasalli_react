import { authRoles } from 'app/auth';
import React, { Component } from 'react';
import store from 'app/store';
import { logoutUser } from 'app/auth/store/actions/login.actions';
import { Redirect } from 'react-router-dom';

export const LogoutConfig = {
  // auth: authRoles.user,
  routes: [
    {
      path: '/logout',
      component: () => {
        store.dispatch(logoutUser());
        return <Redirect to="/login" />;
      }
    }
  ]
};
