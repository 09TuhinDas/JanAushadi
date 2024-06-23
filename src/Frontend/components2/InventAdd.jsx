import React, { useState } from "react";
import "../App.css";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080/";

function InventAdd() {
  const [formData, setFormData] = useState({
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
  });

  const handleonChange = (e) => {
    const { value, name } = e.target;

    // Convert only if the input field is meant to hold numeric values
    const numValue = ["Quantity", "Pack"].includes(name)
      ? Number(value)
      : value;
    const currentPack = Number(formData.Pack);
    const currentQuantity = Number(formData.Quantity);

    if (name === "Pack" && numValue > currentQuantity) {
      // Optionally, set an error state here to notify the user
      alert("Pack size cannot be greater than Quantity");
      return; // Prevent the update
    } else if (name === "Quantity" && currentPack > numValue) {
      // Optionally, set an error state here to notify the user
      alert("Quantity cannot be less than Pack size");
      return; // Prevent the update
    }
    setFormData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const data = await axios.post("/create", formData);
    console.log(data);
    if (data.data.success) {
      alert(data.data.message);
      window.location.reload();
    }
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
                type="text"
                id="DrugCode"
                name="DrugCode"
                onChange={handleonChange}
              />
            </div>
            <div className="mb-[7px]">
              <label htmlFor="ProductName">Product Name: </label>
              <input
                className="ml-[5px] mb-[10px] rounded-[10.052px] border-[rgba(0,_0,_0,_0.5)] border-solid border w-[290px] "
                type="text"
                id="ProductName"
                name="ProductName"
                onChange={handleonChange}
              />
            </div>
            <div className="mb-[20px]">
              <label htmlFor="Batchno">Batch No.: </label>
              <input
                className="ml-[5px] rounded-[10.052px] border-[rgba(0,_0,_0,_0.5)] border-solid border w-[140px] "
                type="Number"
                id="BatchNo"
                name="BatchNo"
                onChange={handleonChange}
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
                onChange={handleonChange}
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
                onChange={handleonChange}
              />
            </div>

            <div className="mb-[20px]">
              <label htmlFor="MfgDate">Mfg. Date: </label>
              <input
                className="ml-[5px] rounded-[10.052px] border-[rgba(0,_0,_0,_0.5)] border-solid border w-[220px]"
                type="date"
                id="MfgDate"
                name="MfgDate"
                onChange={handleonChange}
              />
            </div>
            <div className="mb-[20px]">
              <label htmlFor="Expire">Expiry Date: </label>
              <input
                className="ml-[5px] rounded-[10.052px] border-[rgba(0,_0,_0,_0.5)] border-solid border w-[220px]"
                type="Date"
                id="Expire"
                name="Expire"
                onChange={handleonChange}
              />
            </div>
            <div className="mb-[20px]">
              <label htmlFor="Pack-size">Pack size: </label>
              <input
                className="ml-[5px] rounded-[10.052px] border-[rgba(0,_0,_0,_0.5)] border-solid border w-[150px]"
                type="number"
                id="Pack"
                name="Pack"
                onChange={handleonChange}
              />
            </div>
            <div className="mb-[20px]">
              <label htmlFor="MRP.">MRP.: </label>
              <input
                className="ml-[5px] rounded-[10.052px] border-[rgba(0,_0,_0,_0.5)] border-solid border w-[150px]"
                type="Number"
                id="MRP"
                name="MRP"
                onChange={handleonChange}
              />
            </div>
            <div className="mb-[20px]">
              <label htmlFor="Tax">Tax: </label>
              <input
                className="ml-[5px] rounded-[10.052px] border-[rgba(0,_0,_0,_0.5)] border-solid border w-[90px]"
                type="Number"
                id="Tax"
                name="Tax"
                onChange={handleonChange}
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
                onChange={handleonChange}
              />
            </div>
            <div className="mb-[20px] mr-[100px]" align="right">
              <button className="  rounded-[30.859px] bg-green-300 w-[190px] text-[50px]  active:border-white duration-300 active:text-white">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default InventAdd;
