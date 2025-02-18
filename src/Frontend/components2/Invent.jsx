import { React, useEffect, useState } from "react";
import "../App.css";
import { getBackendUrl } from "./api";
import axios from "./api";
import { Link } from "react-router-dom";

function Invent() {
  const [dataList, setDataList] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null); // Track selected file
  const [uploadMessage, setUploadMessage] = useState(""); // Track upload status

  console.log(dataList);

  const getFetchData = async () => {
    const backendUrl = await getBackendUrl(); // ✅ Ensure backend URL is awaited
    const response = await axios.get(`${backendUrl}/`); // ✅ Use dynamic backend URL
    console.log(response); // Check if you get a proper response
    if (response.data.success) {
      setDataList(response.data.data); // Ensure data.data.data contains the list of inventory items
    }
  };

  useEffect(() => {
    getFetchData();
  }, []);

  const handleDelete = async (id) => {
    const backendUrl = await getBackendUrl();
    const response = await axios.delete(`${backendUrl}/delete/${id}`);
    if (response.data.success) {
      getFetchData();
      alert(response.data.message);
    }
  };

  const handleUpload = async (file) => {
    // Accept file as parameter
    if (!file) {
      setUploadMessage("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const backendUrl = await getBackendUrl();
      setUploadMessage("Uploading...");
      const response = await axios.post(`${backendUrl}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUploadMessage("File uploaded successfully!");
      getFetchData();
    } catch (error) {
      console.error("Upload failed:", error);
      setUploadMessage(error.response?.data?.message || "Upload failed");
    }
  };
  return (
    <div className="Invent">
      <div className="">
        <button
          onClick={() => (window.location.href = "/InventAdd")}
          className="mt-[100px] ml-[50px] shadow-sm rounded-[30.859px] justify-center px-8 py-4 border border-black border-solid bg-zinc-300 hover:bg-green-500 bg-opacity-90 max-md:px-5 active:border-white duration-300 active:text-white"
        >
          <li className="list-none text-[25px]">Add Items</li>
        </button>

        <button className="mt-[100px] ml-[70px] mr-[190px] shadow-sm rounded-[30.859px]  px-8 py-4 justify-center border border-black border-solid bg-zinc-300 hover:bg-blue-700 bg-opacity-90 max-md:px-5 active:border-white duration-300 active:text-white">
          <li className="list-none text-[25px]">View Items</li>
        </button>

        <input
          onChange={(e) => {
            const file = e.target.files[0];
            setSelectedFile(file);
            handleUpload(file); // Trigger upload immediately after selection
          }}
          type="file"
          accept=".csv,.xlsx,.pdf"
          className="hidden"
          id="fileInput"
        />
        <button
          type="button"
          onClick={() => document.getElementById("fileInput").click()} // Open file dialog
          className="mt-[100px] ml-[20px] justify-center px-4 shadow-sm rounded-[30.859px] border border-black border-solid bg-zinc-300 hover:bg-red-600 bg-opacity-90 max-md:px-5 active:border-white duration-300 active:text-white"
        >
          <li className="list-none text-[25px]">Upload PDF</li>
        </button>
        {/* Status message (moved outside button) */}
        {uploadMessage && (
          <div className="mt-4 ml-[20px] text-red-600">{uploadMessage}</div>
        )}
      </div>
      <div className="overflow-x-auto overflow-y-auto mt-[70px] mb-[10px] w-6/8 ml-[20px] bg-[white] border-shadow: 1px 1px 8px rgba(0, 0, 0, 0.065) p-[30px]">
        <table
          className="border border-solid border-[black] w-full border-collapse"
          cellPadding={20}
          cellSpacing={0}
          border={1}
        >
          <thead>
            <tr>
              <th className="border border-solid border-[black] border-collapse bg-zinc-300 p-[10px]">
                S.No
              </th>
              <th className="border border-solid border-[black] border-collapse bg-zinc-300 p-[10px]">
                Drug Code
              </th>
              <th className="border border-solid border-[black] border-collapse bg-zinc-300 p-[15px]">
                Product Name
              </th>
              <th className="border border-solid border-[black] border-collapse bg-zinc-300 p-[10px]">
                Batch No.
              </th>
              <th className="border border-solid border-[black] border-collapse bg-zinc-300 p-[10px]">
                Stock Qty.
              </th>
              <th className="border border-solid border-[black] border-collapse bg-zinc-300 p-[10px]">
                Pack
              </th>
              <th className="border border-solid border-[black] border-collapse bg-zinc-300 p-[10px]">
                MRP.
              </th>
              <th className="border border-solid border-[black] border-collapse bg-zinc-300 p-[10px]">
                Tax
              </th>
              <th className="border border-solid border-[black] border-collapse bg-zinc-300 p-[10px]">
                Invoice No
              </th>
              <th className="border border-solid border-[black] border-collapse bg-zinc-300 p-[10px]">
                Mfg. Date
              </th>
              <th className="border border-solid border-[black] border-collapse bg-zinc-300 p-[10px]">
                Expiry
              </th>
              <th className="border border-solid border-[black] border-collapse bg-zinc-300 p-[10px]">
                Amount
              </th>
              <th className="border border-solid border-[black] border-collapse bg-zinc-300 p-[17px]">
                Delete
              </th>
              <th className="border border-solid border-[black] border-collapse bg-zinc-300 p-[17px]">
                Edit
              </th>
            </tr>
          </thead>
          <tbody className="p-[10px] text-center">
            {dataList.map((drugItem, index) =>
              drugItem.batches.map((batch, batchIndex) => (
                <tr key={batch._id}>
                  {batchIndex === 0 && (
                    <>
                      <td
                        rowSpan={drugItem.batches.length}
                        className="border border-solid border-[black] border-collapse p-[10px]"
                      >
                        {index + 1}
                      </td>
                      <td
                        rowSpan={drugItem.batches.length}
                        className="border border-solid border-[black] border-collapse p-[10px]"
                      >
                        {drugItem.DrugCode}
                      </td>
                      <td
                        rowSpan={drugItem.batches.length}
                        className="border border-solid border-[black] border-collapse p-[10px]"
                      >
                        {drugItem.ProductName}
                      </td>
                    </>
                  )}
                  <td className="border border-solid border-[black] border-collapse p-[10px]">
                    {batch.BatchNo} {/* Displaying Batch Number */}
                  </td>
                  <td className="border border-solid border-[black] border-collapse p-[10px]">
                    {batch.Quantity}
                  </td>
                  <td className="border border-solid border-[black] border-collapse p-[10px]">
                    {batch.Pack}
                  </td>
                  <td className="border border-solid border-[black] border-collapse p-[10px]">
                    {batch.MRP}
                  </td>
                  <td className="border border-solid border-[black] border-collapse p-[10px]">
                    {batch.Tax}
                  </td>
                  <td className="border border-solid border-[black] border-collapse p-[10px]">
                    {batch.Discount}
                  </td>
                  <td className="border border-solid border-[black] border-collapse p-[10px]">
                    {batch.MfgDate}
                  </td>
                  <td className="border border-solid border-[black] border-collapse p-[10px]">
                    {batch.Expire}
                  </td>
                  <td className="border border-solid border-[black] border-collapse p-[10px]">
                    {batch.amount}
                  </td>
                  <td className="border border-solid border-[black] border-collapse p-[10px]">
                    <button
                      className="border-0 px-2.5 py-1.5 rounded-[5px] bg-[red] outline:none text-[white]"
                      onClick={() => handleDelete(drugItem._id)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                  <td className="border border-solid border-[black] border-collapse p-[10px]">
                    <Link
                      className="px-2.5 py-2.5 rounded-[5px] bg-[green] text-[white] my-0 mx-2.5"
                      to={`/EditInvent/${drugItem._id}`}
                    >
                      <i className="fa-solid fa-pen"></i>
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Invent;
