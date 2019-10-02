import React from 'react';
import { Redirect } from 'react-router-dom';
import { FuseUtils } from '@fuse/index';
import { ExampleConfig } from 'app/main/example/ExampleConfig';
import { LoginConfig } from 'app/main/login/LoginConfig';
import { RegisterConfig } from 'app/main/register/RegisterConfig';
import { BrandAdminAppConfig } from 'app/main/brand-admin/BrandAdminAppConfig';
import { LogoutConfig } from 'app/main/logout/LogoutConfig';

const routeConfigs = [
  ExampleConfig,
  LoginConfig,
  RegisterConfig,
  BrandAdminAppConfig,
  LogoutConfig
];

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
  {
    path: '/',
    component: () => <Redirect to="/dashboard" />
  }
];

export default routes;
