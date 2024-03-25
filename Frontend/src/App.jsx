import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.module.css";
import MemberForm from "./components/Master/Members/Member-Form.jsx";
import Navbar from "./components/Navbar-component/Navbar.jsx";
import Home from "./components/Home/Home.jsx";
import MemberData from "./components/Master/Members/Member-data.jsx";
import Group from "./components/Master/Group/Group.jsx";
import Account from "./components/Master/Account/Account.jsx";
import VoucherEntry from "./components/Transactions/Voucher-Entery/Voucher-Entry.jsx";
import SalaryUplaod from "./components/Transactions/Salary-Upload/Salary-Upload.jsx";
import ApplicationView from "./components/Transactions/Application/ApplicationView.jsx";
import ApplicationForm from "./components/Transactions/Application/Application-form.jsx";
import { DataProvider } from "./context/memberDatacontext.jsx";
import { AccountDataProvider } from "./context/AccountContex.jsx";
import VoucherEntryView from "./components/Transactions/Voucher-Entery/Voucher-EnteryView.jsx";
import Ledger from "./components/Reports/Ledger/Ledger.jsx";
function App() {

  
  return (
    <>
      <BrowserRouter>
     <DataProvider>
      <AccountDataProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/member-form" element={<MemberForm  />} />
          <Route path="/memberdata" element={<MemberData/>} />
          <Route path="/Group" element={<Group />} />
          <Route path="/Account" element={<Account />} />
          <Route path="VoucherView" element={<VoucherEntryView  />} />
          <Route path="/VoucherEntry" element={<VoucherEntry />} />
          <Route path="/SalaryUpload" element={<SalaryUplaod/>} />
          <Route path="/ApplicationView" element={<ApplicationView /> } />
          <Route path="/Application-form" element={<ApplicationForm  /> } />
          <Route path="/Ledger" element={<Ledger/> } />
        </Routes>
        </AccountDataProvider>
        </DataProvider>
      </BrowserRouter>
    </>
  );
}


export default App;
