"use client";

import React, { useEffect } from "react";

import { Offense } from "../schemas/OffenseSchema";

import { useAppContext } from "../GlobalContext";

import { useSearchParams } from "next/navigation";

interface OffenseTableProps {
  offenseList: Offense[];
}

const OffenseTable: React.FC<OffenseTableProps> = ({ offenseList }) => {
  const { setLoading, highlightText, setSearch, getOrdinal } = useAppContext();

  const [filteredOffenseList, setFilteredOffenseList] =
    React.useState<Offense[]>(offenseList);

  const searchParams = useSearchParams();

  const search = searchParams.get("search") || "";

  useEffect(() => {
    setSearch(search);
    const filteredList = offenseList.filter((offense) =>
      JSON.stringify(offense)
        .toLowerCase()
        .includes(search?.toLowerCase() || "")
    );
    setFilteredOffenseList(filteredList);
    setLoading(false);
  }, [search]);

  return (
    <table className="w-full table table-pin-rows h-full">
      <thead>
        <tr className=" bg-base-200 divide-x">
          <th className=" p-2">Code</th>
          <th className=" p-2 ">Offense</th>
          <th className=" p-2 min-w-[80vw] md:min-w-[50vw] lg:min-w-[40vw] 2xl:min-w-[25vw]">
            Description
          </th>
          <th className=" p-2 ">
            Remedial Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {filteredOffenseList?.map((offense) => (
          <tr className="  " key={offense._id}>
            <td className="border p-2 text-center font-bold">
              {highlightText(offense?.number?.toString())}
            </td>
            <td className="border p-2 max-w-max md:max-w-[20vw]">
              <div className="">{highlightText(offense?.title || "")}</div>
            </td>
            <td className="border whitespace-pre-line max-h-[60vh] md:max-h-[30vh] p-4">
              <div className="max-h-[55vh] md:max-h-[30vh] lg:max-h-max md:overscroll-contain overflow-y-auto bg-base-300 rounded-box p-4">
                {highlightText(offense.description)}
              </div>
            </td>
            <td className="border px-4 ">
              <div className="flex flex-wrap min-w-[50vw] md:min-w-[100%] gap-2 ">
                {offense?.remedialActions?.map((action, index) => (
                  <div
                    key={action + index}
                    className=" flex flex-col text-start px-2 py-1 bg-neutral text-white rounded-box tooltip tooltip-accent"
                    data-tip={`${getOrdinal(index + 1)} Offense`}
                  >
                    <span>{highlightText(action)}</span>
                  </div>
                ))}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr className=" bg-base-200 divide-x ">
          <th className="  p-2">Code</th>
          <th className="  p-2">Violation</th>
          <th className="  p-2  ">Description</th>
          <th className="  p-2  ">Remedial Actions</th>
        </tr>
      </tfoot>
    </table>
  );
};

export default OffenseTable;
