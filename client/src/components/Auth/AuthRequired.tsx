import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from 'src/utils/hooks';

export const AuthRequired = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth();
  const location = useLocation();

  console.log(232, auth);

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};
