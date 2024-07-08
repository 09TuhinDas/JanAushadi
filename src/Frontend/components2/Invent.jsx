import { React, useEffect, useState } from "react";
import "../App.css";
import axios from "axios";

import { Link } from "react-router-dom";

axios.defaults.baseURL = "http://localhost:8080/";

function Invent() {
  const [dataList, setDataList] = useState([]);

  const getFetchData = async () => {
    const data = await axios.get("/");
    console.log(data);
    if (data.data.success) {
      setDataList(data.data.data);
    }
  };
  useEffect(() => {
    getFetchData();
  }, []);

  const handleDelete = async (id) => {
    const data = await axios.delete("/delete/" + id);
    if (data.data.success) {
      getFetchData();
      alert(data.data.message);
    }
  };

  console.log(dataList);

  const [files, setFile] = useState(null);

  function handleUpload() {
    if (!files) {
      console.log("No File Selected");
      return;
    }

    const fd = new FormData();
    for (let i = 0; i < files.length; i++) {
      fd.append("file${i+1}", files[i]);
    }
  }
  return (
    <div className="Invent">
      <div className="">
        <button
          onClick={() => (window.location.href = "/InventAdd")}
          className="mt-[100px] ml-[50px] shadow-sm rounded-[30.859px] justify-center px-8 py-4 border border-black border-solid bg-zinc-300 hover:bg-green-500 bg-opacity-90 max-md:px-5 active:border-white duration-300 active:text-white"
        >
          <li className="list-none text-[25px]">Add Items</li>
        </button>

        <button className="mt-[100px] ml-[70px] mr-[190px] shadow-sm rounded-[30.859px]  px-8 py-4 justify-center   border border-black border-solid bg-zinc-300 hover:bg-blue-700 bg-opacity-90 max-md:px-5 active:border-white duration-300 active:text-white">
          <li className="list-none text-[25px]" href="/">
            View Items
          </li>
        </button>
        <input
          onChange={(e) => {
            e.target.files[0];
          }}
          type="file"
          multiple
        />
        <button
          onClick={handleUpload}
          className="mt-[100px] ml-[20px] justify-center px-4 shadow-sm rounded-[30.859px] border border-black border-solid bg-zinc-300 hover:bg-red-600 bg-opacity-90 max-md:px-5 active:border-white duration-300 active:text-white"
        >
          <li className="list-none text-[25px]" href="/">
            Upload PDF
          </li>
        </button>
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
                Drug code
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
                Hsn Code
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
            {dataList.map((e, index) => {
              return (
                <tr key={e.id}>
                  <td className="border border-solid border-[black] border-collapse p-[10px]">
                    {index + 1}
                  </td>
                  <td className="border border-solid border-[black] border-collapse p-[10px]">
                    {e.DrugCode}
                  </td>
                  <td className="border border-solid border-[black] border-collapse p-[10px]">
                    {e.ProductName}
                  </td>
                  <td className="border border-solid border-[black] border-collapse p-[10px]">
                    {e.BatchNo}
                  </td>
                  <td className="border border-solid border-[black] border-collapse p-[10px]">
                    {e.Quantity}
                  </td>
                  <td className="border border-solid border-[black] border-collapse p-[10px]">
                    {e.Pack}
                  </td>
                  <td className="border border-solid border-[black] border-collapse p-[10px]">
                    {e.MRP}
                  </td>
                  <td className="border border-solid border-[black] border-collapse p-[10px]">
                    {e.Tax}
                  </td>
                  <td className="border border-solid border-[black] border-collapse p-[10px]">
                    {e.Discount}
                  </td>
                  <td className="border border-solid border-[black] border-collapse p-[10px]">
                    {e.MfgDate}
                  </td>
                  <td className="border border-solid border-[black] border-collapse p-[10px]">
                    {e.Expire}
                  </td>
                  <td className="border border-solid border-[black] border-collapse  p-[10px]">
                    {e.amount}
                  </td>
                  <td className="border border-solid border-[black] border-collapse  p-[10px]">
                    <button
                      className="border-0 px-2.5 py-1.5 p rounded-[5px] bg-[red] outline:none text-[white]"
                      onClick={() => handleDelete(e._id)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                  <td className="border border-solid border-[black] border-collapse  p-[10px]">
                    <Link
                      className=" px-2.5 py-2.5 rounded-[5px] bg-[green] text-[white] my-0 mx-2.5"
                      to={`/EditInvent/${e._id}`}
                    >
                      <i className="fa-solid fa-pen"></i>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Invent;
