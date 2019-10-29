import React from 'react';
import { Redirect } from 'react-router-dom';
import { FuseUtils } from '@fuse/index';
import { ExampleConfig } from 'app/main/example/ExampleConfig';
import { BrandUsersLoginConfig } from 'app/main/login/LoginConfig';
import { LoginConfig } from 'app/main/super-login/LoginConfig';
import { RegisterConfig } from 'app/main/register/RegisterConfig';
import { Error404PageConfig } from 'app/main/errors/Error404PageConfig';
// import { BrandAdminAppConfig } from 'app/main/brand-admin/BrandAdminAppConfig';
import { BrandUsersAppConfig } from 'app/main/brand-users/BrandUserAppConfig';
import { AppUsersAppConfig } from 'app/main/app-users/AppUserAppConfig';
import { CompaniesAppConfig } from 'app/main/company/CompaniesAppConfig';
import { BrandsAppConfig } from 'app/main/brands/BrandsAppConfig';
import { LogoutConfig } from 'app/main/logout/LogoutConfig';

const routeConfigs = [
  ExampleConfig,
  BrandUsersLoginConfig,
  LoginConfig,
  RegisterConfig,
  AppUsersAppConfig,
  BrandUsersAppConfig,
  BrandsAppConfig,
  CompaniesAppConfig,
  LogoutConfig,
  Error404PageConfig
];

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
  {
    path: '/',
    exact: true,
    component: () => <Redirect to="/login" />
  },
  {
    path: '/su-admin/',
    exact: true,
    component: () => <Redirect to="/su-admin/login" />
  },
  {
    path: '/dashboard/',
    exact: true,
    component: () => <Redirect to="/dashboard" />
  },
  {
    component: () => <Redirect to="/404" />
  }
  // {
  //   path: '/dashboard',
  //   component: () => <Redirect to="/dashboard" />
  // }
];
export default routes;
