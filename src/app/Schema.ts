
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
    _id: string;
    _version: number;
    roles: string[];
    createdAt: object;
    isApproved: boolean;
    email: string;
    displayName: string;
}

export interface UserObject {
    profile: object;
}

export interface Employee {
    _id: string;
    name: string;
    address: string;
    phoneNumber: string;
    photoOfPerson: string;
    resumePhotosList: string[];
    biodataPhotosList: string[];
    email: string;
    dateJoined: string;
    company: string;
    isRegular: boolean;
    isProductionEmployee: boolean;
    dailyWage: number;
    _version: number;
}