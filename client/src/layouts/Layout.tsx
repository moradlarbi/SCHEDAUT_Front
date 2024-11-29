// src/components/Layout.tsx
import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CssBaseline,Button
} from '@mui/material';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Class, Dashboard, MeetingRoom } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const drawerWidth = 240;

const Layout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
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
          {user && (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          )}
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
                <Dashboard />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem component={Link} to="/salles">
              <ListItemIcon>
                <MeetingRoom />
              </ListItemIcon>
              <ListItemText primary="Salles" />
            </ListItem>
            <ListItem component={Link} to="/classes">
              <ListItemIcon>
                <Class />
              </ListItemIcon>
              <ListItemText primary="Classes" />
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
