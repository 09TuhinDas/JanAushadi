import React from "react";
import "../App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PCdetails() {
  const navigate = useNavigate();

  const [drugCode, setDrugCode] = useState("");
  const [quantity, setQuantity] = useState("");
  const [drugInfo, setDrugInfo] = useState(null);
  const [amount, setAmount] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [drugInfoToContinue, setDrugInfoToContinue] = useState(null);
  const [drugCodeToContinue, setDrugCodeToContinue] = useState("");
  const [quantityToContinue, setQuantityToContinue] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState(0);
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

  // Fetch next invoice number on component mount
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

    const fetchNextInvoiceNumber = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/next-invoice-number"
        );
        setInvoiceNumber(response.data.nextInvoiceNumber);
      } catch (error) {
        console.error("Error fetching next invoice number:", error);
      }
    };

    fetchLatestInvoice();
    fetchNextInvoiceNumber();
  }, []);

  // Fetch drug information when user presses Enter on Drug Code input
  const handleFetchDrugInfo = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      try {
        const response = await axios.get(
          `http://localhost:8080/drug/${drugCode}`
        );
        console.log("Response from drug fetch:", response.data);
        setDrugInfo(response.data); // Update drugInfo state
        setAmount(0); // Reset amount on new drug fetch
      } catch (error) {
        console.error("Error fetching drug:", error);
        setDrugInfo(null);
        setAmount(0); // Reset amount if fetch fails
      }
    }
  };
  // Calculate amount based on quantity, drugInfo, and discount changes
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

  // Handle change in quantity input
  const handleQuantityChange = (e) => {
    setQuantity(e.target.value); // Update quantity state
  };

  // Handle change in discount input
  const handleDiscountChange = (e) => {
    setDiscount(e.target.value);
  };

  // Handle form submission (adding to tableData)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (drugInfo) {
      const newEntry = {
        drugCode,
        productName: drugInfo.ProductName,
        batchNo: drugInfo.BatchNo,
        quantity,
        packSize: drugInfo.Pack,
        mrp: drugInfo.MRP,
        discount,
        mfgDate: drugInfo.MfgDate,
        expire: drugInfo.Expire,
        amount: amount.toFixed(2),
      };
      setTableData([...tableData, newEntry]);
      // Reset form fields
      setDrugCode("");
      setQuantity("");
      setDrugInfo(null);
      setAmount(0);
      setDiscount(0);
      // Set continue state
      setDrugInfoToContinue(drugInfo);
      setDrugCodeToContinue(drugCode);
      setQuantityToContinue(quantity);
    }
  };

  // Handle continue button click (updating drug quantity and pack size)

  // Handle continue button click (updating drug quantity and pack size)
  const handleContinue = async () => {
    if (drugInfoToContinue && drugCodeToContinue && quantityToContinue) {
      try {
        // Step 1: Generate invoice number
        const {
          data: { nextInvoiceNumber: invoiceNumber },
        } = await axios.get("http://localhost:8080/next-invoice-number");

        // Step 2: Prepare data for invoice
        const billedItems = tableData.map((entry) => ({
          DrugCode: entry.drugCode,
          ProductName: entry.productName,
          BatchNo: entry.batchNo,
          Quantity: entry.quantity,
          Pack: entry.packSize,
          MRP: entry.mrp,
          Discount: entry.discount,
          MfgDate: entry.mfgDate,
          Expire: entry.expire,
          amount: entry.amount,
        }));

        const invoiceData = {
          // Define invoiceData with required fields
          invoiceNumber,
          billedItems,
          netAmount: calculateTotalAmount(),
        };

        console.log("Data being sent to API:", invoiceData);

        // Step 3: Save invoice data to API
        const { data: saveInvoiceResponse } = await axios.post(
          "http://localhost:8080/save-invoice",
          invoiceData // Pass invoiceData to the API call
        );
        console.log("Response from saving invoice:", saveInvoiceResponse);

        // Step 4: Update drug details
        const { data: updateDrugResponse } = await axios.put(
          `http://localhost:8080/drug/${drugCodeToContinue}`,
          {
            quantity: Number(quantityToContinue),
            packSize: drugInfoToContinue.Pack,
          }
        );
        console.log("Response from updating drug:", updateDrugResponse);
        alert("Quantity and pack size updated successfully");

        // Clear state
        setDrugCode("");
        setQuantity("");
        setDrugInfo(null);
        setAmount(0);
        setDiscount(0);
        setTableData([]);
        setDrugInfoToContinue(null);
        setDrugCodeToContinue("");
        setQuantityToContinue("");

        // Redirect to invoice page
        navigate(`/Invoice/${invoiceNumber}`);
      } catch (error) {
        if (error.response && error.response.status === 500) {
          console.error("Internal Server Error:", error.response.data);
          alert("Failed to handle continue process. Please try again later.");
        } else {
          console.error("Error handling continue:", error);
          alert("An unexpected error occurred. Please try again later.");
        }
      }
    } else {
      alert("Please fill in all required fields before continuing.");
    }
  };

  const handleDeleteRow = (indexToDelete) => {
    const updatedTableData = tableData.filter(
      (_, index) => index !== indexToDelete
    );
    setTableData(updatedTableData);
  };

  const calculateTotalAmount = () => {
    let total = 0;
    tableData.forEach((entry) => {
      total += parseFloat(entry.amount);
    });
    return total.toFixed(2);
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
                  value={invoiceNumber}
                  readOnly
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
            <table
              className="border border-solid border-[black] w-full border-collapse"
              cellPadding={10}
              cellSpacing={0}
              border={1}
            >
              <thead>
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
                  <th className="gap-0 px-3 text-[21px] font-bold text-center text-black  bg-zinc-300 border-x-2   bg-white border-t border-b border-black  text-center">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody className="p-[10px] text-center">
                {tableData.map((entry, index) => (
                  <tr key={index}>
                    <td className="border border-solid border-[black] border-collapse p-[10px]">
                      {index + 1}
                    </td>
                    <td className="border border-solid border-[black] border-collapse p-[10px]">
                      {entry.drugCode}
                    </td>
                    <td className="border border-solid border-[black] border-collapse p-[10px]">
                      {entry.productName}
                    </td>
                    <td className="border border-solid border-[black] border-collapse p-[10px]">
                      {entry.batchNo}
                    </td>
                    <td className="border border-solid border-[black] border-collapse p-[10px]">
                      {entry.quantity}
                    </td>
                    <td className="border border-solid border-[black] border-collapse p-[10px]">
                      {entry.packSize}
                    </td>
                    <td className="border border-solid border-[black] border-collapse p-[10px]">
                      {entry.mrp}
                    </td>
                    <td className="border border-solid border-[black] border-collapse p-[10px]">
                      {entry.discount}
                    </td>
                    <td className="border border-solid border-[black] border-collapse p-[10px]">
                      {entry.mfgDate}
                    </td>
                    <td className="border border-solid border-[black] border-collapse p-[10px]">
                      {entry.expire}
                    </td>
                    <td className="border border-solid border-[black] border-collapse p-[10px]">
                      {entry.amount}
                    </td>
                    <td className="border border-solid border-[black] border-collapse  p-[10px]">
                      <button
                        className="border-0 px-2.5 py-1.5 p rounded-[5px] bg-[red] outline:none text-[white]"
                        onClick={() => handleDeleteRow(index)}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="ml-[405px] mb-[9px] mr-[9px] h-[65px] flex gap-5 self-end pr-7 pl-20 mt-3 text-3xl text-center text-black whitespace-nowrap bg-white border-2 border-black border-solid">
        <div className="flex ">
          <button
            className="mt-[5px] shadow-sm bg-zinc-300 bg-opacity-80 rounded-[30.859px] h-[50px] w-[200px] hover:bg-blue-300 active:border-white duration-300 active:text-white"
            onClick={handleContinue}
          >
            Continue
          </button>
          <div className="font-bold ml-[330px] mt-[10px] text-center text-4xl">
            Net Amount :
            <input
              type="number"
              placeholder="0.00"
              className="ml-[10px] rounded-[10.052px] border-[rgba(0,_0,_0,_0.5)] border-solid border w-[160px]"
              value={calculateTotalAmount()}
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PCdetails;
