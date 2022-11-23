import { AppBar, Backdrop, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, LinearProgress, TablePagination } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MUIDataTable from "mui-datatables";
import UploadFiles from './UploadFiles';
import { Alert, Button, Card, Container, CssBaseline, Fab, Grid, Skeleton, Snackbar, TableSortLabel, TextField, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { purple, red } from '@mui/material/colors';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigationIcon from '@mui/icons-material/Navigation';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { getStorage, ref, deleteObject, listAll, getDownloadURL, getMetadata } from "firebase/storage";
import ResponsiveAppBar from './ResponsiveAppBar';





const Inicio = ({ loading }) => {
    const [enlaces, setEnlaces] = useState([])
    const [almacenamiento, setAlmacenamiento] = useState([])
    const [valor, setValor] = useState(0)


    const columns = ["Nombre", "Descarga", "Tamaño(MB)", "Extension", "Fecha"];
    const handleDelete = (nombre) => {
        const storage = getStorage();

        for (const key in nombre.lookup) {

            const desertRef = ref(storage, `files/${enlaces[key][0]}`);

            // Delete the file
            deleteObject(desertRef).then(() => {

            }).catch((error) => {
                alert(error)
            });
        }
        // Create a reference to the file to delete


    }


    const options = {
        filterType: "checkbox",
        jumpToPage: true,
        filterType: "dropdown",
        onRowsDelete: (e) => { handleDelete(e) },


    };
    const actualizar = ()=>{
        const storage = getStorage();
        // Create a reference under which you want to list
        const listRef = ref(storage, 'files');
        let array = [];
        // Find all the prefixes and items.
        listAll(listRef)
          .then((res) => {
      
      
            let array = []
            let array2 = [];
            
            res.items.map((itemRef) => {
              // All the items under listRef.
              /*  console.log(itemRef); */
      
              let archivo = ref(storage, itemRef._location.path);
              
             
      
              getDownloadURL(archivo)
                .then((url) => {
                  getMetadata(archivo)
                  .then((metadata) => {
                    // Metadata now contains the metadata for 'images/forest.jpg'
                    /* console.log(metadata) */
                    let fecha = new Date(metadata.timeCreated);
                  /* setEnlaces([{url: <a href={url} className="uk-text-danger">A</a>,nombre}]); */
                  array.push([itemRef._location.path.split("files/")[1], <a href={url}><span uk-icon="icon: download"></span></a>,metadata.size/1000000,metadata.contentType, fecha.toUTCString()])
                  /*    array.push({cell: () =>  <a href={url}>Hola</a> },{cell: () =>  <p >{itemRef._location.path} </p> }) */
                  setEnlaces([...array])
                  array2.push([metadata.size/1000000])
                  setAlmacenamiento([...array2])
                  
                  // Insert url into an <img> tag to "download"
                  })
                  .catch((error) => {
                    // Uh-oh, an error occurred!
                  });
                  
                 
                })
      
            });

            let numero = 0;
            res.items.map((itemRef) => {
                let archivo = ref(storage, itemRef._location.path);
                 getMetadata(archivo)
                  .then((metadata) => {
               numero+=metadata.size/1000000;
               setValor(numero)
            })
        })
        
            
            
            
      
      
          }).catch((error) => {
            // Uh-oh, an error occurred!
          }
          );
      
      }
  /*   const calcularPorcentaje = (valores) => {
        let valor = 0;
        valores.map((e) => {
            valor += parseFloat(e);
            console.log(valor)
        })
        let op = (valor * 100) / 5000;
        setValor(op)
    } */
    useEffect(() => {
        actualizar()
      
    }, [])

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <div uk-height-viewport="expand: true">

            <>
                <Typography className="uk-margin uk-padding uk-text-center " variant="h2" component="h1">
                    ATEN SERVER
                </Typography>
<div className="uk-flex uk-flex-middle uk-flex-column uk-flex-center">
                <Button  className="uk-margin" variant="outlined" onClick={handleClickOpen}>
                    SUBIR ARCHIVOS
                </Button>
                <br/>
                <div className="uk-width-1-2 uk-flex-center  uk-flex uk-flex-column">
                <p className="uk-text-center uk-margin">Almacenamiento usado {Math.round(valor)+"/5000MB"}</p>
                <LinearProgress className="uk-margin" variant="determinate" value= {(valor*100)/5000} />
                </div>
                </div>
                




                <MUIDataTable

                    data={enlaces}
                    columns={columns}
                    options={options}

                />

                <Dialog
                    open={open}

                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                >

                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            <UploadFiles enlaces={enlaces} setEnlaces={setEnlaces} setAlmacenamiento={setAlmacenamiento} almacenamiento={almacenamiento} setValor={setValor} />
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cerrar</Button>

                    </DialogActions>
                </Dialog>
            </>

        </div>
    )
}

export default Inicio