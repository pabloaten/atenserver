import { useEffect, useState } from "react";
import { ref, getStorage, listAll, getDownloadURL, uploadBytesResumable, getMetadata } from "firebase/storage";
import { storage } from "./firebase";

import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import { Button } from "@mui/material";
import { AddIcCallRounded } from "@mui/icons-material";
/* import Progress from 'react-progressbar'; */





function UploadFiles({actualizar,enlaces,setEnlaces,almacenamiento,setAlmacenamiento,setValor}) {
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState('A')
  const [nombre, setNombre] = useState('')
  const [equipos, setEquipos] = useState([])
  const [nombres, setNombres] = useState([])
/*   const [enlaces, setEnlaces] = useState([]) */
  const [loading, setLoading] = useState(true)
  const columns = [
    {
      name: 'Nombre',
      selector: row => row.nombre,
      sortable: true,
    },
    {
      name: 'URL',
      selector: row => row.url,
    },

  ];
 

     


  const formHandler = (e) => {
    e.preventDefault();
    
    let i = 0;
    for (const key in e.target[0].files) {
    
      if(e.target[0].files.length >i){
      uploadFiles(e.target[0].files[key])
      }
      i++;
    }
  
    
    
  };

  const uploadFiles = (file) => {
    //
    if (!file) return;
    
    const sotrageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(sotrageRef, file);
    setNombre(file.name)


    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setUrl(downloadURL)
          

        });
      }
    );
 
  };
  /* const handleDescargar = () => {
    console.log(url,'prueba.pdf')
     fileDownload(url,nombre)

  } */



  return (
    <div className="bgwhite">
     
      <div className="uk-flex uk-flex-column uk-flex-middle uk-flex-center" >
        
        <form className="uk-flex uk-width-1-1 uk-flex-around uk-flex-middle movil" onSubmit={formHandler}>

          {/*  <button class="uk-button">escoger archivo</button> */}
          <input type="file" multiple />
          
          <Button variant="contained" type="submit"> <span uk-icon="icon: upload"></span></Button>
        </form>


        <div className="uk-width-1-1 uk-margin">
          <Progress
            percent={progress}
          />

          {/* <FileInput source="attachments">
    <FileField source="src" title="title" />
</FileInput> */}
          {/*   <Progress
  type="circle"
  percent={progress}
/> */}
        </div>

      

        {/* {url  == 'A' ? '' :  */}<Button onClick={actualizar} variant="outlined">Actualizar</Button>{/* } */}
        {/* {url == 'A' ? '' :  <button onClick={handleDescargar}>Download my painting</button>} */}
        {/*  <h2>Uploading done {progress}%</h2> */}
      </div>
      {/*   <table class="uk-table uk-table-justify">
       
        <thead>
          <tr>
            <th>Archivo</th>
          </tr>
        </thead>
        <tbody>
          {enlaces.map((e) =>
            <tr>
          {console.log(nombres,e)}
            <td><a className="uk-text-danger" href={e.url} download={nombre}>{e.nombre}</a></td>
          </tr>
            )}
        
        </tbody>
      </table> */}
     

    </div>
  );
}

export default UploadFiles;