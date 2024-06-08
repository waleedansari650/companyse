import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface AuthProps {
  children: ReactNode;
}

const AuthRoutes: React.FC<AuthProps> = ({ children }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/sign-in" replace={true} />;
  }   

  return children
};

export default AuthRoutes;
