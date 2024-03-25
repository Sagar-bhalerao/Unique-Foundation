import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit } from '@fortawesome/free-solid-svg-icons';
import moment from "moment";
import ReactDOM from 'react-dom'; 
import Pagination from "react-js-pagination";
import axios from "axios";

import styles from "./member.module.css";
import EditMemberModal from "./EditMemberModal"; 
import ViewMemberModal from "./ViewMemberModal";

const MemberData = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    fetchData();
  }, [currentPage]); // Refetch data when the currentPage changes  
  
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://192.168.179.23:5002/members`);
      if (response.status === 200) {
        setData(response.data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEdit = (selectedMember) => {
    setSelectedMember(selectedMember); // Set the selected member for editing
    setShowEditModal(true);
  };

  const handleView = (selectedMember) => {
    setSelectedMember(selectedMember); 
    setShowViewModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    fetchData(); // Refetch data after closing modal
  };

  const handleCloseViewModal = () => {
    setShowViewModal(false);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.filter((item) =>
    (item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (item.external_code && item.external_code.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (item.dob && moment(item.dob).format("DD/MM/YYYY").includes(searchTerm)) ||
    (item.doj && moment(item.doj).format("DD/MM/YYYY").includes(searchTerm))
  ).slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className={styles.table}>
      <h2> Members Data </h2>
      <div className={`d-flex justify-content-between align-items-center mb-3 ${styles.header}`}>
        <Link to="/member-form" className={`btn btn-primary mb-3 ${styles.addButton}`}>Add Member</Link>
        <label
            htmlFor="search"
            style={{ fontWeight: "bold", marginLeft: "50rem" }}
          >
            Search:
          </label>
        <input
          type="text"
          className={`form-control ${styles.searchInput}`}
          placeholder="Search Here..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: "300px",    borderBlockColor: "#7A4AFB",
          borderBlockEndColor: "#7A4AFB",
          borderLeftColor: "#7A4AFB",
          borderRightColor: "#7A4AFB",
          marginRight: "1rem", }}
        />
      </div>
      <div className={styles.tableContainer} > {/* Apply custom style to table container */}
        <table className={`table table-striped ${styles.dataTable}`} >
          <thead className={styles.thead} >
            <tr>
              <th>ID</th>
              <th>Name</th>
              <td style={{fontWeight:"bold"}}>Ext_code</td>
              <th>DOB</th>
              <th>DOJ</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {currentItems.map((item) => (
              <tr style={{ height:"20px" }} key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.external_code}</td>
                <td>{moment(item.dob).format("DD/MM/YYYY")}</td>
                <td>{moment(item.doj).format("DD/MM/YYYY")}</td>
                <td>{item.status}</td>
                <td>
                  <button className={`btn btn-primary ${styles.editButton}`} data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => handleEdit(item)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button className={`btn btn-success ${styles.viewButton}`} data-bs-toggle="modal" data-bs-target="viewModal" onClick={() => handleView(item)}>
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
   
      </div>
      <div className={styles.pagination} style={{float:"right",marginTop:"-11px"}}>
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={itemsPerPage}
             
            breakLabel={"..."} // Set the break label text
            totalItemsCount={data.length}
            pageRangeDisplayed={6}
            onChange={handlePageChange}
            itemClass="page-item"
            linkClass="page-link"
            prevPageText="Previous"
            nextPageText="Next"
            hideFirstLastPages
            hideEllipsis // Hide ellipsis when it's not needed
          />
        </div>
      {/* Portal for modals */}
      {ReactDOM.createPortal(
        showEditModal && <EditMemberModal showModal={showEditModal} onSave={handleCloseEditModal} handleClose={handleCloseEditModal} memberdata={selectedMember ? [selectedMember] : []} />,
        document.getElementById("modal-root")
      )}
      {ReactDOM.createPortal(
        showViewModal && <ViewMemberModal showModal={showViewModal}  handleClose={handleCloseViewModal} memberdata={selectedMember ? [selectedMember] : []} />,
        document.getElementById("modal-root")
      )}
    </div>
  );
};

export default MemberData;
