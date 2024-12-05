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

  let offenseList: Offense[] = res.data || [];

  offenseList = offenseList.sort((a, b) => a.number - b.number);

  return (
    <>
      <CreateOffenseModal />
      <UpdateOffenseModal />
      <DeleteOffenseModal />
        
      <div
        className={`relative md:min-h-[90vh] flex flex-col md:justify-center md:items-center px-4 overflow-clip `}
      >
        <div className="h-[10vh] md:hidden " />

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
              <tr className=" bg-base-200 ">
                <th className="border p-2">Code</th>
                <th className="border p-2">Offense</th>
                <th className="border p-2 min-w-[80vw] md:min-w-[50vw] xl:min-w-max">
                  Description
                </th>
                <th className="border p-2 min-w-[70vw] md:min-w-[25vw] xl:min-w-max">
                  Remedial Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {offenseList?.map((offense) => (
                <tr className=" hover:bg-base-200 " key={offense._id}>
                  <td className="border p-2 text-center font-bold">{offense.number}</td>
                  <td className="border p-2">{offense.title}</td>
                  <td className="border whitespace-pre-line max-h-[60vh] md:max-h-[30vh] p-4">
                    <div className="max-h-[55vh] md:max-h-[30vh] md:overscroll-contain overflow-y-auto bg-base-300 rounded-box p-4"> 
                      {offense.description}
                    </div>
                  </td>
                  <td className="border p-2 whitespace-pre-line">
                    {offense.remedialActions.map((action) => `• ${action}\n`)}
                  </td>
                </tr>
              ))}
            </tbody> 
            <tfoot>
              <tr className=" bg-base-200 ">
                <th className="border p-2">Code</th>
                <th className="border p-2">Violation</th>
                <th className="border p-2 min-w-[80vw] md:min-w-[50vw] xl:min-w-max">
                  Description
                </th>
                <th className="border p-2 min-w-[70vw] md:min-w-[25vw] xl:min-w-max">
                  Remedial Actions
                </th>
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
