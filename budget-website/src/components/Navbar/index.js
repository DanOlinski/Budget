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
import logoChart2 from '../media/logoChart2.png'
import '../../components/styles/navBar.scss';

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

      <MenuItem>
        <Link href="https://docs.google.com/spreadsheets/d/1AYmZ9v5-x_W_Fb-u3Zs0lhHhatQBMNW_xEp4iyDIHak/edit?usp=sharing" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography textAlign="center">Sheets</Typography>
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
      navigate('/');
    }
  };

   // Retrieve the email from localStorage
   // check how to implement track of email-username
   const userEmail = localStorage.getItem("email");
  const userAvatar = userEmail && isAuthenticated ? userEmail.charAt(0).toUpperCase() : null;

  const pages = !isAuthenticated
  ? [
    { label: 'Login', link: '/login' },
    { label: 'Sign Up', link: '/signup' },
  ]
  :  [
          { label: 'Dashboard', link: '/dashboard' },
          { label: 'Manage', link: '/manage' },

          { label: 'Sheets', link:'https://docs.google.com/spreadsheets/d/1AYmZ9v5-x_W_Fb-u3Zs0lhHhatQBMNW_xEp4iyDIHak/edit?usp=sharing', target: '_blank'}

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

  // #6f7176

  return (
    <AppBar position="fixed" sx={{'backgroundImage': 'linear-gradient(79deg,#111112, #1a1a1be3 48%, #101111cf)'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Avatar
  alt="logo"
  src={logoChart2}
  onClick={handleBudgetClick}
  sx={{
    mr: 2,
    display: { xs: 'none', md: 'flex' },
    width: 32,
    height: 32,
  }}
/>
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={handleBudgetClick} // Call the custom click handler
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: "'Poppins', sans-serif",
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
              fontFamily: "'Poppins', sans-serif",
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
                <Avatar alt="user" src="/static/images/avatar/2.jpg">
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

