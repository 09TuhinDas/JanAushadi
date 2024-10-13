import React, { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

axios.defaults.baseURL = "http://localhost:8080/";

function EditInvent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedBatchNo, setSelectedBatchNo] = useState("Select");
  const [dataList2, setDataList2] = useState([]);
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

  useEffect(() => {
    getFetchData();
  }, [id]);

  useEffect(() => {
    getFetchDataAll();
  }, []);

  useEffect(() => {
    if (selectedBatchNo !== "Select") {
      const selectedDrug = dataList2.find(
        (drug) => drug.DrugCode === EditformData.DrugCode
      );

      if (selectedDrug) {
        const batch = selectedDrug.batches.find(
          (b) => b.BatchNo === selectedBatchNo
        );

        if (batch) {
          setFormDataEdit((prevData) => ({
            ...prevData,
            BatchNo: batch.BatchNo,
            Quantity: batch.Quantity,
            Discount: batch.Discount,
            MfgDate: batch.MfgDate,
            Expire: batch.Expire,
            Pack: batch.Pack,
            MRP: batch.MRP,
            Tax: batch.Tax,
            amount: batch.amount,
          }));
        }
      }
    }
  }, [selectedBatchNo, dataList2]);

  const getFetchDataAll = async () => {
    try {
      const response = await axios.get("/medicines");
      if (response.data.success) {
        setDataList2(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching all medicines:", error);
    }
  };

  const getFetchData = async () => {
    try {
      const response = await axios.get(`/medicines/${id}`);
      if (response.data.success) {
        const medicine = response.data.data;
        setFormDataEdit({
          DrugCode: medicine.DrugCode,
          ProductName: medicine.ProductName,
          BatchNo:
            medicine.batches.length > 0 ? medicine.batches[0].BatchNo : "",
          Quantity:
            medicine.batches.length > 0 ? medicine.batches[0].Quantity : "",
          Discount:
            medicine.batches.length > 0 ? medicine.batches[0].Discount : "",
          MfgDate:
            medicine.batches.length > 0 ? medicine.batches[0].MfgDate : "",
          Expire: medicine.batches.length > 0 ? medicine.batches[0].Expire : "",
          Pack: medicine.batches.length > 0 ? medicine.batches[0].Pack : "",
          MRP: medicine.batches.length > 0 ? medicine.batches[0].MRP : "",
          Tax: medicine.batches.length > 0 ? medicine.batches[0].Tax : "",
          amount: medicine.batches.length > 0 ? medicine.batches[0].amount : "",
        });
        setSelectedBatchNo(
          medicine.batches.length > 0 ? medicine.batches[0].BatchNo : "Select"
        );
      } else {
        console.error(
          "Error fetching specific medicine:",
          response.data.message
        );
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const handleSelect = (event) => {
    setSelectedBatchNo(event.target.value);
  };

  const handleonChange = (e) => {
    const { value, name } = e.target;
    setFormDataEdit((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const updateForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/medicines/update/${id}`, EditformData);
      if (response.data.success) {
        alert(response.data.message);
        navigate("/inventory");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Failed to update data:", error);
      alert("Failed to update data.");
    }
  };

  return (
    <div className="EditInvent">
      <div className="mt-[80px] ml-[9px] flex flex-col grow shrink-0 bg-stone-300 py-1 px-2 text-[27px] font-bold border-t-2 border-b border-black border-solid basis-0 border-x-2 w-auto h-[55px] text-center">
        Edit Items
      </div>
      <div className="Add Items">
        <div className="ml-[9px] shrink-0 bg-white h-auto w-auto">
          <form
            className="mt-[20px] ml-[9px] text-[30px]"
            onSubmit={updateForm}
          >
            <div className="mb-[7px]">
              <label htmlFor="DrugCode">Drug Code: </label>
              <input
                className="ml-[5px] mb-[10px] rounded-[10.052px] border-[rgba(0,_0,_0,_0.5)] border-solid border w-[120px]"
                type="text"
                id="DrugCode"
                name="DrugCode"
                value={EditformData.DrugCode}
                onChange={handleonChange}
                disabled
              />
            </div>

            <div className="mb-[7px]">
              <label htmlFor="ProductName">Product Name: </label>
              <input
                className="ml-[5px] mb-[10px] rounded-[10.052px] border-[rgba(0,_0,_0,_0.5)] border-solid border w-[290px]"
                type="text"
                id="ProductName"
                name="ProductName"
                value={EditformData.ProductName}
                onChange={handleonChange}
                disabled
              />
            </div>

            <div className="mb-[20px]">
              <label htmlFor="BatchNo">Batch No.: </label>
              <select
                className="form-select"
                onChange={handleSelect}
                value={selectedBatchNo}
              >
                <option value="Select">Select Batch</option>
                {dataList2
                  .flatMap((drugItem) => drugItem.batches)
                  .filter((batch) => batch.DrugCode === EditformData.DrugCode)
                  .map((batch, idx) => (
                    <option key={idx} value={batch.BatchNo}>
                      {batch.BatchNo}
                    </option>
                  ))}
              </select>
            </div>

            {/* Repeat similar structure for remaining fields */}
            <div className="mb-[20px]">
              <label htmlFor="Quantity">Quantity: </label>
              <input
                className="ml-[5px] rounded-[10.052px] border-[rgba(0,_0,_0,_0.5)] border-solid border w-[70px]"
                type="number"
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
                type="date"
                id="Expire"
                name="Expire"
                value={EditformData.Expire}
                onChange={handleonChange}
              />
            </div>

            <div className="mb-[20px]">
              <label htmlFor="Pack">Pack size: </label>
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
              <label htmlFor="MRP">MRP: </label>
              <input
                className="ml-[5px] rounded-[10.052px] border-[rgba(0,_0,_0,_0.5)] border-solid border w-[150px]"
                type="number"
                id="MRP"
                name="MRP"
                value={EditformData.MRP}
                onChange={handleonChange}
              />
            </div>

            <div className="mb-[20px]">
              <label htmlFor="Tax">Tax: </label>
              <input
                className="ml-[5px] rounded-[10.052px] border-[rgba(0,_0,_0,_0.5)] border-solid border w-[100px]"
                type="number"
                id="Tax"
                name="Tax"
                value={EditformData.Tax}
                onChange={handleonChange}
              />
            </div>

            <div className="mb-[20px]">
              <label htmlFor="amount">Amount: </label>
              <input
                className="ml-[5px] rounded-[10.052px] border-[rgba(0,_0,_0,_0.5)] border-solid border w-[150px]"
                type="number"
                id="amount"
                name="amount"
                value={EditformData.amount}
                onChange={handleonChange}
              />
            </div>

            <div className="mb-[20px] mr-[100px]" align="right">
              <button className="rounded-[30.859px] bg-green-300 w-[190px] text-[50px] active:border-white duration-300 active:text-white">
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
