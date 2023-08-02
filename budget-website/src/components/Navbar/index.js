import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link, useNavigate } from 'react-router-dom';
import logoChart from '../media/logoChart.png'

function AuthenticatedMenu({ handleCloseNavMenu, onLogout }) {
  return (
    <>
      <MenuItem onClick={handleCloseNavMenu}>
        <Link to="/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography textAlign="center">Dashboard</Typography>
        </Link>
      </MenuItem>
      <MenuItem onClick={handleCloseNavMenu}>
        <Link to="/manage" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography textAlign="center">Manage</Typography>
        </Link>
      </MenuItem>
      
    </>
  );
}

function NonAuthenticatedMenu({ handleCloseNavMenu }) {
  return (
    <>
      <MenuItem onClick={handleCloseNavMenu}>
        <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography textAlign="center">Login</Typography>
        </Link>
      </MenuItem>
      <MenuItem onClick={handleCloseNavMenu}>
        <Link to="/signup" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography textAlign="center">Sign Up</Typography>
        </Link>
      </MenuItem>
    </>
  );
}

function ResponsiveAppBar({ onFormSwitch, isAuthenticated, onLogout }) {

  const navigate = useNavigate();

  const handleBudgetClick = () => {
    if (isAuthenticated) {
      // Redirect to the dashboard if the user is logged in
      navigate('/dashboard');
    } else {
      // Redirect to the login page if the user is not logged in
      navigate('/login');
    }
  };

   // Retrieve the email from localStorage
   const userEmail = isAuthenticated ? localStorage.getItem('auth') : null;
   // check how to implement track of email-username
  const userAvatar = isAuthenticated ? userEmail?.charAt(1).toUpperCase() : null;

  const pages = !isAuthenticated
  ? [
    { label: 'Login', link: '/login' },
    { label: 'Sign Up', link: '/signup' },
  ]
  :  [
          { label: 'Dashboard', link: '/dashboard' },
          { label: 'Manage', link: '/manage' },
        ]

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{'backgroundColor': '#6f7176'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={handleBudgetClick} // Call the custom click handler
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            BUDGET
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
                   {isAuthenticated ? (
           <AuthenticatedMenu handleCloseNavMenu={handleCloseNavMenu} />
           ) : (
             <NonAuthenticatedMenu handleCloseNavMenu={handleCloseNavMenu} />
           )}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            BUDGET
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Link key={page.label} to={page.link} style={{ textDecoration: 'none' }}>
              <Button
                key={page.label}
                sx={{ my: 2, color: 'white', display: 'block' }}>
                <Typography>{page.label}</Typography>
              </Button>
              </Link>
            ))}
          </Box>

          {isAuthenticated ? (
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg">
                {userAvatar}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={onLogout}>
              <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
          ) : null }
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;

