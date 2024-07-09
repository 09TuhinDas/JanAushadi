import React from "react";
import "../App.css";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import ReactToPrint from "react-to-print";

function Invoice() {
  const [currentDate, setCurrentDate] = useState("");
  const [latestInvoice, setLatestInvoice] = useState(null);
  const [netAmount, setNetAmount] = useState(0);
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const componentRef = useRef();

  useEffect(() => {
    const fetchLatestInvoice = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/latest-invoice"
        );
        setLatestInvoice(response.data.invoiceNumber);
      } catch (error) {
        console.error("Error fetching latest invoice:", error);
      }
    };
    fetchLatestInvoice();
  }, []);

  useEffect(() => {
    if (latestInvoice) {
      const fetchInvoiceDetails = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8080/invoice/${latestInvoice}`
          );
          const invoiceData = response.data.data;
          const billedItems = invoiceData.billedItems;
          const netAmount = invoiceData.netAmount;
          const invoiceNumber = invoiceData.invoiceNumber;
          setTableData(billedItems);
          setNetAmount(netAmount);
          setInvoiceNumber(invoiceNumber);
        } catch (error) {
          console.error("Error fetching invoice details:", error);
        }
      };
      fetchInvoiceDetails();
    }
  }, [latestInvoice]);

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    // Get the current date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0];
    setCurrentDate(today);
  }, []);

  return (
    <div
      className="invoice"
      ref={componentRef}
      style={{
        width: "209mm",
        height: "297mm",
        margin: "0 auto",
        padding: "20mm",
        fontSize: "12pt",
      }}
    >
      <div className="mt-[90px]">
        <div className=" bg-white border-t-2 border-b-2 border-black border-solid border-x-2 max-w-[595px] min-h-[146px] ">
          <div className="flex flex-row">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:w-full">
              <div className="flex items-center">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/7d8f359ab37350a959a0a0dcb5ce9b5df3c45a13cbcbb00ac48fa9e78afed027?apiKey=150ca4726f0b413090f132e093d2a392&width=100"
                  className="shrink-0 w-[40px] ml-[10px] -mt-[60px] h-auto "
                  alt="Logo"
                />
                <div className="flex">
                  <div className="flex flex-col items-center ml-40">
                    <div className="text-[10px] text-center font-extrabold">
                      Jan Aushadhi Kendra
                    </div>
                    <div className="self-stretch text-[7px] font-light">
                      Ground Floor, 55A Shyambazar Street Kolkata -700004
                      <br />
                      GST No. : 19BSFPB9635LIZA , DL
                      <br />
                      No:WBKOLBIOR704855,WBKOLNBOR704855, Contact
                      <br />
                      No:9432784808,9903464035,990346035, Email ID:
                      <br />
                      janaushadhikendrashyambazar@gmail.com
                    </div>
                    <div className="mt-3 text-[10px] text-center font-semibold">
                      GST Invoice
                    </div>
                  </div>
                </div>
                <div className="flex flex-col ml-40">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/db2494aa43897811dd37f15df734a644a219c47f7feb8c06e0c24bfcc13748bc?apiKey=150ca4726f0b413090f132e093d2a392&width=100"
                    className="self-center w-[40px] -mt-[50px] h-auto"
                    alt="Original Mark"
                  />
                  <div className="mt-3 text-[9px] ml-3">ORIGINAL</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="patient details">
          <div className="mt-1  text-[9px] font-semibold text-center text-black">
            <div className="mb-[7px]">
              Patient Name :
              <input
                className="ml-[5px] rounded-[10.052px] border-[rgba(0,_0,_0,_0.5)] border-solid border w-[90px] "
                type="text"
                placeholder="Name"
                name="Patient-Name"
              />
            </div>
            <div className="mb-[7px]">
              Patient Mob. :
              <input
                className="ml-[5px] rounded-[10.052px] border-[rgba(0,_0,_0,_0.5)] border-solid border w-[90px] "
                placeholder="Phone Number"
                type="number"
                name="mobile-number"
              />
            </div>
            <div className="mb-[7px]">
              Doctor Name :
              <input
                className="ml-[5px] rounded-[10.052px] border-[rgba(0,_0,_0,_0.5)] border-solid border w-[90px]"
                type="text"
                placeholder="Doc. Name"
                name="Doc.-Name"
              />
            </div>
          </div>
        </div>
        <div className="invoice-details">
          <div className=" ml-[310px]  flex-col">
            <div className=" items-center space-x-4 text-[9px] font-semibold text-black">
              <div className="ml-[15px] mb-[7px]">
                <span>Invoice No. :</span> {invoiceNumber}
              </div>
              <div className="mb-[7px]">
                <span>Date :</span>
                <input
                  type="date"
                  id="appointmentDate"
                  className="ml-1 p-1  rounded"
                  value={currentDate}
                  onChange={(e) => setCurrentDate(e.target.value)}
                />
              </div>
              <div>
                <span>Gst No :</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <table
        className="border border-solid border-[black]  border-collapse max-w-[575px]"
        cellPadding={1}
        cellSpacing={0}
        border={1}
      >
        <thead>
          <tr>
            <th className="ml-[9px] gap-0 px-1 text-sm font-bold text-center text-black  border-x-2   bg-white border-t border-b border-black  text-center">
              S.No
            </th>
            <th className="ml-[9px] gap-0 px-14 text-sm font-bold text-center text-black  border-x-2   bg-white border-t border-b border-black  text-center">
              Product Name
            </th>
            <th className=" gap-0 px-5 text-sm font-bold text-center text-black border-x-2  bg-white border-t border-b border-black  text-center">
              HSN <br />
              Code
            </th>
            <th className="gap-0 px-4 py-4 text-sm font-bold text-center text-black  border-x-2   bg-white border-t border-b border-black  text-center">
              Batch
            </th>
            <th className="gap-0 px-3 py-4 text-sm font-bold text-center text-black  border-x-2   bg-white border-t border-b border-black  text-center">
              Qty.
            </th>

            <th className="gap-0 px-3 py-4 text-sm font-bold text-center text-black  border-x-2   bg-white border-t border-b border-black  text-center">
              MRP.
            </th>
            <th className="gap-0 px-1 text-sm font-bold text-center text-black  border-x-2   bg-white border-t border-b border-black  text-center">
              Disc%
            </th>
            <th className="gap-0 px-4 text-sm font-bold text-center text-black   border-x-2   bg-white border-t border-b border-black  text-center">
              Amount <br />
              (Rs .)
            </th>
          </tr>
        </thead>
        <tbody className="p-[7px] text-center text-sm">
          {tableData.map((item, index) => (
            <tr key={index}>
              <td className="border border-solid border-[black] border-collapse p-[7px]">
                {index + 1}
              </td>
              <td className="border border-solid border-[black] border-collapse p-[7px]">
                {item.ProductName}
              </td>
              <td className="border border-solid border-[black] border-collapse p-[7px]">
                {item.hsnCode}
              </td>
              <td className="border border-solid border-[black] border-collapse p-[7px]">
                {item.BatchNo}
              </td>
              <td className="border border-solid border-[black] border-collapse p-[7px]">
                {item.Quantity}
              </td>

              <td className="border border-solid border-[black] border-collapse p-[10px]">
                {item.MRP}
              </td>
              <td className="border border-solid border-[black] border-collapse p-[10px]">
                {item.Discount}%
              </td>
              <td className="border border-solid border-[black] border-collapse p-[10px]">
                {item.amount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-[30px]   text-xl font-bold">
        <span>Net Amount: ₹</span> {netAmount}
      </div>
      <div className="bg-white border-t-2 border-b-2 border-black border-solid border-x-2  ">
        <div className="flex  ">
          <div className=" px-5 max-w-full text-black w-[232px]">
            <div className="self-start text-sm font-medium underline">
              Terms & Conditions :
            </div>
            <div className=" text-sm font-extralight">
              &nbsp;Subject to Kolkata Jurisdiction.
              <br /> ******GET WELL SOON******
            </div>
          </div>
          <div className=" ml-[350px]">
            <div className="flex flex-col pl-16  text-xs font-extralight ">
              <div className="self-end">For, Jan Aushadhi Kendra</div>
              <div className="self-end mt-5 max-md:mt-10">Pharmacist Sign</div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute right-50px">
        <ReactToPrint
          trigger={() => (
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hide-on-print">
              Print Invoice
            </button>
          )}
          content={() => componentRef.current}
        />
      </div>
    </div>
  );
}

export default Invoice;
