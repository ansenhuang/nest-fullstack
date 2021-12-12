import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from 'src/utils/hooks';
import { request } from 'src/utils';
import { Loading } from '../Loading';

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const login = async (data: any) => {
    try {
      request({
        url: '/api/user/login',
        method: 'POST',
        data,
        onSuccess: (user) => {
          setUser(user);
          const fromUrl = location.state?.from?.pathname || '/';
          navigate(fromUrl, { replace: true });
        },
      });
    } catch (error) {}
  };
  const logout = async () => {
    try {
      request({
        url: '/api/user/logout',
        method: 'POST',
        onSuccess: () => {
          setUser(null);
          navigate('/login');
        },
      });
    } catch (error) {}
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};
