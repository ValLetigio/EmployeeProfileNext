import { ref as storageRef, getDownloadURL, uploadBytesResumable, UploadTaskSnapshot } from "firebase/storage"; 

import { storage } from "./firebase"; 

class FirebaseUpload { 

    async base64ToFile(base64: string, fileName: string, mimeType = '') {
        const byteCharacters = atob(base64);
        const byteNumbers = Array.from(byteCharacters).map(char => char.charCodeAt(0));
        const byteArray = new Uint8Array(byteNumbers);
      
        const blob = new Blob([byteArray], { type: mimeType });
      
        return new File([blob], fileName, { type: mimeType });
    } 
    
    async Images(images: string[], foldername: string, fileName: string): Promise<string[]> {
        const downloadURLs: string[] = [];
    
        try {
            for (const [index, image] of images.entries()) {

                const base64String = image; 
                const base64Data = base64String.split(",")[1]; 
                const matchResult = base64String.match(/data:(.*?);base64/);
                if (!matchResult) {
                    throw new Error("Invalid base64 string");
                }
                const mimeType = matchResult[1];
                
                const file = await this.base64ToFile(base64Data, "example.jpg", mimeType);

                const refStorage = storageRef(storage, `${foldername}/${fileName}-${index}`);
                console.log(`Starting upload for ${fileName}-${index}...`);
    
                await new Promise<void>((resolve, reject) => {
                    const uploadTask = uploadBytesResumable(refStorage, file);
    
                    uploadTask.on(
                        "state_changed",
                        (snapshot: UploadTaskSnapshot) => {
                            console.log(`${fileName}-${index} upload is ${((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(2)}% done`);
                        },
                        (error: unknown) => {
                            console.error(`Error during ${fileName}-${index} upload:`, error);
                            reject(new Error(`Image upload failed for ${fileName}-${index}. Please try again.`));
                        },
                        () => {
                            resolve(); 
                        }
                    );
                });
    
                const downloadURL = await getDownloadURL(refStorage); 
                downloadURLs.push(downloadURL); 
            }

            console.log("Files available at", downloadURLs);
    
            return downloadURLs;
    
        } catch (error) {
            console.error("Error during image upload:", error);
            throw new Error("Image upload failed. Please try again.");
        }
    } 
}

export default FirebaseUpload;
