import React from 'react';

import { Navigate, useRoutes } from 'react-router-dom';

import { PublicRoute } from 'components/PublicRoute';
import { clientRoutes } from 'pages/Client/routes';
import { employersRoutes } from 'pages/Employer/routes';

export const App = () => {
  return useRoutes([
    {
      element: <PublicRoute />,
      children: [...clientRoutes, ...employersRoutes],
    },
    {
      element: <Navigate to={'/clients'} />,
      path: '*',
    },
  ]);
};
