import Dashboard from './Dashboard';

export const DashboardConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes: [
        {
            path: '/dashboard',
            component: Dashboard
        }
    ]
};

/**
 * Lazy load Dashboard
 */
/*
import FuseLoadable from '@fuse/components/FuseLoadable/FuseLoadable';

export const DashboardConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/dashboard',
            component: FuseLoadable({
                loader: () => import('./Dashboard')
            })
        }
    ]
};
*/
