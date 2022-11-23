import logo from './logo.svg';
import './App.css';
import { Admin, Resource, ListGuesser } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import UserList from './UserList';
import { useEffect, useState } from 'react';
import axios from "axios"
import { Alert, Button, Card, Container, CssBaseline, Fab, Grid, Skeleton, Snackbar, TableSortLabel, TextField, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { purple, red } from '@mui/material/colors';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigationIcon from '@mui/icons-material/Navigation';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Login from './Login';
import Inicio from './Inicio';



const dataProvider = jsonServerProvider('https://pokeapi.co/api/v2');

function App() {
  const [dia, setDia] = useState('dark')

  const darkTheme = createTheme({
    palette: {
      mode: dia,
      primary: purple,
      secondary: red,
    },
    typography: {
      h2: {
        fontStyle: 'italic',
        
      },
      poster: {
        color: 'red',
      },
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
    

  });
  return (
    <ThemeProvider theme={darkTheme}>

      <CssBaseline />
      <Inicio dia={dia} setDia={setDia} />
    </ThemeProvider>
  )

}

export default App;
