import React from 'react'
import { Admin, Resource, ListGuesser } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import UserList from './UserList';
import { useEffect, useState } from 'react';
import axios from "axios"
import { Alert, Box, Button,Tab, Card, Container, CssBaseline, Fab, Grid, Skeleton, Snackbar, TableSortLabel, Tabs, TextField, Typography, CardHeader, Avatar, IconButton, Divider } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { purple, red } from '@mui/material/colors';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigationIcon from '@mui/icons-material/Navigation';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { linkWithCredential, sendPasswordResetEmail, fetchSignInMethodsForEmail, EmailAuthProvider, getAuth, sendEmailVerification, sendSignInLinkToEmail, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signInWithRedirect, signOut } from "firebase/auth";
import { Acceso, auth } from './firebase';
import swal from 'sweetalert';
import TabPanel from './TabPanel';

const Login = ({user,setUser}) => {


    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const handleClick = () => {
      setOpen(true);
      logincorreoycontraseña();
    };
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };
     
  
    useEffect(() => {
      window.scrollTo(0, 0)
    }, [])
    const provider = new GoogleAuthProvider();
  
    const olvidarContraseña = () => {
      const auth = getAuth();
      let email = prompt()
      sendPasswordResetEmail(auth, email)
        .then(() => {
          alert('Password reset email sent')
          // ..
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
    }
    const logincorreoycontraseña = () => {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          if (userCredential.user.emailVerified) {
            const user = userCredential.user;
            swal("Bien!", "Te has logeado correctamente", "success")
  
          } else {
            swal("Bien!", "Confirma tu correo, se te ha enviado un mensaje al email proporcionado", "success")
  
            auth.signOut();
            setUser("")
          }
  
          // ...
        })
        .catch((error) => {
          swal("Error", "Credenciales incorrectas", "error")
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    }
    const registercorreoycontraseña = () => {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential.user)
          // send verification mail.
          sendEmailVerification(auth.currentUser);
          auth.signOut();
          setUser("")
          swal("Bien!", "Confirma tu correo, se te ha enviado un mensaje al email proporcionado", "success")
        })
        .catch(function (error) {
          console.log(error)
          swal("Error", "Ese correo ya esta en uso", "error")
        }
  
        );
      /* .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
       
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      }).then(() => {
        signOut(auth).then(() => {
          
        }).catch((error) => {
          alert(error)
        });
      }); */
  
    }
  
    /* const emailauth = () =>{
      // After asking the user for their email.
      const credential = EmailAuthProvider.credentialWithLink(
        email, window.location.href);
      
      // Link the credential to the current user.
      const auth = getAuth();
      linkWithCredential(auth.currentUser, credential)
        .then((usercred) => {
          // The provider is now successfully linked.
          // The phone user can now sign in with their phone number or email.
        })
        .catch((error) => {
          // Some error occurred.
        });
    } */
    const logearse = () => {
      const auth = getAuth();
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          /*  console.log(user) */
          setUser(user.email)
  
          // ...
        }).catch((error) => {
          /*  console.log(error); */
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        });
  
    }


      
      
    return (
     
      
       
      <div uk-height-viewport="expand: true" className="uk-flex uk-flex-middle uk-flex-center uk-flex-column">
      <Typography className="uk-margin uk-padding uk-text-purple" variant="h2" component="h1">
   LOGIN
  </Typography>
    
  <Typography className="uk-margin uk-padding uk-text-purple" variant="h5" component="h1">
   {user}
  </Typography>
   
  
  <Button onClick={logearse} variant="outlined">
        <span uk-icon="icon: google; ratio: 1"></span> Acceder
      </Button>
       
      <br/>
      
        <div className="uk-flex uk-flex-around uk-flex-middle uk-flex-column uk-width-1-3">
       
       <TextField
            
            
            size="large"
            fullWidth = {true}
            id="outlined-required"
            label="Correo"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            
            
          />
          <br/>
       <TextField
       
            id="outlined-password-input"
            label="Contraseña"
            type="password"
            fullWidth = {true}
            autoComplete="current-password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
          />
          <br/>
         
         <Button size="large" fullWidth={true} variant="outlined" onClick={handleClick}>
   Login
  </Button>
  <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} >
   <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
     This is a success message!
   </Alert>
  </Snackbar>
          </div>
          
         </div>
          );
        {/*   <Fab color="primary" aria-label="add">
    <AddIcon  />
  </Fab>
  <Fab color="secondary" aria-label="edit">
    <EditIcon />
  </Fab>
  <Fab variant="extended">
    <NavigationIcon sx={{ mr: 1 }} />
    Navigate
  </Fab>
  <Fab  aria-label="like">
    <FavoriteIcon />
  </Fab> */}
  {/* <Card variant="outlined">
  <Skeleton />
  <Skeleton animation="wave" />
  <Skeleton animation={false} />
  </Card> */}
       
      
   
}

export default Login