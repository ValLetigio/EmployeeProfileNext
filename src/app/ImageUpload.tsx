'use client'

import React from 'react'
 
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; 

// import { useAppContext } from './GlobalContext'; 

import Upload from './api/FirebaseUpload';

import { storage } from './api/firebase';

const ImageUpload =   () => { 

  const upload = new Upload();

  // const { storage } = useAppContext();

  const [ image, setImage ] = React.useState<File | null>(null);

  const [userData, setUserData] = React.useState({name: '', email: '' });

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement> ) => {
    const files = e.target.files;
    if (!files) {
      console.error("No files selected!");
      return;
    }
    const file = files[0];

    setImage(file)
  }

  const handleUpload = async () => {   
  
    try {
      if (storage && image) {
        const res = await upload.Image(image, "images");
        
        // console.log("Download URL:", res);
  
      } else {
        console.error("Firebase storage is not initialized.");
      }

    } catch (error) {
      console.error("Error uploading file or getting download URL:", error);
    }
  } 

  const handleWrite = async ( ) => {   
  
    try { 
        const res = await upload.writeTest(userData?.name, userData?.email );
        
        console.log("Result", res); 

    } catch (error) {
      console.error("Error uploading file or getting download URL:", error);
    }
  } 

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({...userData, [e.target.name]: e.target.value});
  }

  // const onUpload = async (e: React.ChangeEvent<HTMLInputElement>, foldername: string) => {
  //   const files = e.target?.files;
  
  //   // Ensure a file is selected
  //   if (!files || files.length === 0) {
  //     console.error("No file selected!");
  //     return;
  //   }
  
  //   const file = files[0];
  
  //   try {
  //     if (storage) {
  //       const storageRef = ref(storage, foldername + '/' + file.name); // Use the file's name or add a unique identifier
  //       console.log("ran")
  
  //       // Upload file
  //       const snapshot = await uploadBytes(storageRef, file);
  //       console.log("File uploaded successfully!");
  
  //       // Get download URL
  //       const downloadURL = await getDownloadURL(snapshot.ref);
  //       console.log("Download URL:", downloadURL);
  
  //       // Do something with the URL (e.g., store it in the database)
  //     } else {
  //       console.error("Firebase storage is not initialized.");
  //       console.log("not")
  //     }

  //   } catch (error) {
  //     console.error("Error uploading file or getting download URL:", error);
  //   }
  // }; 

  return (
    <>
      <div className='w-full h-[30vh] flex items-end justify-center gap-3' > 
        <button className='btn btn-error' onClick={()=>{
          setImage(null);
          const inputElement = document.getElementById("test") as HTMLInputElement | null;
          if (inputElement) {
            inputElement.value = "";
          }
        }} disabled={!Boolean(image)}>Clear</button>
        <input className='file-input file-input-bordered' onChange={(e)=> handleChange(e)} type="file" name="test" id="test" />
        <button className='btn btn-info' onClick={()=>handleUpload()} disabled={!Boolean(image)}>Upload</button>
      </div>

      <div className='w-full h-[30vh] flex items-end justify-center gap-3' >  
        <input className='file-input file-input-bordered text-center' onChange={(e)=> handleUserChange(e)} type="text" name="name" id="name" />
        <input className='file-input file-input-bordered text-center' onChange={(e)=> handleUserChange(e)} type="email" name="email" id="email" /> 
        <button className='btn btn-info' onClick={()=>handleWrite()} disabled={!Boolean(userData?.name)}>Write</button>
      </div>
    </>
  )
}

export default ImageUpload
