import react from "react";
import "../App.css";

function PCdetails() {
  return (
    <div class="Product-invoice">
      <div className="flex mt-[75px]">
        <div className=" ml-[9px] flex flex-col grow shrink-0 justify-center items-start py-1 px-2 text-[27px] font-bold bg-white border-t-2 border-b border-black border-solid basis-0 border-x-2 w-[690px] h-[55px]">
          <div className=" justify-center py-1.5 bg-white">Product Search</div>
        </div>
        <div className=" ml-[9px] mr-[9px] flex flex-col grow shrink-0 justify-center items-start self-start px-4 py-1 text-[17px] text-center whitespace-nowrap border-2 border-black border-solid basis-0 bg-stone-300   ">
          <div className="justify-center px-2.5 py-2 bg-white border border-black border-solid">
            Invoice/Order
          </div>
        </div>
      </div>
      <div className="flex">
        <div class="details&invoice">
          <div className="mt-[9px] ml-[9px] shrink-0 bg-white border-t border-b border-black border-solid border-x-2 h-[240px] w-[390px]">
            <div className="mt-[7px]">Name</div>
          </div>
          <div className="ml-[9px] justify-center px-5 py-2 bg-white text-[20px] border-t border-b border-black border-solid border-x-2 w-[390px]">
            Customer Details
          </div>
          <div className="ml-[9px] mb-[9px] shrink-0 bg-white border-t border-b-2 border-black border-solid border-x-2 h-[450px] w-[390px]" />
        </div>
        <div className="overflow-x-auto">
          <div className="ml-[9px] flex gap-0 px-4  mt-1.5 text-[13px] font-bold text-center text-black border-t-2 border-b border-black border-solid bg-zinc-300 border-x-2 h-[70px] ">
            <div className="justify-center px-2 py-4 whitespace-nowrap border-r-2 border-black border-solid bg-zinc-300">
              S.No
            </div>
            <div className="justify-center px-2 py-3.5 whitespace-nowrap border-r-2 border-black border-solid bg-zinc-300">
              Drug Code
            </div>
            <div className="justify-center px-16 py-4 border-r-2 border-black border-solid bg-zinc-300 ">
              Product Name
            </div>
            <div className="justify-center px-7 py-4 whitespace-nowrap border-r-2 border-black border-solid bg-zinc-300 max-md:px-5">
              Batch
            </div>
            <div className="justify-center items-start px-9 py-3.5 whitespace-nowrap border-r-2 border-black border-solid bg-zinc-300 max-md:px-5">
              Qty
            </div>
            <div className="justify-center items-start px-7 py-4 whitespace-nowrap border-r-2 border-black border-solid bg-zinc-300 max-md:px-5">
              Pack
            </div>
            <div className="justify-center items-start px-8 py-4 whitespace-nowrap border-r-2 border-black border-solid bg-zinc-300 max-md:px-5">
              MRP
            </div>
            <div className="justify-center px-5 py-4 whitespace-nowrap border-r-2 border-black border-solid bg-zinc-300">
              Disc%
            </div>
            <div className="justify-center px-5 py-3.5 whitespace-nowrap border-r-2 border-black border-solid bg-zinc-300">
              Mfg. Date
            </div>
            <div className="justify-center px-5 py-3.5 whitespace-nowrap border-r-2 border-black border-solid bg-zinc-300">
              Expiry
            </div>
            <div className="justify-center px-3 py-4 whitespace-nowrap border-r-2 border-black border-solid  bg-zinc-300">
              Amount
            </div>
          </div>
        </div>
      </div>

      <div className="ml-[405px] mb-[9px] mr-[9px] h-[65px]  flex gap-5 self-end  pr-7 pl-20 mt-3 text-3xl text-center text-black whitespace-nowrap bg-white border-2 border-black border-solid ">
        <div className="flex flex-col  ">
          <button className="mt-[5px] shadow-sm bg-zinc-300 bg-opacity-80 rounded-[30.859px] h-[50px] w-[200px] hover:bg-blue-300 active:border-white duration-300 active:text-white">
            <li className="list-none" href="/">
              Clear
            </li>
          </button>
        </div>
        <div className="flex flex-col ">
          <button className="mt-[5px] shadow-sm bg-zinc-300 bg-opacity-80 rounded-[30.859px] h-[50px] w-[200px] hover:bg-blue-300 active:border-white duration-300 active:text-white">
            <li className="list-none" href="/">
              Continue
            </li>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PCdetails;
