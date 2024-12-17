import React from "react";

import CreateOffenseForm from "./CreateOffenseForm";

const CreateOffenseModal = () => {
  return (
    <dialog
      id="createOffenseModal"
      className="modal w-screen h-screen "
    > 
        <div className={` form-container relative`}>
            <form className="absolute top-2 right-2" method="dialog">
                <button className="close-button"></button>
            </form>  
            <CreateOffenseForm confirmation={false}/>
        </div> 
    </dialog>
  );
};

export default CreateOffenseModal;
