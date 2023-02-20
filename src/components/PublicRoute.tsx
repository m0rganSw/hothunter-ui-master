import React from 'react';

import { Outlet } from 'react-router-dom';

import { ThemeProvider } from '@mui/material';
import { theme } from 'shared/ui/theme';
import { Navbar } from 'widgets/Navbar';

export const PublicRoute: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Navbar>
        <Outlet />
      </Navbar>
    </ThemeProvider>
  );
};
