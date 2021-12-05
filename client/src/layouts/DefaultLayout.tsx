import React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';

const DefaultLayout: React.FC = () => {
  return (
    <Layout style={{ height: '100vh' }}>
      <Layout.Header>
        <h1 style={{ color: '#fff' }}>Header</h1>
      </Layout.Header>
      <Layout>
        <Layout.Sider theme="light" style={{ overflow: 'auto' }}>
          <div style={{ height: 800 }}>Sider</div>
        </Layout.Sider>
        <Layout.Content style={{ padding: 20, overflow: 'auto', position: 'relative' }}>
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
