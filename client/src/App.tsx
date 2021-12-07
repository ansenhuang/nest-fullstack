import React, { useMemo } from 'react';
import { useRoutes } from 'react-router-dom';
import getRoutes from './routes';

const App: React.FC = () => {
  const routes = useMemo(() => getRoutes(), []);
  const element = useRoutes(routes);
  return element;
};

export default App;
