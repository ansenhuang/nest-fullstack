import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';

const DefaultLayout: React.FC = () => {
  const location = useLocation();

  return (
    <Layout style={{ height: '100vh' }}>
      <Layout.Header>
        <h1 style={{ color: '#fff' }}>Header</h1>
      </Layout.Header>
      <Layout>
        <Layout.Sider theme="light" style={{ overflow: 'auto' }}>
          <Menu mode="inline" defaultSelectedKeys={[location.pathname]}>
            <Menu.Item key="/entity">
              <Link to="/entity">实体列表</Link>
            </Menu.Item>
          </Menu>
        </Layout.Sider>
        <Layout.Content style={{ padding: 20, overflow: 'auto', position: 'relative' }}>
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
