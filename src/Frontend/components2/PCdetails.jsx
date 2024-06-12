import react, { useEffect } from "react";
import "../App.css";
import { useTable } from "react-table";

function PCdetails() {
  return (
    <div class="Product-invoice">
      <div className="flex mt-[75px]">
        <div className=" ml-[9px] flex flex-col grow shrink-0 justify-center items-start py-1 px-2 text-[27px] font-bold bg-white border-t-2 border-b border-black border-solid basis-0 border-x-2 w-auto h-[55px]">
          <div className=" justify-center py-1.5 bg-white">Product Search</div>
        </div>
        <div className=" ml-[9px] mr-[9px] flex flex-col grow shrink-0 justify-center items-start self-start px-4 py-1 text-[17px] text-center whitespace-nowrap border-2 border-black border-solid basis-0 bg-stone-300 w-auto  ">
          <div className="justify-center px-2.5 py-2 bg-white border border-black border-solid">
            Invoice/Order
          </div>
        </div>
      </div>
      <div className="flex">
        <div class="details&invoice">
          <div className="mt-[9px] ml-[9px] shrink-0 bg-white border-t border-b border-black border-solid border-x-2 h-[350px] w-[390px]">
            <form className="mt-[20px] ml-[9px] text-[23px]" action="">
              <div className="mb-[7px]">
                Drug code/Product name:
                <input
                  className="ml-[5px] rounded-[10.052px] border-[rgba(0,_0,_0,_0.5)] border-solid border w-[290px] "
                  type="text"
                  name="Product-Name"
                />
              </div>
              <div className="mb-[5px]">
                Batch:
                <input
                  className="ml-[5px] rounded-[10.052px] border-[rgba(0,_0,_0,_0.5)] border-solid border w-[140px] "
                  type="text"
                  name="Batch-no"
                />
              </div>
              <div className="mb-[5px]">
                Qty.:
                <input
                  className="ml-[5px] rounded-[10.052px] border-[rgba(0,_0,_0,_0.5)] border-solid border w-[70px]"
                  type="Decimal"
                  placeholder="0"
                  name="Quantity"
                />
              </div>
              <div className="mb-[5px]">
                Disc.:
                <input
                  className="ml-[5px] rounded-[10.052px] border-[rgba(0,_0,_0,_0.5)] border-solid border w-[90px]"
                  type="Decimal"
                  placeholder="0.00"
                  name="Discount"
                />
              </div>
              <div className="mb-[5px]">
                Pack size:
                <input
                  className="ml-[5px] rounded-[10.052px] border-[rgba(0,_0,_0,_0.5)] border-solid border w-[90px]"
                  type="number"
                  name="Pack-size"
                />
              </div>
              <div className="mb-[5px]">
                Amount:
                <input
                  className="ml-[5px] rounded-[10.052px] border-[rgba(0,_0,_0,_0.5)] border-solid border w-[100px] "
                  type="number"
                  placeholder="0.00"
                  name="Amount"
                />
                <input
                  className="ml-[270px] rounded-[30.859px] bg-green-300 w-[90px] text-[20px]  active:border-white duration-300 active:text-white"
                  type="submit"
                  value="Submit"
                />
              </div>
            </form>
          </div>
          <div className="ml-[9px] justify-center px-5 py-2 bg-white text-[20px] border-t border-b border-black border-solid border-x-2 w-[390px]">
            Customer Details
          </div>
          <div className="ml-[9px] mb-[9px] shrink-0 bg-white border-t border-b-2 border-black border-solid border-x-2 h-[450px] w-[390px]">
            <form className="mt-[20px] ml-[9px] text-[25px]" action="">
              <div className="mb-[15px]">
                Invoice No. :
                <input
                  className="ml-[15px] rounded-[10.052px] border-[rgba(0,_0,_0,_0.5)] border-solid border w-[160px]"
                  type="number"
                  name="Invoice-No"
                />
              </div>
              <div className="mb-[15px]">
                Pat.Mob.No. :
                <input
                  className="ml-[5px] rounded-[10.052px] border-[rgba(0,_0,_0,_0.5)] border-solid border w-[190px] "
                  placeholder="Phone Number"
                  type="number"
                  name="mobile-number"
                />
              </div>
              <div className="mb-[15px]">
                Email :
                <input
                  className="ml-[5px] rounded-[10.052px] border-[rgba(0,_0,_0,_0.5)] border-solid border w-[290px]"
                  type="email"
                  placeholder="Email"
                  name="Email-Address"
                />
              </div>
              <div className="mb-[15px]">
                Patient Name :
                <input
                  className="ml-[5px] rounded-[10.052px] border-[rgba(0,_0,_0,_0.5)] border-solid border w-[180px] "
                  type="text"
                  placeholder="Name"
                  name="Patient-Name"
                />
              </div>
              <div className="mb-[15px]">
                Doctors Name :
                <input
                  className="ml-[5px] rounded-[10.052px] border-[rgba(0,_0,_0,_0.5)] border-solid border w-[180px]"
                  type="text"
                  name="Doc.-Name"
                />
              </div>
              <div className="mb-[15px]">
                Remark:{" "}
                <textarea
                  className="rounded-[10.052px] border-[rgba(0,_0,_0,_0.5)] border-solid border"
                  name="Remark"
                  cols="25"
                  rows="2"
                ></textarea>
              </div>
            </form>
          </div>
        </div>
        <div className="overflow-x-auto">
          <div className="mt-[9px] ml-[9px] w-auto mr-[9px] h-auto">
            <table>
              <thead className="flex">
                <tr>
                  <th className="ml-[9px] gap-0 px-1 text-[21px] font-bold text-center text-black  bg-zinc-300 border-x-2   bg-white border-t border-b border-black  text-center">
                    S.No
                  </th>
                  <th className="ml-[9px] gap-0 px-7 text-[21px] font-bold text-center text-black  bg-zinc-300 border-x-2   bg-white border-t border-b border-black  text-center">
                    Drug code
                  </th>
                  <th className=" gap-0 px-12 text-[21px] font-bold text-center text-black  bg-zinc-300 border-x-2  bg-white border-t border-b border-black  text-center">
                    Product Name
                  </th>
                  <th className="gap-0 px-7 py-7 text-[21px] font-bold text-center text-black  bg-zinc-300 border-x-2   bg-white border-t border-b border-black  text-center">
                    Batch
                  </th>
                  <th className="gap-0 px-3 py-7 text-[21px] font-bold text-center text-black  bg-zinc-300 border-x-2   bg-white border-t border-b border-black  text-center">
                    Qty.
                  </th>
                  <th className="gap-0 px-3 py-7 text-[21px] font-bold text-center text-black  bg-zinc-300 border-x-2   bg-white border-t border-b border-black ] text-center">
                    Pack
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
              <tbody>
                <tr>
                  <td></td>
                </tr>
              </tbody>
            </table>
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
