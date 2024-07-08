import React from "react";
import "../App.css";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="fixed w-full top-0 left-0  ">
      <div className="self-stretch h-[30px] bg-blue-800"></div>
      <nav className="items-container">
        <ul className="list-none bg-zinc-300 p-[5px] m-0 border-solid border border-[rgba(0,_0,_0,_1)] flex overflow-hidden ">
          {[
            { label: "Home", path: "/" },
            { label: "Sales", path: "/" },
            { label: "Expense", path: "/" },
            { label: "Inventory", path: "/inventory" },
            { label: "Reports", path: "/" },
            { label: "Quick Billing", path: "/quickBilling" },
            { label: "Find Invoice", path: "/" },
          ].map((item, index) => (
            <React.Fragment key={index}>
              <li className="float-left hover:bg-[hsl(130,_76%,_58%)] active:bg-green-300 font-[Calibri,_sans-serif] text-[black] no-underline text-[15px] gap-[20px] font-bold px-[20px] py-px block text-center  ">
                <NavLink to={item.path}>{item.label}</NavLink>
              </li>
              {index < 6 && (
                <div className="shrink-0 self-start w-0.5 bg-black border border-black border-solid h-[22px] active:bg-[hsl(130,_76%,_58%)]"></div>
              )}
            </React.Fragment>
          ))}
        </ul>
      </nav>
    </nav>
  );
}

export default Navbar;
