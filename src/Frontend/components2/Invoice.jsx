import React from "react";
import "../App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function Invoice() {
  const [currentDate, setCurrentDate] = useState("");
  const [latestInvoice, setLatestInvoice] = useState(null);

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
          setTableData(billedItems);
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
    <div className="invoice">
      <div className="mt-[90px]">
        <div className="pt-0.5 pr-1.5 pb-6 pl-4 w-full bg-white border-t border-b border-black border-solid border-x max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-1/5 max-md:ml-0 max-md:w-full">
              <img
                loading="lazy"
                srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/7d8f359ab37350a959a0a0dcb5ce9b5df3c45a13cbcbb00ac48fa9e78afed027?apiKey=150ca4726f0b413090f132e093d2a392&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/7d8f359ab37350a959a0a0dcb5ce9b5df3c45a13cbcbb00ac48fa9e78afed027?apiKey=150ca4726f0b413090f132e093d2a392&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/7d8f359ab37350a959a0a0dcb5ce9b5df3c45a13cbcbb00ac48fa9e78afed027?apiKey=150ca4726f0b413090f132e093d2a392&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/7d8f359ab37350a959a0a0dcb5ce9b5df3c45a13cbcbb00ac48fa9e78afed027?apiKey=150ca4726f0b413090f132e093d2a392&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/7d8f359ab37350a959a0a0dcb5ce9b5df3c45a13cbcbb00ac48fa9e78afed027?apiKey=150ca4726f0b413090f132e093d2a392&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/7d8f359ab37350a959a0a0dcb5ce9b5df3c45a13cbcbb00ac48fa9e78afed027?apiKey=150ca4726f0b413090f132e093d2a392&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/7d8f359ab37350a959a0a0dcb5ce9b5df3c45a13cbcbb00ac48fa9e78afed027?apiKey=150ca4726f0b413090f132e093d2a392&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/7d8f359ab37350a959a0a0dcb5ce9b5df3c45a13cbcbb00ac48fa9e78afed027?apiKey=150ca4726f0b413090f132e093d2a392&"
                className="shrink-0 aspect-[0.79] w-[120px] max-md:mt-10"
              />
            </div>
            <div className="flex flex-col ml-5 w-[64%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow items-center mt-1 text-center text-black max-md:mt-10">
                <div className="text-xl font-extrabold">
                  Jan Aushadhi Kendra
                </div>
                <div className="self-stretch mt-2 text-xs font-light">
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
                <div className="mt-3.5 text-base font-semibold">
                  GST Invoice
                </div>
              </div>
            </div>
            <div className="flex flex-col ml-5 w-[17%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col text-base text-center text-black whitespace-nowrap max-md:mt-10">
                <img
                  loading="lazy"
                  srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/db2494aa43897811dd37f15df734a644a219c47f7feb8c06e0c24bfcc13748bc?apiKey=150ca4726f0b413090f132e093d2a392&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/db2494aa43897811dd37f15df734a644a219c47f7feb8c06e0c24bfcc13748bc?apiKey=150ca4726f0b413090f132e093d2a392&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/db2494aa43897811dd37f15df734a644a219c47f7feb8c06e0c24bfcc13748bc?apiKey=150ca4726f0b413090f132e093d2a392&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/db2494aa43897811dd37f15df734a644a219c47f7feb8c06e0c24bfcc13748bc?apiKey=150ca4726f0b413090f132e093d2a392&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/db2494aa43897811dd37f15df734a644a219c47f7feb8c06e0c24bfcc13748bc?apiKey=150ca4726f0b413090f132e093d2a392&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/db2494aa43897811dd37f15df734a644a219c47f7feb8c06e0c24bfcc13748bc?apiKey=150ca4726f0b413090f132e093d2a392&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/db2494aa43897811dd37f15df734a644a219c47f7feb8c06e0c24bfcc13748bc?apiKey=150ca4726f0b413090f132e093d2a392&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/db2494aa43897811dd37f15df734a644a219c47f7feb8c06e0c24bfcc13748bc?apiKey=150ca4726f0b413090f132e093d2a392&"
                  className="self-center w-30 aspect-[2.44]"
                />
                <div className="mt-3 ml-7">ORIGINAL</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="patient details">
          <div className="mt-1 ml-2.5 text-sm font-semibold text-center text-black">
            <div className="mb-[4px]">
              Patient Name :
              <input
                className="ml-[5px] rounded-[10.052px] border-[rgba(0,_0,_0,_0.5)] border-solid border w-[180px] "
                type="text"
                placeholder="Name"
                name="Patient-Name"
              />
            </div>
            <div className="mb-[4px]">
              Patient Mob. :
              <input
                className="ml-[5px] rounded-[10.052px] border-[rgba(0,_0,_0,_0.5)] border-solid border w-[180px] "
                placeholder="Phone Number"
                type="number"
                name="mobile-number"
              />
            </div>
            <div className="mb-[4px]">
              Doctors Name :
              <input
                className="ml-[5px] rounded-[10.052px] border-[rgba(0,_0,_0,_0.5)] border-solid border w-[180px]"
                type="text"
                placeholder="Doc. Name"
                name="Doc.-Name"
              />
            </div>
          </div>
        </div>
        <div className="invoice-details">
          <div className="absolute right-[120px] flex flex-col">
            <div className=" items-center space-x-4 text-sm font-semibold text-black">
              <div className="ml-[15px] mb-[4px]">
                <span>Invoice No. :</span>
              </div>
              <div className="mb-[4px]">
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
      <div className="border-t-[black] border-t border-solid" />
      <table
        className="border border-solid border-[black] w-full border-collapse"
        cellPadding={10}
        cellSpacing={0}
        border={1}
      >
        <thead>
          <tr>
            <th className="ml-[9px] gap-0 px-1 text-[15px] font-bold text-center text-black  border-x-2   bg-white border-t border-b border-black  text-center">
              S.No
            </th>
            <th className="ml-[9px] gap-0 px-14 text-[15px] font-bold text-center text-black  border-x-2   bg-white border-t border-b border-black  text-center">
              Product Name
            </th>
            <th className=" gap-0 px-5 text-[15px] font-bold text-center text-black border-x-2  bg-white border-t border-b border-black  text-center">
              HSN <br />
              Code
            </th>
            <th className="gap-0 px-4 py-4 text-[15px] font-bold text-center text-black  border-x-2   bg-white border-t border-b border-black  text-center">
              Batch
            </th>
            <th className="gap-0 px-3 py-4 text-[15px] font-bold text-center text-black  border-x-2   bg-white border-t border-b border-black  text-center">
              Qty.
            </th>
            <th className="gap-0 px-3 py-4 text-[15px] font-bold text-center text-black  border-x-2   bg-white border-t border-b border-black ] text-center">
              Pack
            </th>
            <th className="gap-0 px-3 py-4 text-[15px] font-bold text-center text-black  border-x-2   bg-white border-t border-b border-black  text-center">
              MRP.
            </th>
            <th className="gap-0 px-1 text-[15px] font-bold text-center text-black  border-x-2   bg-white border-t border-b border-black  text-center">
              Disc%
            </th>
            <th className="gap-0 px-4 text-[15px] font-bold text-center text-black   border-x-2   bg-white border-t border-b border-black  text-center">
              Amount <br />
              (Rs .)
            </th>
          </tr>
        </thead>
        <tbody className="p-[10px] text-center">
          {tableData.map((item, index) => (
            <tr key={index}>
              <td className="border border-solid border-[black] border-collapse p-[10px]">
                {index + 1}
              </td>
              <td className="border border-solid border-[black] border-collapse p-[10px]">
                {item.ProductName}
              </td>
              <td className="border border-solid border-[black] border-collapse p-[10px]">
                {item.hsnCode}
              </td>
              <td className="border border-solid border-[black] border-collapse p-[10px]">
                {item.BatchNo}
              </td>
              <td className="border border-solid border-[black] border-collapse p-[10px]">
                {item.Quantity}
              </td>
              <td className="border border-solid border-[black] border-collapse p-[10px]">
                {item.Pack}
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
      <div className="absolute right-[120px] mt-[420px] text-xl font-bold">
        <span>Net Amount:</span>
      </div>
      <div className="flex">
        <div className=" px-5 mt-[500px] mb-[50px] max-w-full text-black w-[232px]">
          <div className="self-start text-sm font-medium underline">
            Terms & Conditions :
          </div>
          <div className="mt-3.5 text-xs font-extralight">
            &nbsp;Subject to Kolkata Jurisdiction.
            <br /> ******GET WELL SOON******
          </div>
        </div>
        <div className="absolute right-[20px]">
          <div className="flex flex-col pl-16 mt-[500px] text-xs font-extralight ">
            <div className="self-end">For, Jan Aushadhi Kendra</div>
            <div className="self-end mt-5 max-md:mt-10">Pharmacist Sign</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Invoice;
