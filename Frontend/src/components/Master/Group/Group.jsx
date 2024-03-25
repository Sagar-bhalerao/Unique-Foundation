import React, { useState, useEffect } from "react";
import styles from "./Group.module.css";
import CreateGroupModal from "./CreateGroupModal";
import axios from "axios";
import ReactDOM from "react-dom";
import Pagination from "react-js-pagination";

const Group = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 11;
  const [pageRangeDisplayed, setPageRangeDisplayed] = useState(1);

  useEffect(() => {
    fetchData();
  }, [currentPage]); 
  useEffect(() => {
    setPageRangeDisplayed(Math.ceil(filteredData.length / itemsPerPage));
  }, [filteredData, itemsPerPage]); 
  
  const fetchData = async () => {
    try {
      const response = await axios.get("http://192.168.179.23:5002/group-view");
      if (response.status === 200) {
        setData(response.data);
        filterData(response.data);
      } else {
        console.log("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const filterData = (data) => {
    const results = data.filter((item) =>
      Object.values(item).some(
        (value) =>
          value &&
          typeof value === "string" &&
          value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredData(results);
  };

  const handleModalToggle = () => {
    setIsModalOpen((prevIsModalOpen) => !prevIsModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    fetchData(); // Fetch data again after closing the modal
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className={` ${styles.container}`}>
      <h2>View Group</h2>
      <div
        className={`d-flex justify-content-between align-items-center mb-3 ${styles.button}`}
      >
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleModalToggle}
        >
          Create Group
        </button>
        <input
          type="text"
          className="form-control"
          placeholder="Search by group name..."
          style={{ width: "300px" }}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            filterData(data);
          }}
        />
      </div>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead className="text-center">
            <tr>
              <th>ID</th>
              <th>Group Name</th>
              <th>Main Group</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {currentItems.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.group_name}</td>
                <td>{item.main_group}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
      {ReactDOM.createPortal(
        isModalOpen && (
          <CreateGroupModal groupData={data} closeModal={closeModal} />
        ),
        document.getElementById("modal-root")
      )}
    </div>
  );
};

export default Group;
