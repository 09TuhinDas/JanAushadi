import { React, useState } from "react";
import "../App.css";
import InventAdd from "./InventAdd";
import { Link } from "react-router-dom";

function Invent() {
  const [files, setFile] = useState(null);

  function handleUpload() {
    if (!files) {
      console.log("No File Selected");
      return;
    }

    const fd = new FormData();
    for (let i = 0; i < files.length; i++) {
      fd.append("file${i+1}", files[i]);
    }
  }
  return (
    <div className="Invent">
      <div className="">
        <button
          onClick={() => (window.location.href = "/InventAdd")}
          className="mt-[100px] ml-[50px] shadow-sm rounded-[30.859px] justify-center px-8 py-4 border border-black border-solid bg-zinc-300 hover:bg-green-500 bg-opacity-90 max-md:px-5 active:border-white duration-300 active:text-white"
        >
          <li className="list-none text-[25px]">Add Items</li>
        </button>

        <button className="mt-[100px] ml-[20px] shadow-sm rounded-[30.859px] justify-center px-8 py-4 border border-black border-solid bg-zinc-300 hover:bg-green-500 bg-opacity-90 max-md:px-5 active:border-white duration-300 active:text-white">
          <li className="list-none text-[25px]" href="/">
            Edit Items
          </li>
        </button>
        <button className="mt-[100px] ml-[70px] mr-[190px] shadow-sm rounded-[30.859px]  px-8 py-4 justify-center   border border-black border-solid bg-zinc-300 hover:bg-blue-700 bg-opacity-90 max-md:px-5 active:border-white duration-300 active:text-white">
          <li className="list-none text-[25px]" href="/">
            View Items
          </li>
        </button>
        <input
          onChange={(e) => {
            e.target.files[0];
          }}
          type="file"
          multiple
        />
        <button
          onClick={handleUpload}
          className="mt-[100px] ml-[20px] justify-center px-4 shadow-sm rounded-[30.859px] border border-black border-solid bg-zinc-300 hover:bg-red-600 bg-opacity-90 max-md:px-5 active:border-white duration-300 active:text-white"
        >
          <li className="list-none text-[25px]" href="/">
            Upload PDF
          </li>
        </button>
      </div>
      <div className="overflow-x-auto overflow-y-auto">
        <table>
          <thead className="mt-[40px] ml-[20px] mr-[20px] flex">
            <tr>
              <th className="ml-[9px] gap-0 px-1 text-[21px] font-bold text-center text-black  bg-zinc-300 border-x-2   bg-white border-t border-b border-black  text-center">
                S.No
              </th>
              <th className="ml-[9px] gap-0 px-7 text-[21px] font-bold text-center text-black  bg-zinc-300 border-x-2   bg-white border-t border-b border-black  text-center">
                Drug code
              </th>
              <th className=" gap-0 px-20 text-[21px] font-bold text-center text-black  bg-zinc-300 border-x-2  bg-white border-t border-b border-black  text-center">
                Product Name
              </th>
              <th className="gap-0 px-7 py-7 text-[21px] font-bold text-center text-black  bg-zinc-300 border-x-2   bg-white border-t border-b border-black  text-center">
                Batch No.
              </th>
              <th className="gap-0 px-3 py-7 text-[21px] font-bold text-center text-black  bg-zinc-300 border-x-2   bg-white border-t border-b border-black  text-center">
                Stock Qty.
              </th>
              <th className="gap-0 px-3 py-7 text-[21px] font-bold text-center text-black  bg-zinc-300 border-x-2   bg-white border-t border-b border-black ] text-center">
                Pack
              </th>
              <th className="gap-0 px-7 py-7 text-[21px] font-bold text-center text-black  bg-zinc-300 border-x-2   bg-white border-t border-b border-black  text-center">
                Purchase Value
              </th>
              <th className="gap-0 px-7 py-7 text-[21px] font-bold text-center text-black  bg-zinc-300 border-x-2   bg-white border-t border-b border-black  text-center">
                MRP.
              </th>
              <th className="gap-0 px-3 text-[21px] font-bold text-center text-black  bg-zinc-300 border-x-2   bg-white border-t border-b border-black  text-center">
                Disc%
              </th>
              <th className="gap-0 px-9 text-[21px] font-bold text-center text-black  bg-zinc-300 border-x-2   bg-white border-t border-b border-black  text-center">
                Mfg. Date
              </th>
              <th className="gap-0 px-9 text-[21px] font-bold text-center text-black  bg-zinc-300 border-x-2   bg-white border-t border-b border-black  text-center">
                Expiry
              </th>
              <th className="gap-0 px-3 text-[21px] font-bold text-center text-black  bg-zinc-300 border-x-2   bg-white border-t border-b border-black  text-center">
                Amount
              </th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  );
}

export default Invent;
