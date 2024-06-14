import React from "react";
import "../App.css";
import { MdKeyboardArrowDown } from "react-icons/md";

function RefilStk() {
  return (
    <div class="RefilStk">
      <div class="w-auto">
        <div class="mt-[10px] ml-[610px]  mr-[10px] rounded-[14.897px] border-[rgba(0,_0,_0,_1)] border-solid border bg-[#fff] flex flex-grow flex-col text-[#000] font-normal text-center w-[600px] h-[80px] pt-[0] px-[2px] pb-[80px]">
          <div class="rounded-tl-[14.897px] rounded-br-none rounded-tr-[14.897px] rounded-bl-none border-[0px] border-[solid] border-[#000] [box-shadow:0px_5.959px_5.959px_0px_rgba(0,_0,_0,_0.25)] bg-[rgba(217,_217,_217,_0.05)] flex w-[595px] h-[80px] gap-[20px] pl-[24px] pr-[11px] py-[13px]">
            <div class="flex-grow mx-[0] my-[auto] [font:25px_Calibri,_sans-serif]">
              Refill Stock Reminders
            </div>
            <li class="list-none font-[Calibri,_sans-serif] my-[auto] text-[27px] text-red-600">
              <a href="/">Entire List Below</a>
            </li>
            <div class="text-red-600 text-[50px]">
              <MdKeyboardArrowDown />
            </div>
          </div>
        </div>
        <div className=" ml-[10px] mr-[500px] rounded-[14.897px] border-[rgba(0,_0,_0,_1)] border-solid border bg-[#fff] flex flex-grow flex-col text-[#000] font-normal text-center w-[600px] h-[200px] pt-[0] px-[2px] pb-[80px] overflow-x-auto overflow-y-auto"></div>
      </div>
    </div>
  );
}

export default RefilStk;
