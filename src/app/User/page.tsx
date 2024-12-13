
import React from "react";

import ServerRequests from "@/app/api/ServerRequests";  

import UserTableBody from "./UserTableBody";

import { getUserData } from "../api/UserData"; 

import {User} from "../schemas/UserSchema";


const page = async () => {

  const userData: User = await getUserData();

  if(!Array.isArray(userData?.roles?.User) || !userData.roles.User.includes('canUpdateUser')){
    return <div>You do not have permission to view this page</div>
  } 
  
  const serverRequests = new ServerRequests();

  const res = await serverRequests.getAllRoles();  

  const userRes = await serverRequests.getAllUsers();   

  return (
    <> 
        
      <div
        className={`relative md:min-h-[90vh] flex flex-col md:justify-center md:items-center px-4 overflow-clip `}
      >
        <div className="h-[10vh] md:hidden " />

        <h2 className="text-3xl tracking-wider font-semibold mb-4">
          Users
        </h2>  

        <div className="rounded-box md:max-h-[60vh] w-full md:w-[80vw] 2xl:w-[70vw] overflow-auto border shadow-2xl backdrop-blur-md " >
          <table className="w-full table table-pin-rows ">
            <thead>
              <tr className=" bg-base-200 ">
                <th className="border p-2">Name</th>
                {Object.keys(res.data).map((key) => (
                  <th key={key} className="border p-2">
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <UserTableBody userRes={userRes} res={res}/>
            </tbody> 
            <tfoot>
              <tr className=" bg-base-200 ">
                <th className="border p-2">Name</th>
                {Object.keys(res.data).map((key) => (
                  <th key={key} className="border p-2">
                    {key}
                  </th>
                ))}
              </tr>
            </tfoot>
          </table>
        </div>
        <div className="h-[15vh] md:hidden " />
      </div>
    </>
  );
};

export default page;
