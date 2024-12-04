import React from "react";

import ServerRequests from "@/app/api/ServerRequests";

import { Offense } from "@/app/schemas/OffenseSchema";

import CreateButton from "./CreateButton"; 
import UpdateButton from "./UpdateButton";
import DeleteButton from "./DeleteButton";

import CreateOffenseModal from "./Create/CreateOffenseModal"; 
import DeleteOffenseModal from "./Delete/DeleteOffenseModal";
import UpdateOffenseModal from "./Update/UpdateOffenseModal";


const page = async () => {
  const serverRequests = new ServerRequests();

  const res = await serverRequests.fetchOffenseList();

  const offenseList: Offense[] = res.data || [];

  return (
    <>
        <CreateOffenseModal />
        <UpdateOffenseModal />
        <DeleteOffenseModal />
        
      <div
        className={`relative md:min-h-[90vh] flex flex-col md:justify-center md:items-center px-4 overflow-clip `}
      >
        <div className="h-[10vh] md:hidden " />

        {/* <h1 className='blur-[3px] absolute text-3xl md:text-6xl lg:text-8xl font-semibold mb-6 tracking-[15px] md:tracking-[35px] lg:tracking-[55px] opacity-80'>Offenses</h1> */}

        <h2 className="text-3xl tracking-wider font-semibold mb-4">
          Offenses and Remedial Actions
        </h2>

        {/* action buttons */}
        <div className="w-full md:w-[80vw] 2xl:w-[70vw] flex justify-end gap-4 mb-2 ">
          <CreateButton />
          <UpdateButton />
          <DeleteButton />
        </div>

        <div className="rounded-box md:max-h-[60vh] w-full md:w-[80vw] 2xl:w-[70vw] overflow-auto border shadow-2xl backdrop-blur-md " >
          <table className="w-full table table-pin-rows ">
            <thead>
              <tr className="bg-gray-800 text-white/80">
                <th className="border p-2">Code</th>
                <th className="border p-2">Violation</th>
                <th className="border p-2 min-w-[80vw] md:min-w-[50vw] xl:min-w-max">
                  Description
                </th>
                <th className="border p-2 min-w-[80vw] md:min-w-[40vw] xl:min-w-max">
                  Remedial Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {offenseList?.map((offense) => (
                <tr className=" hover:bg-base-200 " key={offense._id}>
                  <td className="border p-2 text-center">{offense.number}</td>
                  <td className="border p-2">{offense.title}</td>
                  <td className="border p-2 whitespace-pre-line">
                    {offense.description}
                  </td>
                  <td className="border p-2 whitespace-pre-line">
                    {offense.remedialActions.map((action) => `• ${action}\n`)}
                  </td>
                </tr>
              ))}
            </tbody> 
          </table>
        </div>
        <div className="h-[15vh] md:hidden " />
      </div>
    </>
  );
};

export default page;
