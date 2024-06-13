import React from "react";
import "../App.css";
import Netsale from "../components1/Netsale";
import Profit from "../components1/Profit";
import NetPurshase from "../components1/NetPurchase";
import NearExp from "../components1/nearExp";
import RefilStk from "../components1/RefilStk";
import Movingitms from "../components1/Movingitms";
import DuePay from "../components1/DuePay";

function Home() {
  return (
    <div className="w-auto h-auto z-auto">
      <div className="flex mt-[5px]">
        <Netsale />
        <Movingitms />
        <DuePay />
      </div>
      <Profit />
      <NetPurshase />
      <object id="near-exp" align="left">
        <NearExp />
      </object>
      <div id="refil-stk" align="right">
        <RefilStk />
      </div>
    </div>
  );
}

export default Home;
