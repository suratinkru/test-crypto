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
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';

const pages = ['Dashboard', 'Trading'];
const settings = ['Profile','Logout'];

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

 const navigate = useNavigate();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {

    setOpen(newOpen);
  };

  const handleLinkPage = (page: string) => {
    console.log('link page');
    // location.href = `/${
    //   page === 'Home' ? '' : page.toLowerCase()
    // }`;

    navigate(`/${
      page === 'Dashboard' ? '' : page.toLowerCase()
    }`);

    

  }

  React.useEffect(() => {
    const isAuthenticated:string = localStorage.getItem('token') || '';

    if(isAuthenticated) {
      console.log('Authenticated');
    } else {
      console.log('Not Authenticated');
    }
  }, []);


  const handlePage = (page: string) => {
    console.log('link page');
    // location.href = `/${
    //   page === 'Home' ? '' : page.toLowerCase()
    // }`;

    if(page === 'Logout') {
      localStorage.removeItem('token');
      return navigate('/login');
    }

    navigate(`/${
      page === 'Dashboard' ? '' : page.toLowerCase()
    }`);

    

  }

  return (
    <AppBar position="static" sx={{backgroundColor:"#27293a !important"}}>
     <Sidebar open={open} toggleDrawer={toggleDrawer} />
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}

            onClick={toggleDrawer(true)}
          >
            LOGO
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
              {pages.map((page) => (
                <MenuItem key={page} onClick={()=>handleLinkPage(page)}>
                  <Typography textAlign="center" sx={{textDecoration:'none'}}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
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
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              // แก้ให้หน่อยมันเป็นตัวพิมพ์ใหญ่หมดเลย
              <Button
                key={page}
                onClick={()=>handleLinkPage(page)}
                sx={{ my: 2, color: 'white', display: 'block',
                fontFamily: 'monospace',
                textDecoration: 'none',
                textTransform: 'none',
                 }}
              >
                {page}
              </Button>
              
            ))}
          </Box>
           
           {localStorage.getItem('token') ?
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center"
                   onClick={()=>handlePage(setting)}
                  >{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
           : <>
           
            <Button
              onClick={()=>navigate('/login')}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Login
            </Button>

           </>}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
