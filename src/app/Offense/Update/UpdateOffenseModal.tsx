import React from "react";

import UpdateOffenseForm from "./UpdateOffenseForm";

import { Offense } from '@/app/schemas/OffenseSchema';

import ServerRequests from '@/app/api/ServerRequests';


const UpdateOffenseModal = async () => {

    const serverRequests = new ServerRequests( ); 
  
    const res = await serverRequests.fetchOffenseList();
  
    const offenseList: Offense[] = res.data;  
  
    const remedialActions = [
      "Written Reprimand",
      "Verbal Reprimand",
      "Verbal And Written Reprimand",
      "1 Day Suspension",
      "3 Days Suspension",
      "5 Days Suspension",
      "7 Days Suspension",
      "15 Days Suspension",
      "30 Days Suspension",
      "15 Days Suspension Or Management Discretion",
      "Dismissal",
      "Dismissal based on Offense Severity", 
      "Written Reprimand / Suspension / Dismissal",
      "3 Days Suspension + 7 Days Gadget Confiscation",
      "7 Days Suspension + 15 Days Gadget Confiscation",
      "15 Days Suspension + 30 Days Gadget Confiscation",
    ];

  return (
    <dialog
      id="updateOffenseModal"
      className="modal w-screen h-screen "
    > 
        <div className={` form-container relative`}>
            <form className="absolute top-2 right-2" method="dialog">
                <button className="close-button">X</button>
            </form>  
            <UpdateOffenseForm 
                confirmation={false} 
                offenseList={offenseList} 
                remedialActions={remedialActions} 
            />
        </div> 
    </dialog>
  );
};

export default UpdateOffenseModal;
