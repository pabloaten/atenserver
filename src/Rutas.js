import React, { useEffect, useState } from 'react'
import App from './App'
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Inicio from './Inicio';
import Login from './Login';
import { Acceso } from './firebase';
import ResponsiveAppBar from './ResponsiveAppBar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { blue, cyan, green, purple, red, yellow } from '@mui/material/colors';
import { CircularProgress, CssBaseline } from '@mui/material';
import Register from './Register';



const Rutas = () => {
   const autorizacion = getAuth(Acceso); 
  const [usuarioGlobal, setUsuarioGlobal] = useState(null);
  const [user, setUser] = useState("")
  const [imagen, setImagen] = useState("")
  const [loading, setLoading] = useState(true)
  const [id, setId] = useState(0)
  const [administrador, setAdministrador] = useState(false) 
  const [dia, setDia] = useState('dark');
  const [age, setAge] = useState(blue);
  const darkTheme = createTheme({
    palette: {
      mode: dia,
      primary: age,
      secondary: age,
    },
    typography: {
      h2: {
       
        color:age[800],
         fontFamily:'Share Tech Mono',
        
      },
      h1: {
       
        color:age[800],
        fontFamily:'Share Tech Mono',
        
      },
      h3: {
       
        color:age[800],
        fontFamily:'Share Tech Mono',
        
      },
      h4: {
       
        color:age[800],
        fontFamily:'Share Tech Mono',
        
      },
      h5: {
       
        color:age[800],
        fontFamily:'Share Tech Mono',
        
      },
      h6:{
       
        color:age[800],
        fontFamily:'Share Tech Mono',
        
      },
      p: {
       
        color:age[800],
        fontFamily:'Share Tech Mono',
        
      },
      strong:{
        color:age[100],
      },
      
      poster: {
        color: 'red',
      },
      div:{
        color:age[800],
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
    components: {
      MUIDataTablePagination: {
        styleOverrides:{
         root: {
              color: age['A700']
             
          }
        }
      }
    }
    

  });
  const handleChangeColor = (event) => {
/*     localStorage.setItem('Color', JSON.stringify(age)); */
    setAge(event.target.value);
  };
  

  useEffect(() => {
    onAuthStateChanged(autorizacion,(usuarioFirebase)=>{
      if(usuarioFirebase){
        //codigo en el caso que tenga ya la sesion iniciada
        setUsuarioGlobal(usuarioFirebase);
        setUser(usuarioFirebase.email);
        setImagen(usuarioFirebase.reloadUserInfo.photoUrl);
        setLoading(false);
        setId(usuarioFirebase.uid);
        console.log("Hola")
       /* 
        if(localStorage.getItem("Color") == null) {
         
          localStorage.setItem('Color', JSON.stringify(blue));
          };
        console.log(JSON.parse(localStorage.getItem("Color")))
        setAge(JSON.parse(localStorage.getItem("Color"))) */
        
      }else{
        //codigo en el caso que no tenga la sesion iniciada
        setUsuarioGlobal(null);
        setLoading(false);
      }
    }) 
  }, [])
  
   


  
  return (
    <ThemeProvider theme={darkTheme}>
    <HashRouter>
    {loading  ? <div uk-height-viewport="expand: true" className="uk-flex-center uk-flex uk-flex-middle"><CircularProgress /> </div>: (
        <Routes>
          <Route path="/" element={<ResponsiveAppBar handleChangeColor={handleChangeColor} age={age} setAge={setAge} imagen={imagen} setUser={setUser} setImagen={setImagen} user={user} dia={dia} setDia={setDia}/> }>
         
            <>
           {user/* =="pabloatenciano@gmail.com" */ ?  <> <Route index element={<Inicio loading={loading} />} />
            <Route path="login" element={<Login user={user} setUser={setUser}/>} />
            <Route path="register" element={<Register user={user} setUser={setUser}/>} /> </>: 
            <> 
            <Route index element={<Login user={user} setUser={setUser}/>}/> 
            <Route path="login" element={<Login user={user} setUser={setUser}/>} />
            <Route path="register" element={<Register user={user} setUser={setUser}/>}/>
            </>
          
  }
  </>
  
       
          </Route>
          
        </Routes>
)}
        
      </HashRouter>
      <CssBaseline />
   
  </ThemeProvider>
      
    
  )
}

export default Rutas