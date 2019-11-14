import LogsApp from './LogsApp';
export const LogsAppConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  routes: [
    {
      path: '/logs',
      component: LogsApp
    }
  ]
};
