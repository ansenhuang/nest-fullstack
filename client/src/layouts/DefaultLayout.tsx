import React from 'react';
import { Outlet } from 'react-router-dom';

const DefaultLayout: React.FC = () => {
  return (
    <div style={{ minHeight: '100vh' }}>
      <Outlet />
    </div>
  );
};

export default DefaultLayout;
