import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
  Drawer,

} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import logo from './logo.png';
import avatarImage from './undraw_profile.svg';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PersonAdd from '@mui/icons-material/PersonAdd';
import PersonIcon from '@mui/icons-material/Person';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import AutoStoriesSharpIcon from '@mui/icons-material/AutoStoriesSharp';
import Groups2Icon from '@mui/icons-material/Groups2';
import { Dashboard, MeetingRoom } from '@mui/icons-material';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const drawerWidth = 280;

const Layout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Gestion de l'état du menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f7f9fc' }}>
      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer - 1,
          backgroundColor: '#Fff',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'regular',fontSize:'15px' }}>
            {/* Titre ou logo */}
          </Typography>

          {/* Avatar et menu utilisateur */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'regular',marginRight:'15px',color:'#4e73df' }}>
            {/* Titre ou logo */}
            {/* {user?.first_name} {user?.last_name} */}
          </Typography>
            <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
            <Avatar
                alt="Guest"
                src={avatarImage}  // Utilisation de la variable qui contient l'image importée
                sx={{ width: 40, height: 40 }}
              />
      
            </IconButton>
          
            {/* Menu déroulant */}
            <Menu
              anchorEl={anchorEl}
              open={isMenuOpen}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem onClick={() => navigate('/profile')}>
                <PersonIcon sx={{ marginRight: 1 }} />
                Profil
              </MenuItem>
              
              <MenuItem onClick={handleLogout}>
                <LogoutIcon sx={{ marginRight: 1 }} />
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#4e73df',
            borderRight: '1px solid #e0e0e0',
          },
        }}
      >
        {/* Toolbar pour laisser de l'espace en haut */}
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          {/* Logo Section */}
          <Box sx={{ textAlign: 'center', padding: 2 }}>
          <Avatar alt="Logo" src={logo} sx={{ width: 120, height: 120, margin: '-25px auto auto auto' }} />
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginTop: 1,color: '#f8f9fc' }}>
              SmartSched
            </Typography>
          </Box>
          <Divider sx={{ marginY: 1 }} />

          {/* Navigation Section */}
          <Typography
            variant="subtitle2"
            sx={{ padding: '8px 16px', color: '#f8f9fc', fontWeight: 'regular',fontSize:'15px' }}
          >
            Navigation
          </Typography>
          <List>
            {[{ text: 'Dashboard', icon: <Dashboard />, to: '/dashboard' }].map((item, index) => (
              <ListItem
                component={Link}
                to={item.to}
                key={index}
                sx={{
                  ':hover': { backgroundColor: '#5a8dee', '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    height: '100%',
                    width: '4px',
                    backgroundColor: '#f6c23e', // Bleu
                  }} 
                }}
              >
                <ListItemIcon sx={{ color: '#f8f9fc' }}>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    color: '#f8f9fc',
                    fontWeight: 'regular',fontSize:'15px',
                  }}
                /><ChevronRightIcon sx={{ color: '#f8f9fc' }} />

              </ListItem>
            ))}
          </List>

          <Divider sx={{ marginY: 1 }} />

          {/* Utilities Section */}
          <Typography
            variant="subtitle2"
            sx={{ padding: '8px 16px', color: '#f8f9fc', fontWeight: 'regular',fontSize:'15px' }}
          >
            Utilitaires
          </Typography>
          <List>
            {[{ text: 'Classes', icon: <GroupWorkIcon />, to: '/classes' },
              { text: 'Modules', icon: <AutoStoriesSharpIcon />, to: '/courses' },
              { text: 'Users', icon: <Groups2Icon />, to: '/users' },
              { text: 'Rooms', icon: <MeetingRoom />, to: '/salles' },
            ].map((item, index) => (
              <ListItem
                component={Link}
                to={item.to}
                key={index}
                sx={{
                  ':hover': { backgroundColor: '#5a8dee', '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    height: '100%',
                    width: '4px',
                    backgroundColor: '#f6c23e', // Bleu
                  }} 
                }}
              >
                <ListItemIcon sx={{ color: '#f8f9fc' }}>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    color: '#f8f9fc',
                    fontWeight: 'regular',fontSize:'15px',
                  }}
                /><ChevronRightIcon sx={{ color: '#f8f9fc' }} />

              </ListItem>
            ))}
          </List>

          <Divider sx={{ marginY: 1 }} />

          {/* Authentication Section */}
          <Typography
            variant="subtitle2"
            sx={{ padding: '8px 16px', color: '#f8f9fc', fontWeight: 'regular',fontSize:'15px' }}
          >
            Authentication
          </Typography>
          <List>
            {[{ text: 'Logout', icon: <LogoutIcon />, to: '/login' },{ text: 'Register', icon: <PersonAdd />, to: '/signup' }].map((item, index) => (
              <ListItem
                component={Link}
                to={item.to}
                key={index}
                sx={{
                  ':hover': { backgroundColor: '#5a8dee', '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    height: '100%',
                    width: '4px',
                    backgroundColor: '#f6c23e', // Bleu
                  }} 
                }}
              >
                
                <ListItemIcon sx={{ color: '#f8f9fc' }}>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    color: '#f8f9fc',
                    fontWeight: 'regular',fontSize:'15px',
                  }}
                /><ChevronRightIcon sx={{ color: '#f8f9fc' }} />

              </ListItem>
            ))}
          </List>
          
        </Box>
        
      </Drawer>

      {/* Main content */}
      <Container
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginTop: '64px',
          backgroundColor: '#f7f9fc',
          borderRadius: '8px',
        }}
      >
        <Outlet />
      </Container>
    </Box>
  );
};

export default Layout;
