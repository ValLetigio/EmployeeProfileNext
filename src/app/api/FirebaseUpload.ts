import { ref as storageRef, uploadBytes, getDownloadURL, uploadBytesResumable, UploadTaskSnapshot } from "firebase/storage"; 

import { storage, db } from "./firebase";

import { collection, addDoc } from "firebase/firestore";

class FirebaseUpload { 
    
    async Image(image: File, foldername: string): Promise<string> {
        try {
            const refStorage = storageRef(storage, `${foldername}/${image.name}`);
            console.log("Starting upload..."); 

            const uploadTask = uploadBytesResumable(refStorage, image); 
            console.log(uploadTask)
            
            uploadTask.on(
                "state_changed",
                (snapshot: UploadTaskSnapshot) => {
                    console.log("Upload is " + (snapshot.bytesTransferred / snapshot.totalBytes) * 100 + "% done");
                },
                (error: unknown) => {
                    console.error("Error during image upload:", error);
                    throw new Error("Image upload failed. Please try again.");
                },
                () => {
                    console.log("Upload completed successfully");
                }
            )

            return "test";
        } catch (error) {
            console.error("Error during image upload:", error);
            throw new Error("Image upload failed. Please try again.");  
        }
    }

    async writeTest (name: string, email: string ) {    
        const docRef = await addDoc(collection(db, `users`), {
            username: name,
            email: email,
        });
        console.log("Document written with ID: ", docRef.id);
        return({res: docRef.id , message: "Data written successfully!"});
        
        // set(dbRef(db, 'users/' + name), {
        //     username: name,
        //     email: email, 
        // }).then((res) => { 
        //     return({res: res , message: "Data written successfully!"});
        // }).catch((error) => {
        //     console.error("Error writing data:", error);
        //     throw new Error("Data write failed. Please try again.");  
        // });     
    }
}

export default FirebaseUpload;
