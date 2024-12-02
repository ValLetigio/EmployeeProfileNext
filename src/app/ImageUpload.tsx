'use client'

import React from 'react' 

import FirebaseUpload from './api/FirebaseUpload'; 

const ImageUpload =   () => { 

  const upload = new FirebaseUpload(); 

  const [ images, setImages ] = React.useState<File[] | Array<File>>([]);

  const [ displayImages, setDisplayImages ] = React.useState<string[]>([]);


  const handleChange = async (e: React.ChangeEvent<HTMLInputElement> ) => {
    const files = e.target.files;
    if (!files) {
      console.error("No files selected!");
      return;
    }
    const file = [...files];

    setImages(file)
  }

  const handleUpload = async () => {    
    try {
      if ( images ) {
        const res = await upload.Image(images, "testImages"); 
        setDisplayImages(res); 
      } else {
        console.error("Firebase storage is not initialized.");
      } 
    } catch (error) {
      console.error("Error uploading file or getting download URL:", error);
    }
  }    

  return (
    <> 
      <div className='flex flex-wrap gap-3'>
        {displayImages.map((image, index) => (
          <img key={index} src={image} alt="uploaded" className='w-[100px] h-[100px]' />
        ))}
      </div> 
      <div className='w-full h-[30vh] flex items-end justify-center gap-3' > 
        <button className='btn btn-error' onClick={()=>{
          setImages([] );
          const inputElement = document.getElementById("test") as HTMLInputElement | null;
          if (inputElement) {
            inputElement.value = "";
          }
        }} disabled={Boolean(!images.length)}>Clear</button>
        <input className='file-input file-input-bordered' onChange={(e)=> handleChange(e)} type="file" name="test" id="test" multiple/>
        <button className='btn btn-info' onClick={()=>handleUpload()} disabled={Boolean(!images.length)}>Upload</button>
      </div> 
    </>
  )
}

export default ImageUpload
