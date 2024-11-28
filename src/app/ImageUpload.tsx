'use client'

import React from 'react'

import { ref, uploadString } from "firebase/storage";
// import { ref, uploadBytes, getDownloadURL, uploadString } from "firebase/storage";

import { useAppContext } from './GlobalContext';

const ImageUpload = () => {

  const { storage } = useAppContext(); 

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>, foldername: string) => { 
    // const files = e.target?.files || []; 

    // const uploadPromises: Promise<void>[] = [];

    const storageRef = ref(storage, `${foldername}/testString`); 
    const message = 'This is my message.';

    uploadString(storageRef, message).then((snapshot) => {
      console.log('Uploaded a raw string!');
      console.log(snapshot)
    });

    // await Promise.all(uploadPromises) 
  };

  return (
    <input onChange={(e)=>onUpload(e, "test")} type="file" name="" id="" />
  )
}

export default ImageUpload
