import NotificationsApp from "./NotificationsApp";
export const NotificationsAppConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  routes: [
    {
      path: "/notifications",
      component: NotificationsApp
    }
  ]
};
