import { useEffect, useState } from "react";
import { ref, getStorage, listAll, getDownloadURL, uploadBytesResumable, getMetadata } from "firebase/storage";
import { storage } from "./firebase";

import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import { Button } from "@mui/material";
import { AddIcCallRounded } from "@mui/icons-material";
/* import Progress from 'react-progressbar'; */





function UploadFiles({enlaces,setEnlaces,almacenamiento,setAlmacenamiento,setValor}) {
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
  useEffect(() => {
actualizar()

   /*  const getDatos = async () => {
      let p = await getEquipos()
      setLoading(false);
    
      let array = [];
      p.docs.map((e) => {
        array.push({ 'nombre': e.data().nombre, 'categoria': e.data().categoria })
      })

      setEquipos(array);
      console.log(array)

    }
    getDatos(); */
  }, [])
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
                console.log(metadata)
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
        
        
  
  
      }).catch((error) => {
        // Uh-oh, an error occurred!
      }
      );
  
  }
     


  const formHandler = (e) => {
    e.preventDefault();
    console.log(e.target[0].files.length)
    let i = 0;
    for (const key in e.target[0].files) {
      console.log(e.target[0].files)
      if(e.target[0].files.length >i){
      uploadFiles(e.target[0].files[key]);
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

      

        {url == 'A' ? '' : <Button variant="outlined"><a className="uk-text-white" href={url} download={nombre}>Download my painting</a></Button>}
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