import React, { useMemo } from 'react';
import { useRoutes } from 'react-router-dom';
import getRoutes from './consts/routes';
import { DevInspector, AuthProvider } from './components';

const App: React.FC = () => {
  const routes = useMemo(() => getRoutes(), []);
  const element = useRoutes(routes);
  return (
    <DevInspector>
      <AuthProvider>{element}</AuthProvider>
    </DevInspector>
  );
};

export default App;
