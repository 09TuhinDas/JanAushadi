import React from "react";
import "../App.css";
import { NavLink } from "react-router-dom";

function Movingitms() {
  return (
    <div className="Movingitms">
      <div className="w-auto">
        <div className="mt-[80px] ml-[15px] w-[560px] h-[270px] text-center bg-white rounded-2xl border border-black border-solid">
          <div className=" gap-5 px-12 py-3  rounded-2xl border-0 border-black border-solid shadow-sm bg-zinc-300 bg-opacity-10  ">
            <div className="flex gap-5 justify-between text-3xl font-bold text-black">
              <button className="justify-center px-4 py-4 border border-solid hover:bg-fuchsia-600 border-black border-opacity-50 rounded-[30.859px] active:border-white duration-300 active:text-white">
                <li className="list-none" href="/">
                  Slow Moving
                </li>
              </button>
              <button className="justify-center px-6 py-5 bg-white border border-solid hover:bg-fuchsia-600 border-black border-opacity-50 rounded-[30.859px] max-md:pl-5 active:border-white duration-300 active:text-white">
                <li className="list-none" href="/">
                  Fast Moving
                </li>
              </button>
            </div>

            <li className="list-none flex-auto my-auto text-3xl text-red-600">
              <a href="/">View Entire List</a>
            </li>
          </div>
          <div className="flex gap-5 px-3 py-5 mx-5 mt-2 text-3xl text-black bg-white border-0 border-black border-solid  ">
            <div className="flex-auto">Product Name</div>
            <div>Company</div>
            <div>Qty Sold</div>
            <div>Stock</div>
          </div>
        </div>
        <div className=" ml-[15px] mr-[10px] rounded-[14.897px] border-[rgba(0,_0,_0,_1)] border-solid border bg-[#fff] flex flex-grow flex-col text-[#000] font-normal text-center w-[560px] h-[600px] pt-[0] px-[2px] pb-[80px] overflow-x-auto overflow-y-auto"></div>
      </div>
    </div>
  );
}

export default Movingitms;
