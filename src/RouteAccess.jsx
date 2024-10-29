import React from 'react';
import { Navigate } from 'react-router-dom';

const RouteAccess = ({ isLoggedIn, children }) => {
  // If user is not logged in, redirect to home page or login
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  // Otherwise, render the protected content
  return children;
};

export default RouteAccess;
