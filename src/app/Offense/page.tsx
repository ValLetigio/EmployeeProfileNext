import React from "react";

import ServerRequests from "@/app/api/ServerRequests";

import { Offense } from "@/app/schemas/OffenseSchema";

import CreateButton from "./CreateButton"; 
import UpdateButton from "./UpdateButton";
import DeleteButton from "./DeleteButton";

import CreateOffenseModal from "./Create/CreateOffenseModal"; 
import DeleteOffenseModal from "./Delete/DeleteOffenseModal";
import UpdateOffenseModal from "./Update/UpdateOffenseModal";

import SearchBar from "../Dashboard/SearchBar";

import OffenseTable from "./OffenseTable";


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
        <div className="w-full md:w-[80vw] h-full 2xl:w-[70vw] flex flex-col md:flex-row justify-between bg-base-200 rounded-t-box px-2 border border-b-none">
          <div className="flex justify-evenly md:justify-start items-center gap-4 px-2 py-2 ">
            <CreateButton />
            <UpdateButton />
            <DeleteButton />
          </div>
          <div className="py-2 ">
            <SearchBar></SearchBar>
          </div>
        </div>

        <div className="bg- rounded-box rounded-t-none md:max-h-[60vh] w-full md:w-[80vw] 2xl:w-[70vw] overflow-auto border shadow-2xl backdrop-blur-md border-t-none" >
          <OffenseTable offenseList={offenseList}/>
        </div>
        <div className="h-[15vh] md:hidden " />
      </div>
    </>
  );
};

export default page;
