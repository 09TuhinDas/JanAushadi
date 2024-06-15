import React from "react";
import "../App.css";

function InventAdd() {
  return (
    <div className="InventAdd">
      <div className="mt-[80px] ml-[9px] flex flex-col grow shrink-0 bg-stone-300 py-1 px-2 text-[27px] font-bold  border-t-2 border-b border-black border-solid basis-0 border-x-2 w-auto h-[55px] text-center">
        Add Items
      </div>
      <div class="Add Items">
        <div className=" ml-[9px] shrink-0 bg-white  h-auto w-auto">
          <form className="mt-[20px] ml-[9px] text-[30px]" action="">
            <div className="mb-[7px]">
              Drug code
              <input
                className="ml-[5px] mb-[10px] rounded-[10.052px] border-[rgba(0,_0,_0,_0.5)] border-solid border w-[120px] "
                type="number"
                name="Drug-code"
              />
            </div>
            <div className="mb-[7px]">
              Product Name
              <input
                className="ml-[5px] mb-[10px] rounded-[10.052px] border-[rgba(0,_0,_0,_0.5)] border-solid border w-[290px] "
                type="text"
                name="Product-Name"
              />
            </div>
            <div className="mb-[20px]">
              Batch No. :
              <input
                className="ml-[5px] rounded-[10.052px] border-[rgba(0,_0,_0,_0.5)] border-solid border w-[140px] "
                type="text"
                name="Batch-no"
              />
            </div>
            <div className="mb-[20px]">
              Quantity:
              <input
                className="ml-[5px] rounded-[10.052px] border-[rgba(0,_0,_0,_0.5)] border-solid border w-[70px]"
                type="Number"
                placeholder="0"
                name="Quantity"
              />
            </div>
            <div className="mb-[20px]">
              Discount:
              <input
                className="ml-[5px] rounded-[10.052px] border-[rgba(0,_0,_0,_0.5)] border-solid border w-[90px]"
                type="Number"
                placeholder="0.00"
                name="Discount"
              />
            </div>
            <div className="mb-[20px]">
              Pack size:
              <input
                className="ml-[5px] rounded-[10.052px] border-[rgba(0,_0,_0,_0.5)] border-solid border w-[90px]"
                type="number"
                name="Pack-size"
              />
            </div>
            <div className="mb-[20px]">
              Manufacturing Date:
              <input
                className="ml-[5px] rounded-[10.052px] border-[rgba(0,_0,_0,_0.5)] border-solid border w-[220px]"
                type="date"
                name="Mfg-Date"
              />
            </div>
            <div className="mb-[20px]">
              Expiry Date:
              <input
                className="ml-[5px] rounded-[10.052px] border-[rgba(0,_0,_0,_0.5)] border-solid border w-[220px]"
                type="Date"
                name="Expire-date"
              />
            </div>
            <div className="mb-[20px]">
              Purchase Value:
              <input
                className="ml-[5px] rounded-[10.052px] border-[rgba(0,_0,_0,_0.5)] border-solid border w-[150px]"
                type="number"
                name="Pack-size"
              />
            </div>
            <div className="mb-[20px]">
              MRP. :
              <input
                className="ml-[5px] rounded-[10.052px] border-[rgba(0,_0,_0,_0.5)] border-solid border w-[150px]"
                type="number"
                name="MRP."
              />
            </div>
            <div className="mb-[20px]">
              Tax:
              <input
                className="ml-[5px] rounded-[10.052px] border-[rgba(0,_0,_0,_0.5)] border-solid border w-[90px]"
                type="number"
                name="Tax"
              />
            </div>
            <div className="mb-[20px]">
              Amount:
              <input
                className="ml-[5px] rounded-[10.052px] border-[rgba(0,_0,_0,_0.5)] border-solid border w-[170px] "
                type="number"
                placeholder="0.00"
                name="amount"
              />
            </div>
            <div className="mb-[20px] mr-[100px]" align="right">
              <input
                className="  rounded-[30.859px] bg-green-300 w-[190px] text-[50px]  active:border-white duration-300 active:text-white"
                type="submit"
                value="Submit"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default InventAdd;
