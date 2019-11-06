import SurveysApp from './SurveysApp';
export const SurveysAppConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  routes: [
    {
      path: '/surveys',
      component: SurveysApp
    }
  ]
};
