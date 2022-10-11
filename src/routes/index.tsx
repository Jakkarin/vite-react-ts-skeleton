import _ from "lodash";
import { createElement, lazy } from "react";
import { RouteObject } from "react-router-dom";
import named from "./named";
import qs from 'qs';

type Route = RouteObject & { name?: string; children?: Route[]; };

// const routes = {
//     index: {
//         path: '',
//         component: lazy(() => import('@/pages/IndexPage')),
//     },
//     product: {
//         index: {
//             path: 'product',
//             layout: lazy(() => import('@/layouts/BaseLayout')),
//             component: lazy(() => import('@/pages/IndexPage')),
//         },
//         show: {
//             path: 'product/:id',
//             component: lazy(() => import('@/pages/IndexPage')),
//         },
//         edit: {
//             path: 'product/:id/edit',
//             component: lazy(() => import('@/pages/IndexPage')),
//         },
//     }
// };

const IndexPage = lazy(() => import('@/pages/IndexPage'));
const MainLayout = lazy(() => import('@/layouts/MainLayout'));

const routes: Route[] = [
    {
        path: '',
        element: createElement(MainLayout),
        children: [
            {
                name: 'index',
                path: '',
                index: true,
                element: <IndexPage />,
            },
            {
                name: 'product',
                path: 'product',
                children: [
                    {
                        name: 'show',
                        path: '',
                        index: true,
                        element: <IndexPage />,
                    },
                    {
                        name: 'show',
                        path: ':id',
                        element: <IndexPage />,
                    },
                ],
            },
        ],
    },
];

export const route = function (name: keyof typeof named, params?: any): string {
    let path = named[name].path;
    let freg: string[] = [];

    if (params && path.indexOf(':') >= 0) {
        freg = path.split('/')
            .filter(v => v.startsWith(':'))
            .map(v => v.substring(1));
        freg.forEach(v => (path = path.replace(':' + v, _.get(params, v, ':' + v))));
    }

    let qrys = _.omit(params, freg);

    if (params && !_.isEmpty(qrys)) {
        path += '?' + qs.stringify(qrys);
    }

    return path;
};

export default routes;