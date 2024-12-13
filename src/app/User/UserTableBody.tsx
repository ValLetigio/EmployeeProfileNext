"use client";

import React from "react";

import { User } from "@/app/schemas/UserSchema"; 

import { useAppContext } from "../GlobalContext";

interface UserTableBodyProps {
  userRes: {data: User[], message: string};
  res: {data: {[k: string]: unknown;}, message: string};
}

const UserTableBody: React.FC<UserTableBodyProps> = ({ userRes, res }) => {

    const { userData, serverRequests, router } = useAppContext();
     
  const handleRoleClick = async (user: User, category: string, roleToAdd: string, checked: boolean) => {
    if(!checked){
        const res = await serverRequests.addRoleToUser(userData, user, category, roleToAdd);
        router.refresh()
        console.log(res);
    }else{
        const res = await serverRequests.removeRolefromUser(userData, user, category, roleToAdd);
        router.refresh()
        console.log(res);
    } 
  };

  const checkRole = (roles: string[], userRoles: string[], category:string, user: User) => {
    return Object.keys(userRoles).map((key, index) => (
      <div className="flex gap-2 my-2" key={key + index}>
        <input
          onChange={() => handleRoleClick(user, category, key, roles.includes(key))}
          className="checkbox checkbox-sm"
          type="checkbox"
          name={key}
          id={key}
          checked={roles.includes(key)}
        />
        <label htmlFor={key}>{key}</label>
      </div>
    ));
  };

  return (
    <>
      {userRes.data.map((user: User, idx: number) => (
        <tr key={user._id||"" + idx} className="border-b">
          <td className="border p-2">{user.displayName}</td>
          {Object?.keys(res?.data || {}).map((key: string) => (
            <td key={key} className="border p-2  ">
              {checkRole(user.roles[key] as string[], res.data[key] as string[], key, user)}
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};

export default UserTableBody;
