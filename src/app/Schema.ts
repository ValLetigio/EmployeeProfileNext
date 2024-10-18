
export interface CardSchema {
    path: string;
    icon: React.ReactNode; 
    roles: string[];
    description: string;
    title: string;
}


export interface CardsSchema {
    [key: string]: CardSchema[]; 
}  


export interface UserDataSchema {
    _id: string;
    name: string;
    email: string;
    number: string;
}



export interface UserDataFromGoogleSchema {
    image: string;
    name: string;
    email: string; 
}


export interface ToastOptionsSchema {
    open: boolean;
    message: string;
    type: string; 
    timer: number;
}


export interface EmployeeFormDataSchema {
    name: string,
    address: string,
    phoneNumber: string,
    photoOfPerson: string,
    resumePhotosList: string,
    biodataPhotosList: string,
    email: string,
    dateJoined: string,
    company: string,
    isRegular: boolean
}
