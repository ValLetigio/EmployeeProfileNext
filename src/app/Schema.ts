
export interface CardSchema {
    path: string;
    id: string;
    icon: React.ReactNode; 
    roles: string[];
    description: string;
    title: string;
}


export interface CardsSchema {
    [key: string]: CardSchema[]; 
}  


export interface UserDataSchema {
    image: string;
    _id: string;
    _version: number;
    roles: string[];
    createdAt: object;
    isApproved: boolean;
    email: string;
    displayName: string;
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
    _id: string
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

export interface DataToUpdate {
    [key: string]: unknown;
}


export interface ToastOptionsSchema {
    open: boolean;
    message: string;
    type: string;
    timer: number;
}

export interface Offense {
    number: number;
    description: string;
    remedialActions: string[];
}
export interface Memo {
    date: string;
    mediaList: string[];
    Employee: Employee;
    memoPhotosList: string[];
    subject: string;
    description: string;
    MemoCode: Offense;
    submitted: boolean;
    reason: string;
}