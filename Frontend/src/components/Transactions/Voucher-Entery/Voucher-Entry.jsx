import React, { useState,useEffect,useCallback } from "react";
import { IoReorderThreeOutline } from "react-icons/io5";
import { MdAccountBalance } from "react-icons/md";
import { useData } from "../../../context/memberDatacontext";
import { IoMdPersonAdd } from "react-icons/io";
import { useAccountData } from "../../../context/AccountContex";
import { MdDeleteSweep } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const VoucherEntry = () => {
   const {accountData} = useAccountData();
   const {data} = useData(); 
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [showFirstTable, setShowFirstTable] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [voucherEntries, setVoucherEntries] = useState([
    {
      id: 1,
      accountID: "",
      accountName: "",
      memberName: "",
      memberID: "",
      voucherAmount: "", 
      balanceType: "", 
      remark: "" 
    },
  ]);

  const [selectedRowIndex, setSelectedRowIndex] = useState(null);    
  const [totalCredit, setTotalCredit] = useState(0);
  const [totalDebit, setTotalDebit] = useState(0);

  useEffect(() => {
    // Calculate total credit and total debit when voucher entries change
    let creditTotal = 0;
    let debitTotal = 0;
    voucherEntries.forEach(entry => {
      if (entry.balanceType === "credit" && !isNaN(parseFloat(entry.voucherAmount))) {
        creditTotal += parseFloat(entry.voucherAmount);
      } else if (entry.balanceType === "debit" && !isNaN(parseFloat(entry.voucherAmount))) {
        debitTotal += parseFloat(entry.voucherAmount);
      }
    });
    setTotalCredit(creditTotal);
    setTotalDebit(debitTotal);
}, [voucherEntries]);

  const navigate = useNavigate();


  
 // Handle changes in voucher amount
 const handleVoucherAmountChange = useCallback((index, value) => {
  const updatedEntries = [...voucherEntries];
  updatedEntries[index].voucherAmount = value;
  setVoucherEntries(updatedEntries);
}, [voucherEntries]);

 
   // Handle changes in balance type
   const handleBalanceTypeChange = useCallback((index, value) => {
    const updatedEntries = [...voucherEntries];
    updatedEntries[index].balanceType = value;
    setVoucherEntries(updatedEntries);
  },[voucherEntries]);

  // Handle changes in remark
  const handleRemarkChange = useCallback((index, value) => {
    const updatedEntries = [...voucherEntries];
    updatedEntries[index].remark = value;
    setVoucherEntries(updatedEntries);
  },[voucherEntries]);



  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  const handleGoButtonClick = () => {
    if (!selectedDate || !selectedType) {
      return;
    }
    setShowFirstTable(true);
    console.log("GO button clicked");
  };

  const handelSelectBtn = (rowID) => {
    setSelectedRowIndex(rowID);
  };

  const handleAccountSelection = (name, accID) => {
    if (selectedRowIndex !== null) {
      const updatedEntries = voucherEntries.map((entry, index) => {
        if (index === selectedRowIndex) {
          return {
            ...entry,
            accountID: accID,
            accountName: name,
          };
        }
        return entry;
      });
      setVoucherEntries(updatedEntries);
    }
  };

  const handleMemberSelection = (name,memID) => {
    if (selectedRowIndex !== null) {
      const updatedmemEntry = voucherEntries.map((entry, index) => {
        if (index === selectedRowIndex) {
          return {
            ...entry,
            memberID:memID,           
            memberName: name,

          };
        }
        return entry;
      });
      setVoucherEntries(updatedmemEntry);
    }
  };


  const FilterData = data.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddEntry = () => {
    const newEntry = {
      id: voucherEntries.length + 1,
      accountID: "",
      accountName: "",
    };
    setVoucherEntries([...voucherEntries, newEntry]);
  };
  const handleDeleteBtn = () => {
    setVoucherEntries(prevEntries => {
      if(prevEntries.length > 1){
      const updatedEntries = [...prevEntries];
      updatedEntries.pop(); 
      return updatedEntries;  
      }
      return prevEntries;
    });
  };
  


  const handleSubmit = async () => {

    if(totalCredit !== totalDebit || !totalCredit && !totalDebit){
      toast.warning("Credit and Debit Amounts must be match !" );
      return;
    }

    try {
     
        let body = {
            voucher_date: selectedDate,
            voucher_type: selectedType,          
            entries: voucherEntries, // Pass voucherEntries array 
         };
      console.log(body);
      const response = await axios.post("http://192.168.179.23:5002/Voucher-Entry", body);
      if(response.status === 200){
      toast.success("Data Inserted Successfully"); 
      navigate("/VoucherView")     
     
      }
      console.log("Response:", response.data);
      
    } catch (error) {
      toast.error("Something Went Wrong !!");
     
    }
  };



  return (
    <>
      <div className="container">
      <div className="row align-items-center">
  {/* Date Input */}
  <div className="col-md-4 col-sm-12 mb-3">
    <div className="d-flex flex-column justify-content-center">
      <label
        htmlFor="formDate"
        className="mb-0"
        style={{ fontWeight: "bold" }}
      >
        Date:
      </label>
    </div>
    <div className="form-group mb-0 ml-2">
      <input
        type="date"
        className="form-control"
        id="formDate"
        style={{width:"80%"}}
        value={selectedDate}
        onChange={handleDateChange}
        max={new Date().toISOString().split("T")[0]}
      />
    </div>
  </div>
  {/* Voucher Type Select */}
  <div className="col-md-4 col-sm-12 mb-3">
    <div className="d-flex flex-column justify-content-center">
      <label
        htmlFor="formVoucherType"
        className="mb-0"
        style={{ fontWeight: "bold" }}
      >
        Voucher Type:
      </label>
    </div>
    <div className="form-group mb-0 ml-2">
      <select
        className="form-control"
        id="formVoucherType"
        style={{width:"80%"}}
        value={selectedType}
        onChange={handleTypeChange}
      >
        <option value="">Select Type</option>
        <option value="BR">Bank Receipt</option>
        <option value="BP">Bank Payment</option>
        <option value="CR">Cash Receipt</option>
        <option value="CP">Cash Payment</option>
        <option value="JV">Journal Voucher</option>
        {/* Add more options as needed */}
      </select>
    </div>
  </div>
  {/* Go Button */}
  <div className="col-md-4 col-sm-12 d-flex align-items-center justify-content-start">
    <button className="btn btn-primary" style={{marginLeft:"4rem"}} onClick={handleGoButtonClick}>
      GO
    </button>
  </div>
</div>


        {/* First Table */}
        {showFirstTable && (
          <>
            <div className="row mt-4">
              <div className="col">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Sr No</th>
                      <th scope="col">Account ID</th>
                      <th scope="col">Voucher Amount</th>
                      <th scope="col">Balance Type</th>
                      <th scope="col">Member ID</th>
                      <th scope="col">Remark</th>
                    </tr>
                  </thead>

                  <tbody>
                    {voucherEntries.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                        <div className="input-group mb-3">
                          <input
                            type="text"
                            className="form-control"
                            style={{ width: "50%" }}
                            id={`account-input-${index}`}
                            value={item.accountName}
                            readOnly
                          />
                          <button
                            data-bs-toggle="modal"
                            data-bs-target="#AccountDetails"
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={()=>handelSelectBtn(index) }
                          >
                            <IoReorderThreeOutline size={22} color="black" />
                          </button>
                          </div>
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control text-right"
                            style={{ width: "100%",float:"right" }}
                            value={item.voucherAmount}
                            onChange={(e) =>
                              handleVoucherAmountChange(index, e.target.value)
                            }
                          />
                        </td>
                        <td>
                          <select className="form-control"  value={item.balanceType}
                            onChange={(e) =>
                              handleBalanceTypeChange(index, e.target.value)
                            } style={{width:"auto"}}>
                             <option >Select Type</option>
                            <option value="debit">Debit</option>
                            <option value="credit">Credit</option>
                          </select>
                        </td>
                        <td>
                        <div className="input-group mb-3">
                          <input
                            type="text"
                            className="form-control"
                            style={{ width: "50%" }}
                            value={item.memberName}
                            readOnly
                          />
                          <button
                            data-bs-toggle="modal"
                            data-bs-target="#memberDetails"
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={()=>handelSelectBtn(index) }
                          >
                            <IoReorderThreeOutline size={22} color="black" />
                          </button>{" "}
                          </div>
                        </td>
                        <td>
                          <textarea className="form-control"  value={item.remark}
                            onChange={(e) =>
                              handleRemarkChange(index, e.target.value)
                            } style={{width:"100%",height:"16px"}}/>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              
              </div>
              
            </div>

            {/* Buttons */}
            <div className="row">
    <div className="col-md-4 d-flex align-items-center">
        <button className="btn btn-primary" onClick={handleAddEntry}>
            Add Entry
        </button>
        <button
            style={{ marginLeft: "1rem" }}
            className="btn btn-danger"
            onClick={handleDeleteBtn}
        >
            <MdDeleteSweep size={22} color="black" />
        </button>
    </div>
   
    <div className="col-md-2 mb-3 d-flex align-items-start">
    <label htmlFor="credit" className="form-label" style={{ width: "94px" ,fontWeight:"bold"}}>
        Credit:
    </label>
    <div className="input-group">
        <input
            type="number"
            className="form-control"
            id="credit"
            value={totalCredit} // Display the total credit amount
            readOnly 
        />
    </div>
       </div>
       <div className="col-md-2 mb-3 d-flex align-items-start">
    <label htmlFor="debit" className="form-label" style={{ width: "94px",fontWeight:"bold" }}>
        Debit:
    </label>
    <div className="input-group">
        <input
            type="number"
            className="form-control"
            id="debit"
            value={totalDebit} // Display the total debit amount
            readOnly 
        />
    </div>
       </div>
</div>
          </>
        )} 
     {showFirstTable && (<div className="col-md-7 buttons d-flex justify-content-center" style={{ marginTop: "20px" }}>
     <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
        Submit
      </button>
    <button
        type="reset"
        className="btn btn-danger danger"
        onClick={()=>navigate('/VoucherView')}
    >
        Cancel
    </button>
</div>
)}
          </div>
   
      {/* accouuntDetails Modal */}

      <div
        className="modal fade"
        id="AccountDetails"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Select Member Name
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* <input
                            type="text"
                            className="form-control"
                            placeholder="Search by name"
                            value={searchQuery}
                            onChange={(e) => setsearachQuery(e.target.value)}
                          /> */}
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead className="text-center">
                    <tr>
                      <th>ID</th>
                      <th>Account Name</th>
                      <th>Select</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {accountData.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>
                          <button
                            className={`btn btn-primary`}
                            data-bs-dismiss="modal"
                            onClick={() =>
                              handleAccountSelection(item.name, item.id)
                            }
                          >
                            <MdAccountBalance size={20} color="black" />{" "}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="modal-footer">
              {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-primary">Save changes</button> */}
            </div>
          </div>
        </div>
      </div>

      {/* MemeberDetails modal */}

      <div
        className="modal fade"
        id="memberDetails"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Select Member Name
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                placeholder="Search by name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead className="text-center">
                    <tr>
                      <th>ID</th>
                      <th>Member Name</th>
                      <th>Select</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {FilterData.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>
                          <button
                            data-bs-dismiss="modal"
                            className={`btn btn-primary`}
                           onClick={()=>handleMemberSelection(item.name,item.id)} 
                          >
                            <IoMdPersonAdd size={20} color="black" />{" "}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="modal-footer">
              {/* <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                   <button type="button" class="btn btn-primary">Save changes</button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VoucherEntry;
