import React from 'react';
import { RouteObject } from 'react-router-dom';
import { HomeOutlined, CrownOutlined } from '@ant-design/icons';
import { Loading, AuthRequired } from 'src/components';
// layouts
import DefaultLayout from 'src/layouts/DefaultLayout';
// sync pages
import IndexPage from 'src/pages/Index';
import LoginPage from 'src/pages/Login';
import NoMatchPage from 'src/pages/NoMatch';

const getAsyncPage = (
  factory: () => Promise<{ default: any }>,
  { auth = true }: { auth?: boolean } = {},
) => {
  const LazyPage = React.lazy(factory);
  const suspense = (
    <React.Suspense fallback={<Loading tip="Loading..." size="large" />}>
      <LazyPage />
    </React.Suspense>
  );
  return auth ? <AuthRequired>{suspense}</AuthRequired> : suspense;
};

export interface EnhanceRouteObject extends RouteObject {
  name: string;
  icon?: React.ReactNode;
  children?: EnhanceRouteObject[];
}

const getRoutes = (): EnhanceRouteObject[] => [
  {
    path: '/',
    name: '首页',
    icon: <HomeOutlined />,
    element: <IndexPage />,
  },
  {
    path: '/login',
    name: '登录',
    icon: <HomeOutlined />,
    element: <LoginPage />,
  },
  {
    path: '/entity',
    name: '实体',
    icon: <HomeOutlined />,
    element: <DefaultLayout />,
    children: [
      {
        path: '',
        name: '实体列表',
        icon: <CrownOutlined />,
        element: getAsyncPage(() => import('src/pages/Entity/List')),
      },
      {
        path: 'list',
        name: '实体列表',
        icon: <CrownOutlined />,
        element: getAsyncPage(() => import('src/pages/Entity/List')),
      },
      {
        path: 'detail',
        name: '实体详情',
        icon: <CrownOutlined />,
        element: getAsyncPage(() => import('src/pages/Entity/Detail')),
      },
    ],
  },
  {
    path: '*',
    name: '404',
    element: <NoMatchPage />,
  },
];

export default getRoutes;
