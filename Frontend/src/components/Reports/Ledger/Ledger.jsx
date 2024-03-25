import React, { useState } from "react";
import { IoReorderThreeOutline } from "react-icons/io5";
const Ledger = () => {
  const [showGroup, setShowGroup] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [selectedLedger, setSelectedLedger] = useState(null);
  const [tableData, setTableData] = useState(false);

  const handleGroupCheckboxChange = () => {

    setShowGroup(!showGroup);
    setShowAccount(false);
    setSelectedLedger("Group");
  };

  const handleAccountCheckboxChange = () => {
    setShowAccount(!showAccount);
    setShowGroup(false);
    setSelectedLedger("Account");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setTableData(true);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="container p-4">
          <div className="row">
            <div className="col-md-6 col-lg-4">
              <label className="form-check-label">
                <input
                  type="checkbox"
                  className="form-check-input"
                  onChange={handleGroupCheckboxChange}
                />
                Group Ledger
              </label>
            </div>
            <div className="col-md-6 col-lg-4">
              <label className="form-check-label">
                <input
                  type="checkbox"
                  className="form-check-input"
                  onChange={handleAccountCheckboxChange}
                />
                Account Ledger
              </label>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-6 col-lg-4 mb-3">
              <label htmlFor="fromdate" className="form-label">
                From:
              </label>
              <input
                type="date"
                className="form-control"
                id="fromdate"
                name="fromdate"
              />
            </div>
            <div className="col-md-6 col-lg-4 mb-3">
              <label htmlFor="todate" className="form-label">
                To:
              </label>
              <input
                type="date"
                className="form-control"
                id="todate"
                name="todate"
              />
            </div>
          </div>

          {showGroup && (
            <div className="row">
              <div className="col-md-6 col-lg-4 mb-3">
                <label htmlFor="group" className="form-label">
                  Group:
                </label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    id="group"
                    readOnly
                  />
                  <button
                            data-bs-toggle="modal"
                            data-bs-target="#groupData"
                            className="btn btn-outline-secondary"
                            type="button"
                           
                          >
                            <IoReorderThreeOutline size={22} color="black" />
                          </button>{" "}
                </div>
              </div>
            </div>
          )}

          {showAccount && (
            <div className="row">
              <div className="col-md-6 col-lg-4 mb-3">
                <label htmlFor="account" className="form-label">
                  Account:
                </label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    id="account"
                    readOnly
                  />
                  <button className="btn btn-outline-secondary" type="button">
                    Select
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="row">
            <div className="col-md-6 col-lg-4 mb-3">
              <button type="submit" className="btn btn-primary me-2">
                Submit
              </button>
              <button type="reset" className="btn btn-danger">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Render table based on selected ledger type */}
      {tableData && selectedLedger && (
        <div className="container mt-5">
          <table className="table">
            <thead>
              <tr>
                <th>{selectedLedger} Name</th>
                <th>Debit</th>
                <th>Credit</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Sample Name</td>
                <td>Sample Debit</td>
                <td>Sample Credit</td>
                <td>Sample Balance</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Ledger;
