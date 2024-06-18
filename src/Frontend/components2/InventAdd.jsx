import React, { useState } from "react";
import "../App.css";
import axios from "axios";

function InventAdd() {
  const users = {
    DrugCode: "",
    ProductName: "",
    BatchNo: "",
    Quantity: "",
    Discount: "",
    MfgDate: "",
    Expire: "",
    Pack: "",
    MRP: "",
    Tax: "",
    amount: "",
  };
  const [user, setUser] = useState(users);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:5173/api/create", user)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="InventAdd">
      <div className="mt-[80px] ml-[9px] flex flex-col grow shrink-0 bg-stone-300 py-1 px-2 text-[27px] font-bold  border-t-2 border-b border-black border-solid basis-0 border-x-2 w-auto h-[55px] text-center">
        Add Items
      </div>
      <div className="Add Items">
        <div className=" ml-[9px] shrink-0 bg-white  h-auto w-auto">
          <form
            className="mt-[20px] ml-[9px] text-[30px]"
            action=""
            onSubmit={submitForm}
          >
            <div className="mb-[7px]">
              <label htmlFor="DrugCode">Drug Code: </label>
              <input
                className="ml-[5px] mb-[10px] rounded-[10.052px] border-[rgba(0,_0,_0,_0.5)] border-solid border w-[120px] "
                type="number"
                id="DrugCode"
                name="DrugCode"
                onChange={inputHandler}
              />
            </div>
            <div className="mb-[7px]">
              <label htmlFor="ProductName">Product Name: </label>
              <input
                className="ml-[5px] mb-[10px] rounded-[10.052px] border-[rgba(0,_0,_0,_0.5)] border-solid border w-[290px] "
                type="text"
                id="ProductName"
                name="ProductName"
                onChange={inputHandler}
              />
            </div>
            <div className="mb-[20px]">
              <label htmlFor="Batchno">Batch No.: </label>
              <input
                className="ml-[5px] rounded-[10.052px] border-[rgba(0,_0,_0,_0.5)] border-solid border w-[140px] "
                type="Number"
                id="Batchno"
                name="Batchno"
                onChange={inputHandler}
              />
            </div>
            <div className="mb-[20px]">
              <label htmlFor="Quantity">Quantity: </label>
              <input
                className="ml-[5px] rounded-[10.052px] border-[rgba(0,_0,_0,_0.5)] border-solid border w-[70px]"
                type="Number"
                id="Quantity"
                placeholder="0"
                name="Quantity"
                onChange={inputHandler}
              />
            </div>
            <div className="mb-[20px]">
              <label htmlFor="Discount">Discount: </label>
              <input
                className="ml-[5px] rounded-[10.052px] border-[rgba(0,_0,_0,_0.5)] border-solid border w-[90px]"
                type="number"
                id="Discount"
                placeholder="0.00"
                name="Discount"
                onChange={inputHandler}
              />
            </div>

            <div className="mb-[20px]">
              <label htmlFor="MfgDate">Mfg. Date: </label>
              <input
                className="ml-[5px] rounded-[10.052px] border-[rgba(0,_0,_0,_0.5)] border-solid border w-[220px]"
                type="date"
                id="MfgDate"
                name="MfgDate"
                onChange={inputHandler}
              />
            </div>
            <div className="mb-[20px]">
              <label htmlFor="Expire">Expiry Date: </label>
              <input
                className="ml-[5px] rounded-[10.052px] border-[rgba(0,_0,_0,_0.5)] border-solid border w-[220px]"
                type="Date"
                id="Expire"
                name="Expire"
                onChange={inputHandler}
              />
            </div>
            <div className="mb-[20px]">
              <label htmlFor="Pack-size">Pack size: </label>
              <input
                className="ml-[5px] rounded-[10.052px] border-[rgba(0,_0,_0,_0.5)] border-solid border w-[150px]"
                type="number"
                id="Pack"
                name="Pack"
                onChange={inputHandler}
              />
            </div>
            <div className="mb-[20px]">
              <label htmlFor="MRP.">MRP.: </label>
              <input
                className="ml-[5px] rounded-[10.052px] border-[rgba(0,_0,_0,_0.5)] border-solid border w-[150px]"
                type="Number"
                id="MRP"
                name="MRP"
                onChange={inputHandler}
              />
            </div>
            <div className="mb-[20px]">
              <label htmlFor="Tax">Tax: </label>
              <input
                className="ml-[5px] rounded-[10.052px] border-[rgba(0,_0,_0,_0.5)] border-solid border w-[90px]"
                type="Number"
                id="Tax"
                name="Tax"
                onChange={inputHandler}
              />
            </div>
            <div className="mb-[20px]">
              <label htmlFor="amount">Amount: </label>
              <input
                className="ml-[5px] rounded-[10.052px] border-[rgba(0,_0,_0,_0.5)] border-solid border w-[170px] "
                type="Number"
                id="amount"
                placeholder="0.00"
                name="amount"
                onChange={inputHandler}
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
