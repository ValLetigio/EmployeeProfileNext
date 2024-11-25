import React, { FC, useState, useRef } from "react";

import Image from "next/image";

import { useAppContext } from "../GlobalContext";

interface ImageInputProps {
  id?: string;
  title?: string;
  inputStyle?: string;
  width?: string;
  style?: string;
  imgDimensions?: { height: number; width: number };
  mediaList?: string[];
  onChangeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setFunction: (value: any) => void;
  disable?: boolean,
  required?: boolean
}

const ImageInput: FC<ImageInputProps> = ({
  id,
  title,
  width,
  inputStyle,
  imgDimensions,
  mediaList,
  onChangeHandler,
  setFunction,
  disable,
  required
}) => {

  const { handleImageModalClick } = useAppContext(); 

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const fileReaders = [];
      const fileDataUrls: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        fileReaders.push(reader);

        reader.readAsDataURL(files[i]);

        reader.onloadend = () => {
          fileDataUrls.push(reader.result as string);

          // Check if all files have been processed
          if (fileDataUrls.length === files.length) {
            const finalResult =
              e.target.id === "photoOfPerson" ? fileDataUrls[0] : fileDataUrls;

            setFunction((prev: object) => ({
              ...prev,
              [e.target.id]: finalResult,
            }));
          }
        };
      }
    }
  };

  return (
    <div className={`flex flex-col ${width}`}>
      <div className="flex justify-between items-end mb-1 gap-1 min-h-10">
        <label htmlFor={id}>{title}</label>
        <Image
          className={`
            ${mediaList?.[0] && "cursor-pointer border" } 
            h-[${imgDimensions?.height}px] w-[${imgDimensions?.width}px]
          `}
          height={imgDimensions?.height || 60} width={imgDimensions?.width || 60} alt={"   "} 
          src={mediaList?.[0] || ""}
          onClick={()=>{mediaList?.[0] && handleImageModalClick(mediaList || [])}}
        />
      </div> 

      <input
        type="file" 
        className={inputStyle}
        id={id}
        accept="image/*"
        required={required} disabled={disable}
        onChange={handleFileChange || onChangeHandler}
      /> 
    </div>
  );
};

export default ImageInput;
