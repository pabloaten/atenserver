import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import FolderIcon from '@mui/icons-material/Folder';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Outlet, Link, NavLink, useNavigate } from "react-router-dom";
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { getAuth, signOut } from 'firebase/auth';
import swal from 'sweetalert'
import StorageIcon from '@mui/icons-material/Storage';
import { Badge, FormControl, InputLabel, Select } from '@mui/material';
import { amber, blue, blueGrey, brown, cyan, deepOrange, deepPurple, green, grey, indigo, lightBlue, lightGreen, lime, orange, pink, purple, red, teal, yellow } from '@mui/material/colors';
import HomeIcon from '@mui/icons-material/Home';
import { styled } from '@mui/material/styles';

const pages = ['LOGIN','REGISTER'];
const settings = ['Perfil', 'Cuenta', 'Logout'];

const ResponsiveAppBar = ({ handleChangeColor,age,setAge,dia, setDia,imagen,user,setUser,setImagen}) => {

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate()
  const salir = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
       setUser("")
       setImagen("")
       navigate("/")
        swal({
          title: "Has cerrado sesión correctamente",
          icon: "success",
        });

      })
      .catch((error) => {
        // An error happened.
      });
  };



  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));
  
  const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 22,
    height: 22,
    border: `2px solid ${theme.palette.background.paper}`,
  }));

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
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <StorageIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Link to ="/"><Typography
              variant="h6"
              noWrap
             
              
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'white',
                textDecoration: 'none',
              }}
            >
              INICIO
            </Typography></Link>

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
                  
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Link to={"/"+page}><Typography textAlign="center">{page}</Typography></Link>
                  </MenuItem>
                 
                ))}
                <MenuItem>
                <Link to="/">{/* <StorageIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
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
              <HomeIcon />
            </Typography></Link>
            </MenuItem>
              </Menu>
            </Box>
            
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                 <Link to={"/"+page}><Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button></Link>
              ))}
            </Box>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
  <InputLabel  id="demo-select-small" className="uk-margin">Color</InputLabel>
  <Select
     labelId="demo-select-small"
     id="demo-select-small"
    variant="outlined"
    value={age}
    label="Color"
    onChange={handleChangeColor}
  >
    <MenuItem value={red}>Rojo</MenuItem>
    <MenuItem value={purple}>Morado</MenuItem>
    <MenuItem value={green}>Verde</MenuItem>
    <MenuItem value={lightGreen}>Verde Claro</MenuItem>
    <MenuItem value={lime}>Lima</MenuItem>
    <MenuItem value={yellow}>Amarillo</MenuItem>
    <MenuItem value={amber}>Ambar</MenuItem>
    <MenuItem value={orange}>Naranja</MenuItem>
    <MenuItem value={deepOrange}>Naranja Oscuro</MenuItem>
    <MenuItem value={brown}>Marron</MenuItem>
    <MenuItem value={grey}>Gris</MenuItem>
    <MenuItem value={blueGrey}>Gris azulado</MenuItem>
    <MenuItem value={pink}>Rosa</MenuItem>
    <MenuItem value={deepPurple}>Morado Oscuro</MenuItem>
    <MenuItem value={indigo}>Indigo</MenuItem>
    <MenuItem value={blue}>Azul</MenuItem>
    <MenuItem value={lightBlue}>Azul Claro</MenuItem>
    <MenuItem value={cyan}>Cyan</MenuItem>
    <MenuItem value={teal}>Verde azulado</MenuItem>
  </Select>
</FormControl>
<div className="uk-margin-right uk-margin-left">
            {dia == "light" ? <Button variant="contained" onClick={() => {
              if (dia == "dark") {
                setDia("light")
              } else {
                setDia("dark")
              }
            }}><WbSunnyIcon /></Button> : <Button /* className="dia" */ variant="contained" onClick={() => {
              if (dia == "dark") {
                
                setDia("light")
              } else {
                setDia("dark")
              }
            }}><DarkModeIcon /></Button>}
            </div>
            {user ?  <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                 
                  <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
      >
        <Avatar  sx={{ bgcolor: age[800] }}   alt="Remy Sharp" variant="circular">
                   {user[0].toUpperCase()}
                    {/* <img className="uk-width-1-1 uk-height-max-large" src={'https://th.bing.com/th/id/OIP.XmS_VttWx7IMqrkZ0m5y2AHaF1?pid=ImgDet&rs=1'} /> */}
                  </Avatar>
      </StyledBadge>
                  
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
                
                  <MenuItem key={'logout'} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" onClick={salir}>LogOut</Typography>
                  </MenuItem>
                  <MenuItem key={'perfil'} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" onClick={salir}>{user}</Typography>
                  </MenuItem>
               
                
              </Menu>
            </Box> : ''}
           
          </Toolbar>
        </Container>
      </AppBar>
       
      <Outlet />
    </>
  );
}
export default ResponsiveAppBar;