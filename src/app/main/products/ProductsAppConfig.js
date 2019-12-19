import ProductsApp from './ProductsApp';

export const ProductsAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes: [
        {
            path: '/products',
            component: ProductsApp
        }
    ]
};
