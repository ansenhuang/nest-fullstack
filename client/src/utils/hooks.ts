import { createContext, useContext } from 'react';

export interface AuthContextInterface {
  user: any;
  login: (data: any) => Promise<void>;
  logout: () => Promise<void>;
}
export const AuthContext = createContext<AuthContextInterface>(null!);
export const useAuth = () => {
  return useContext(AuthContext);
};
