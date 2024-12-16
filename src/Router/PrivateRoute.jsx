import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

export default function PrivateRoute({ children }) {
  const { isAuthentication } = useContext(AuthContext);

  if (!isAuthentication) {
    return <Navigate to="/login" replace />; 
  }
  
  return children;
}
