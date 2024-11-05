/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { createContext, useState, useContext, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { CardsSchema, UserDataFromGoogleSchema, ToastOptionsSchema } from '../Schema';
import { useSession } from 'next-auth/react';
import { Session } from 'next-auth';

import { useRouter } from 'next/navigation';

import ServerRequests from '../api/ServerRequests';

import firebaseConfig from '../api/firebase';
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { env } from 'process';



// Define the properties of the context
interface AppContextProps {
  userData: UserDataFromGoogleSchema;
  setUserData: (data: UserDataFromGoogleSchema) => void;
  sampleText: string;
  cards: CardsSchema;
  pathname: string;
  toastOptions: ToastOptionsSchema;
  setToastOptions: (data: ToastOptionsSchema) => void;
  serverRequests: ServerRequests;
}

// Create the default context with proper types and default values
const AppContext = createContext<AppContextProps>({
  userData: {
    _id: '',
    _version: 0,
    roles: [],
    createdAt: {},
    isApproved: false,
    email: '',
    displayName: '',
    image: '',
  },
  setUserData: () => {},
  sampleText: '',
  cards: {},
  pathname: '',
  toastOptions: {open: false, message: '', type: '', timer: 0},
  setToastOptions: () => {},
  serverRequests: new ServerRequests(false),
});


export default function ContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { data: session, status } = useSession(); 
  const router = useRouter();
  const serverRequests = new ServerRequests(false);

  const [environment, setEnvironment] = useState<string>('');
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);
  const auth = getAuth(app);
  const isTestEnv =  process.env.NEXT_PUBLIC_CYPRESS_IS_TEST_ENV

  // User state initialized with an empty user object
  const [userData, setUserData] = useState<UserDataFromGoogleSchema>({
    _id: '',
    _version: 0,
    roles: [],
    createdAt: {},
    isApproved: false,
    email: '',
    displayName: '',
    image: '',
  });

  const [sampleText] = useState<string>('');
  const [cards, setCards] = useState<CardsSchema>({})
  


  const [toastOptions, setToastOptions] = useState({open:false, message: '', type: '', timer: 0});

  useEffect(() => {
    setCards(
      { 
          "Employee": [
              {
              path: '/Employee/Create',
              title: 'Create Employee',
              description: 'Create a new Employee Record',
              icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
              </svg> ,
              roles: [], 
              },
              {
              path: '/Employee/Update',
              title: 'Update Employee',
              description: 'Update an Employee',
              icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75a4.5 4.5 0 0 1-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 1 1-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 0 1 6.336-4.486l-3.276 3.276a3.004 3.004 0 0 0 2.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.867 19.125h.008v.008h-.008v-.008Z" />
              </svg> ,
              roles: [], 
              },
              {
              path: '/Employee/Delete',
              title: 'Delete Employee',
              description: 'Delete an Employee',
              icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM4 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 10.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
              </svg> ,
              roles: [], 
              }
          ],
          "Offense": [
              {
              path: '/Offense/Create',
              title: 'Create Offense',
              description: 'Create an Offense', 
              icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg> ,
              roles: [], 
              },
              {
              path: '/Offense/Update',
              title: 'Update Offense',
              description: 'Update an Offense',
              icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
              </svg> ,
              roles: [], 
              },
              {
              path: '/Offense/Delete',
              title: 'Delete Offense',
              description: 'Delete an Offense', 
              icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg> ,
              roles: [], 
              }
          ],
          "Memorandum": [
              {
              path: '/Memorandum/Create',
              title: 'Create Memorandum',
              description: 'Create a Memorandum',
              icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
              </svg> ,
              roles: [], 
              },
              {
              path: '/Memorandum/Submit',
              title: 'Submit Memorandum',
              description: 'Submit a Memorandum',
              icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m9 13.5 3 3m0 0 3-3m-3 3v-6m1.06-4.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
              </svg> ,
              roles: [], 
              },
              {
              path: '/Memorandum/Delete',
              title: 'Delete Memorandum',
              description: 'Delete a Memorandum',
              icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 13.5H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
              </svg> ,
              roles: [], 
              }
          ]
      }
    )
  },[]);

  useEffect(() => {
    serverRequests.getEnvironment().then((res) => {
      console.log('res', res);
      setEnvironment(res.data);
    }).catch((error) => {
      console.log('error', error);
    });
  }, []) 
  
  useEffect(() => {
    if (session?.user) {
      const user = session.user as Session["user"] & {
        roles?: string[];
        _id?: string;
        _version?: number;
        createdAt?: object;
        isApproved?: boolean;
      };

      const { name: displayName, email, image, roles, _id, _version, createdAt, isApproved } = user; 

      setUserData({
        image: image || '',
        _id: _id || '',
        _version: _version || 0,
        roles: roles || [],
        createdAt: createdAt || {},
        isApproved: isApproved || false,
        email: email || '',
        displayName: displayName || ''
      });

      // console.log('userData', userData);
      setToastOptions({open:true, message: `Welcome ${displayName}`, type: 'success', timer: 5});
    } 

    if (status === 'unauthenticated' && !isTestEnv)  {
      router.push('/api/auth/signin');
    }
    if (status === 'unauthenticated' && isTestEnv) {
      router.push('/');
      serverRequests.deleteAllDataInCollection('User')
      serverRequests.getUserForTesting().then((res) => {
        console.log('res', res);
        setUserData(res.data);
      })
    }
    
  }, [session, status, router]);

  // Define the global values to be shared across the context
  const globals = {
    userData,
    setUserData,
    sampleText,
    cards,
    pathname,
    toastOptions, setToastOptions,
    serverRequests
  };

  return <AppContext.Provider value={globals}>{children}</AppContext.Provider>;
}

// Custom hook to use the AppContext in other components
export function useAppContext() {
  return useContext(AppContext);
}
