// src/components/Layout.tsx
import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CssBaseline
} from '@mui/material';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { SouthAmerica, DeleteForever } from '@mui/icons-material';

const drawerWidth = 240;

const Layout: React.FC = () => {
  // const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    // logout();
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" style={{ zIndex: 1300 }}>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            MyApp
          </Typography>
          {/* {user && (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          )} */}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' }
        }}
      >
        <Toolbar />
        <div style={{ overflow: 'auto' }}>
          <List>
            <ListItem component={Link} to="/dashboard">
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
          </List>
        </div>
      </Drawer>
      <Container
        component="main"
        sx={{ flexGrow: 1, p: 3, marginTop: '64px' }}
      >
        <Outlet />
      </Container>
    </div>
  );
};

export default Layout;
