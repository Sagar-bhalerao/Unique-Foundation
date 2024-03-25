import React, { useState, useEffect } from "react";
import styles from "./Account.module.css";
import axios from "axios";
import AccountCreateGroupModal from "./AccountCreateGroupModal";
import Pagination from "react-js-pagination";
import { useAccountData } from "../../../context/AccountContex";

const Account = () => {
  const { setAccountDataHandler } = useAccountData();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 11;
  const [pageRangeDisplayed, setPageRangeDisplayed] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
// console.log(accountData);
  useEffect(() => {
    fetchData();
  }, [currentPage]); 
  
  // setAccountData(data);
  useEffect(() => {
    setPageRangeDisplayed(Math.ceil(filteredData.length / itemsPerPage));
  }, [filteredData, itemsPerPage]); 
  
  useEffect(() => {
    filterData(); // Initial filtering on page load
  }, [data, searchTerm]); // Trigger filtering whenever data or searchTerm changes
  
  const fetchData = async () => {
    try {
      const response = await axios.get("http://192.168.179.23:5002/account-view");
      if (response.status === 200) {
        setData(response.data);
        setAccountDataHandler(response.data);
      } else {
        console.log("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const filterData = () => {
    const results = data.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(results);
  };

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen); // Toggle modal state
  };

  const closeModal = () => {
    setIsModalOpen(false);
    fetchData();
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      
    <div className={styles.table}>
      <h2>Account Section</h2>
      <div className={`d-flex justify-content-between align-items-center mb-3 ${styles.button}`}>
        <button
          type="button"
          className="btn btn-primary"
          style={{ marginLeft: "14px", marginTop: "-16px" }}
          onClick={handleModalToggle}
        >
          Create Account
        </button>
        <div className={`d-flex justify-content-between align-items-center mb-3 ${styles.header}`}>
          <input
            type="text"
            className={`form-control ${styles.searchInput}`}
            placeholder="Search by Group..."
            style={{ width: "300px" }}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="table-responsive">
        <table className={`table table-striped ${styles.dataTable}`}>
          <thead className={styles.thead}>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Group ID</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.group_id}</td>
                <td>{item.status}</td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.pagination}>
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={itemsPerPage}
            totalItemsCount={filteredData.length}
            pageRangeDisplayed={6}
            onChange={handlePageChange}
            itemClass="page-item"
            linkClass="page-link"
            prevPageText="Previous"
            nextPageText="Next"
            hideFirstLastPages
          />
        </div>
      </div>
      {isModalOpen && <AccountCreateGroupModal closeModal={closeModal} />}
    </div>
    
    </>
  );
};

export default Account;
