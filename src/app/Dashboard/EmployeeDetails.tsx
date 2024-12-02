"use client";

import React from "react";

import { useAppContext } from "../GlobalContext";

import { Employee } from "../schemas/EmployeeSchema";

import { Memo } from "../schemas/MemoSchema";

import Image from "next/image"; 

const EmployeeDetails = () => {
  const {
    selectedEmployee,
    setSelectedEmployee,
    handleImageModalClick,
    handleMemoTableModalClick,
    serverRequests,
    userData,
    loading, setLoading
  } = useAppContext();

  const dummy = React.useRef<HTMLDivElement>(null);

  const [selectedEmployeeMemos, setSelectedEmployeeMemos] = React.useState(
    [] as Memo[]
  );

  const [selectedEmployeeDetails, setSelectedEmployeeDetails] = React.useState(
    {} as Employee
  ); 

  const [fetchingMemos, setFetchingMemos] = React.useState<boolean>(false);

  const [daysWithUs, setDaysWithUs] = React.useState<number>(0); 

  const detailStyle = (item: boolean) =>
    `${ !item && "hidden" } 
    tracking-widest flex grow flex-col text-center p-2 2xl:p-3 border border-base-300 rounded-xl bg-base-100 
    hover:bg-base-300 
  `;
  
  const skeletonStyle = `
    ${ selectedEmployeeDetails?._id ? " hidden " : " block " } 
    ${ loading? " skeleton " : " bg-base-300 rounded-xl " } shrink-0 
  `; 

  const contentStyle = `${ loading? " !m-0 xl:!p-5 !p-0 !w-0 !scale-0 " : selectedEmployee._id? " block " : " hidden "}`;

  const getSelectedEmployeeDetails = async () => {
    setSelectedEmployeeDetails({} as Employee)
    setLoading(true);
    try {
      const res = await serverRequests.getEmployeeDetailsAction(
        userData,
        selectedEmployee?._id || ""
      );
      if (res?.data) {
        setSelectedEmployeeDetails(res.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const getMemosForEmployee = async () => {
    setSelectedEmployeeMemos([] as Memo[]);
    setFetchingMemos(true);
    try { 
      const res = await serverRequests.getMemoList(
        userData,
        selectedEmployee?._id || ""
      );
      if (res?.data) {
        setSelectedEmployeeMemos(res.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setFetchingMemos(false);
    }
  }; 

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if(userData?._id && selectedEmployee?._id){ 
        getMemosForEmployee();
      }
  
      if (selectedEmployee._id) {  
        getSelectedEmployeeDetails()
  
        dummy.current?.scrollIntoView({ behavior: "smooth", block: "end" }); 
  
        const days = (new Date().getTime() - new Date(selectedEmployee.dateJoined).getTime()) / (1000 * 60 * 60 * 24); 
        setDaysWithUs(Math.floor(days));
      }
  
      if(!selectedEmployee._id){
        setSelectedEmployeeDetails({} as Employee)
      }
    }, 100)

    return () => clearTimeout(timeout);

  }, [selectedEmployee, userData]); 

  return (
    <div
      className={`${loading&&"cursor-wait"} relative h-full w-full flex flex-col justify-start items-center rounded-xl shadow-lg border p-4 `}
      ref={dummy}
    >
      {/* clear button */}
      <button
        onClick={() => {setSelectedEmployee({} as Employee), setLoading(false)}}
        className={`${
          !selectedEmployee?._id && "hidden"
        } absolute top-1 right-2 opacity-40`}
      >
        X
      </button>

      {/* avater skelly */}
      <div
        className={skeletonStyle + " !rounded-full py-3 xl:py-8 w-24 xl:w-36 h-24 xl:h-36 mt-2 mb-4"}
      ></div>

      <div className={"w-full flex justify-center py-3 xl:py-8 " + contentStyle} >
        <div className=" indicator ">
          {/* indicator */}
          <span
            className={`
              ${loading&&"hidden"} 
              ${selectedEmployeeMemos.length?" badge-error hover:bg-red-200 "
                : fetchingMemos ? " bg-warning animate-pulse " 
                : " bg-success "}
              cursor-pointer tooltip-top tooltip indicator-item badge text-white absolute `}
            data-tip={`${fetchingMemos?"Fetching" : selectedEmployeeMemos?.length} Memos`}
            onClick={() => selectedEmployeeMemos?.length&&handleMemoTableModalClick(selectedEmployeeMemos)}
          > 
            {fetchingMemos ? "..." : selectedEmployeeMemos?.length} 
          </span>
          
          <div
            className={`${!selectedEmployeeDetails?._id&&"hidden"} 
              w-24 xl:w-36 h-24 xl:h-36 ring-gray-700 ring-offset-base-100 ring-2 ring-offset-0 rounded-full overflow-clip cursor-pointer relative`}
            onClick={() =>
              handleImageModalClick([selectedEmployeeDetails?.photoOfPerson])
            }
          >
            <Image
              className={` w-full h-full`}
              src={selectedEmployeeDetails?.photoOfPerson}
              alt={selectedEmployeeDetails?.name } 
              fill
              sizes="(max-width: 768px) 100vw, 700px"
              loading="lazy"
              // height={100}
              // width={100}
            />
          </div>
        </div>
      </div>

      {/* employee name & address skelly*/}
      <div className={skeletonStyle + " h-8 w-[40%] mb-1 xl:mb-3"}></div>
      <div className={skeletonStyle + " h-6 w-[70%] "}></div>
      
      {/* employee name & address */} 
      <div className="">
        {selectedEmployeeDetails?.name && (
          <h2 className="text-2xl font-semibold">{selectedEmployeeDetails?.name}</h2>
        )}
      </div>
      <div>
        <h3>{selectedEmployeeDetails?.address}</h3>
      </div> 


      <div className="w-full border-b my-4 " />

      <div className="flex flex-wrap gap-3 items-stretch w-full h-max text-xs overflow-auto max-h-[70%] pb-2 ">
        <div
          className={
            skeletonStyle + " p-4 w-full bg-opacity-55 text-lg text-center tracking-widest"
          }
        >
          {!selectedEmployee?._id ? "Select an Employee" : selectedEmployee?._id && loading ? "Fetching..." : "No Details Found"}
        </div>

        {/* details skelly */}
        <div className={skeletonStyle + " h-12 w-40 grow"}></div>
        <div className={skeletonStyle + " h-12 w-28 grow"}></div>
        <div className={skeletonStyle + " h-12 w-32 grow"}></div>
        <div className={skeletonStyle + " h-12 w-40 grow"}></div>

        {/* details */}
        <div className={detailStyle(Boolean(selectedEmployeeDetails?.company))}>
          <strong className="text-base">{selectedEmployeeDetails?.company}</strong>
          Company
        </div>
        <div className={detailStyle(Boolean(selectedEmployeeDetails?.dateJoined))}>
          <strong className="text-base">
            {selectedEmployeeDetails?.dateJoined?.substring(5, 17)}
          </strong>
          Joined
        </div>
        <div className={detailStyle(Boolean(selectedEmployeeDetails?.dailyWage))}>
          <strong className="text-base">
            ₱ {selectedEmployeeDetails?.dailyWage?.toLocaleString()}
          </strong>
          Daily Wage
        </div>
        <div className={detailStyle(Boolean(selectedEmployeeDetails?.email))}>
          <strong className="text-base">{selectedEmployeeDetails?.email}</strong>
          Email
        </div>
        <div className={detailStyle(Boolean(selectedEmployeeDetails?.phoneNumber))}>
          <strong className="text-base">{selectedEmployeeDetails?.phoneNumber}</strong>
          Phone
        </div>
        <div
          className={detailStyle(
            Boolean(selectedEmployeeDetails?.isProductionEmployee)
          )}
        >
          <strong className="text-base">✔</strong>
          isProduction
        </div>
        <div className={detailStyle(Boolean(selectedEmployeeDetails?.isRegular))}>
          <strong className="text-base">✔</strong>
          isRegular
        </div>
        <div className={detailStyle(Boolean(selectedEmployeeDetails?.dateJoined))}>
          <strong className="text-base">
            {daysWithUs?.toLocaleString()}
          </strong>
          Days with Us
        </div>
      </div>

      <div className="absolute flex justify-stretch bottom-2 gap-4 w-full text-center py-1 px-4">
        {/* resumePhotosList && biodataPhotosList skelly */}
        <div className={skeletonStyle + " h-12 w-[48%]"}></div>
        <div className={skeletonStyle + " h-12 w-[48%]"}></div>

        {/* resumePhotosList */}
        <div
          onClick={() =>
            handleImageModalClick(selectedEmployeeDetails?.resumePhotosList)
          }
          className={`${!selectedEmployeeDetails?.resumePhotosList?.[0] && "hidden"} 
                p-2 xl:p-4 flex items-center justify-evenly bg-base-200 hover:bg-base-300 cursor-pointer hover:text-white w-full rounded-xl`}
        >
          Resume
          <Image
            className={`w-8 h-8`}
            src={selectedEmployeeDetails?.resumePhotosList?.[0] }
            alt={selectedEmployeeDetails?.name}
            width={100}
            height={100}
            loading="lazy" 
          ></Image>
        </div>
        {/* biodataPhotosList */}
        <div
          onClick={() =>
            handleImageModalClick(selectedEmployeeDetails?.biodataPhotosList)
          }
          className={`${!selectedEmployeeDetails?.biodataPhotosList?.[0] && "hidden"} 
            p-2 xl:p-4 flex items-center justify-evenly bg-base-200 hover:bg-base-300 cursor-pointer hover:text-white w-full rounded-xl`}
        >
          Bio-data
          <Image
            className={`w-8 h-8`}
            src={selectedEmployeeDetails?.biodataPhotosList?.[0] }
            alt={selectedEmployeeDetails?.name}
            width={100}
            height={100}
            loading="lazy" 
            ></Image>
        </div>
      </div>
      <div className="py-6 pt-14 "> </div>
    </div>
  );
};

export default EmployeeDetails;
