import React from 'react';
import styled from 'styled-components';
import { RouteObject } from 'react-router-dom';
import { HomeOutlined, CrownOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
// layouts
import DefaultLayout from 'src/layouts/DefaultLayout';
// sync pages
import NoMatchPage from 'src/pages/NoMatch';

const SpinWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const getAsyncPage = (factory: () => Promise<{ default: any }>) => {
  const LazyPage = React.lazy(factory);
  return (
    <React.Suspense
      fallback={
        <SpinWrapper>
          <Spin tip="Loading..." size="large" />
        </SpinWrapper>
      }
    >
      <LazyPage />
    </React.Suspense>
  );
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
    element: getAsyncPage(() => import('src/pages/Index')),
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
