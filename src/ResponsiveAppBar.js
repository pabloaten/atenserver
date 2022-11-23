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
import { FormControl, InputLabel, Select } from '@mui/material';
import { amber, blue, blueGrey, brown, cyan, deepOrange, deepPurple, green, grey, indigo, lightBlue, lightGreen, lime, orange, pink, purple, red, teal, yellow } from '@mui/material/colors';
import HomeIcon from '@mui/icons-material/Home';

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
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar>
                    <img src={imagen} />
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
                
                  <MenuItem key={'logout'} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" onClick={salir}>LogOut</Typography>
                  </MenuItem>
                  <MenuItem key={'perfil'} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" onClick={salir}>{user}</Typography>
                  </MenuItem>
                
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
       
      <Outlet />
    </>
  );
}
export default ResponsiveAppBar;