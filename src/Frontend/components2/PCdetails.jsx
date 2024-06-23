import React from "react";
import "../App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function PCdetails() {
  const [drugCode, setDrugCode] = useState("");
  const [quantity, setQuantity] = useState("");
  const [drugInfo, setDrugInfo] = useState(null);
  const [amount, setAmount] = useState(0);
  const [discount, setDiscount] = useState(0);

  const handleFetchDrugInfo = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      try {
        const response = await axios.get(
          `http://localhost:8080/drug/${drugCode}`
        );
        setDrugInfo(response.data);
        setAmount(0); // Reset amount on new drug fetch
      } catch (error) {
        console.error("Error fetching drug:", error);
        setDrugInfo(null);
        setAmount(0); // Reset amount if fetch fails
      }
    }
  };

  useEffect(() => {
    if (drugInfo && quantity) {
      const quantityPerPack = Math.floor(drugInfo.Quantity / drugInfo.Pack);
      const unitPrice = drugInfo.MRP / quantityPerPack;
      let calculatedAmount = unitPrice * quantity;

      if (discount) {
        calculatedAmount -= (calculatedAmount * discount) / 100;
      }

      setAmount(calculatedAmount);
    } else {
      setAmount(0); // Set amount to 0 when quantity is empty
    }
  }, [quantity, drugInfo, discount]);

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
    handleCalculateAmount();
  };

  const handleDiscountChange = (e) => {
    setDiscount(e.target.value);
  };

  const handleSubmit = async () => {
    if (drugInfo) {
      try {
        const response = await axios.put(
          `http://localhost:8080/drug/${drugCode}`,
          {
            quantity: Number(quantity),
          }
        );
        alert("Quantity and pack size updated successfully");
        setDrugInfo(response.data); // Update the drugInfo with the latest data from the server
      } catch (error) {
        console.error("Error updating drug:", error);
        alert("Failed to update quantity and pack size");
      }
    }
  };

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
          <div className="mt-[9px] ml-[9px] shrink-0 bg-white border-t border-b border-black border-solid border-x-2 h-[355px] w-[390px]">
            <form
              className="mt-[20px] ml-[9px] text-[23px]"
              onSubmit={handleSubmit}
            >
              <div className="mb-[7px]">
                <label htmlFor="DrugCode">Drug Code: </label>
                <input
                  className="ml-[5px] rounded-[10.052px] border-[rgba(0,_0,_0,_0.5)] border-solid border w-[130px] "
                  type="text"
                  name="DrugCode"
                  value={drugCode}
                  onChange={(e) => setDrugCode(e.target.value)}
                  onKeyDown={handleFetchDrugInfo}
                />
              </div>
              <div className="mb-[7px]">
                <label htmlFor="ProductName">Product Name:</label>
                <input
                  className="ml-[5px] rounded-[10.052px] border-[rgba(0,_0,_0,_0.5)] border-solid border w-[220px] "
                  type="text"
                  id="ProductName"
                  name="ProductName"
                  value={drugInfo ? drugInfo.ProductName : ""}
                  readOnly
                />
              </div>
              <div className="mb-[5px]">
                <label htmlFor="BatchNo">Batch : </label>
                <input
                  className="ml-[5px] rounded-[10.052px] border-[rgba(0,_0,_0,_0.5)] border-solid border w-[140px] "
                  type="text"
                  id="BatchNo"
                  name="BatchNo"
                  value={drugInfo ? drugInfo.BatchNo : ""}
                  readOnly
                />
              </div>
              <div className="mb-[5px]">
                Qty.:
                <input
                  className="ml-[5px] rounded-[10.052px] border-[rgba(0,_0,_0,_0.5)] border-solid border w-[100px]"
                  type="number"
                  placeholder="0"
                  name="Quantity"
                  value={quantity}
                  onChange={handleQuantityChange}
                />
              </div>
              <div className="mb-[5px]">
                Disc.:
                <input
                  className="ml-[5px] rounded-[10.052px] border-[rgba(0,_0,_0,_0.5)] border-solid border w-[100px]"
                  type="Decimal"
                  placeholder="0.00"
                  name="Discount"
                  value={discount}
                  onChange={handleDiscountChange}
                />
              </div>
              <div className="mb-[5px]">
                Pack size:
                <input
                  className="ml-[5px] rounded-[10.052px] border-[rgba(0,_0,_0,_0.5)] border-solid border w-[100px]"
                  type="number"
                  name="Pack-size"
                  value={quantity ? (drugInfo ? drugInfo.Pack : "") : 0}
                  readOnly
                />
              </div>
              <div className="mb-[5px]">
                Amount:
                <input
                  className="ml-[5px] rounded-[10.052px] border-[rgba(0,_0,_0,_0.5)] border-solid border w-[130px] "
                  type="number"
                  placeholder="0.00"
                  name="Amount"
                  value={amount.toFixed(2)}
                  readOnly
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
              <tbody></tbody>
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
