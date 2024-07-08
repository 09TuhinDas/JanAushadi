import React, { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";
import { useParams } from "react-router-dom";

axios.defaults.baseURL = "http://localhost:8080/";

function EditInvent() {
  const { id } = useParams();

  const [EditformData, setFormDataEdit] = useState({
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

  const [dataList, setDataList] = useState({});

  const handleonChange = (e) => {
    const { value, name } = e.target;
    setFormDataEdit((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const getFetchData = async () => {
    try {
      const response = await axios.get(`/getUser/${id}`);
      console.log(response.data);
      if (response.data.success) {
        setDataList(response.data.data);
        setFormDataEdit(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
      // Handle error appropriately
    }
  };

  useEffect(() => {
    getFetchData();
  }, [id]);

  const updateForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/update/${id}`, EditformData);
      console.log(response.data);
      if (response.data.success) {
        getFetchData();
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Failed to update data:", error);
      // Handle error appropriately
    }
  };

  return (
    <div className="EditInvent">
      <div className="mt-[80px] ml-[9px] flex flex-col grow shrink-0 bg-stone-300 py-1 px-2 text-[27px] font-bold  border-t-2 border-b border-black border-solid basis-0 border-x-2 w-auto h-[55px] text-center">
        Edit Items
      </div>
      <div className="Add Items">
        <div className=" ml-[9px] shrink-0 bg-white  h-auto w-auto">
          <form
            className="mt-[20px] ml-[9px] text-[30px]"
            action=""
            onSubmit={updateForm}
          >
            <div className="mb-[7px]">
              <label htmlFor="DrugCode">Drug Code: </label>
              <input
                className="ml-[5px] mb-[10px] rounded-[10.052px] border-[rgba(0,_0,_0,_0.5)] border-solid border w-[120px] "
                type="text"
                id="DrugCode"
                name="DrugCode"
                value={EditformData.DrugCode}
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
                value={EditformData.ProductName}
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
                value={EditformData.BatchNo}
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
                value={EditformData.Quantity}
                onChange={handleonChange}
              />
            </div>
            <div className="mb-[20px]">
              <label htmlFor="Discount">HSN Code: </label>
              <input
                className="ml-[5px] rounded-[10.052px] border-[rgba(0,_0,_0,_0.5)] border-solid border w-[90px]"
                type="number"
                id="Discount"
                placeholder="0.00"
                name="Discount"
                value={EditformData.Discount}
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
                value={EditformData.MfgDate}
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
                value={EditformData.Expire}
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
                value={EditformData.Pack}
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
                value={EditformData.MRP}
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
                value={EditformData.Tax}
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
                value={EditformData.amount}
                onChange={handleonChange}
              />
            </div>
            <div className="mb-[20px] mr-[100px]" align="right">
              <button className="  rounded-[30.859px] bg-green-300 w-[190px] text-[50px]  active:border-white duration-300 active:text-white">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditInvent;
