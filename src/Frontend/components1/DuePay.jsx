import React from "react";
import "../App.css";

function DuePay() {
  return (
    <div className="DuePay">
      <div className="w-auto">
        <div className="mt-[80px] ml-[15px] w-[404px] h-[210px] text-center bg-white rounded-2xl border border-black border-solid  ">
          <div className="flex gap-5 w-full text-black max-md:flex-wrap max-md:max-w-full">
            <div className="flex-auto text-4xl mt-[10px]">Due Payments</div>
            <div className="flex gap-5 items-center self-start text-3xl whitespace-nowrap max-md:flex-wrap"></div>
          </div>
          <div className="flex gap-5 justify-between items-start px-px mt-14 w-full max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
            <div className="flex gap-5 justify-between self-end mt-8 text-2xl font-bold text-black whitespace-nowrap">
              <button className="w-[190px] justify-center px-3 py-3 border border-solid hover:bg-blue-700 bg-opacity-40 border-black border-opacity-50 rounded-[30.602px] active:border-white duration-300 active:text-white">
                <li className="list-none" href="/">
                  Customer
                </li>
              </button>
              <button className="w-[190px] justify-center px-3 py-3 border border-solid hover:bg-blue-700 bg-opacity-0 border-black border-opacity-50 rounded-[30.602px] active:border-white duration-300 active:text-white">
                <li className="list-none" href="/">
                  Distributor
                </li>
              </button>
            </div>
          </div>
        </div>
        <div className=" ml-[15px] mr-[10px] rounded-[14.897px] border-[rgba(0,_0,_0,_1)] border-solid border bg-[#fff] flex flex-grow flex-col text-[#000] font-normal text-center w-[404px] h-[660px] pt-[0] px-[2px] pb-[80px] overflow-x-auto overflow-y-auto"></div>
      </div>
    </div>
  );
}

export default DuePay;
