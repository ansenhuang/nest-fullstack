import React from 'react';
import { RouteObject } from 'react-router-dom';
import { HomeOutlined, CrownOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
// layouts
import DefaultLayout from 'src/layouts/DefaultLayout';
// sync pages
import NoMatchPage from 'src/pages/NoMatch';

const getAsyncPage = (factory: () => Promise<{ default: any }>) => {
  const LazyPage = React.lazy(factory);
  return (
    <React.Suspense fallback={<Spin tip="Loading..." />}>
      <LazyPage />
    </React.Suspense>
  );
};

export interface EnhanceRouteObject extends RouteObject {
  name: string;
  icon?: React.ReactNode;
  children?: EnhanceRouteObject[];
}

const routes: EnhanceRouteObject[] = [
  {
    path: '/',
    name: '首页',
    icon: <HomeOutlined />,
    element: getAsyncPage(() => import('src/pages/Index')),
  },
  {
    path: '*',
    name: '404',
    element: <NoMatchPage />,
  },
];

export default routes;
