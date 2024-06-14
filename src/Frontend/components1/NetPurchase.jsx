import React from "react";
import "../App.css";
import { useState } from "react";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";

function NetPurshase() {
  const [isExpanded, setIsExpanded] = useState(false);

  const showisAiOutlineCaretDown = isExpanded;
  const showisAiOutlineCaretUp = !isExpanded;
  return (
    <div class="NetPurshase">
      <div class="w-auto">
        <div class="mt-[10px] ml-[10px]  rounded-[14.897px] border-[rgba(0,_0,_0,_1)] border-solid border bg-[#fff] flex flex-grow flex-col text-[#000] font-normal text-center w-[323px] h-[80px] pt-[0] px-[2px] pb-[80px]">
          <div class="rounded-tl-[14.897px] rounded-br-none rounded-tr-[14.897px] rounded-bl-none border-[0px] border-[solid] border-[#000] [box-shadow:0px_5.959px_5.959px_0px_rgba(0,_0,_0,_0.25)] bg-[rgba(217,_217,_217,_0.05)] flex w-[317px] h-[80px] gap-[20px] pl-[24px] pr-[11px] py-[13px]">
            <div class=" flex-grow mx-[0] my-[auto] [font:24px_Calibri,_sans-serif]">
              Net Purchases
            </div>
            <div class="relative">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                class="rounded-[10.052px] w-[140px] border-[rgba(0,_0,_0,_0.5)] border-solid border bg-[rgba(198,_191,_191,_0.1)] flex whitespace-nowrap justify-between pl-[20px] pr-[20px] py-[10px] hover:bg-[rgba(13,_152,_186)] active:border-white duration-300 active:text-white"
              >
                <div class="font-[Calibri,_sans-serif] m-[1px] text-[23px]">
                  Today
                </div>
                {showisAiOutlineCaretDown && <AiOutlineCaretDown size={32} />}
                {showisAiOutlineCaretUp && <AiOutlineCaretUp size={32} />}
              </button>
              {isExpanded && (
                <div className="absolute bg-[rgba(13,_152,_186)] rounded border list-none cursor-pointer w-full mt-[5px]">
                  <li
                    onClick={() => {
                      setIsExpanded(false);
                    }}
                    class="hover:bg-green-300 text-[24px]"
                  >
                    This Month
                  </li>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className=" ml-[10px] mr-[10px] rounded-[14.897px] border-[rgba(0,_0,_0,_1)] border-solid border bg-[#fff] flex flex-grow flex-col text-[#000] font-normal text-center w-[323px] h-[200px] pt-[0] px-[2px] pb-[80px]"></div>
      </div>
    </div>
  );
}

export default NetPurshase;
