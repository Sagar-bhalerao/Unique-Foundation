import styles from "./Salary_upload.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const SalaryUpload = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(10);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const results = data.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(results);
  }, [data, searchTerm]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://192.168.179.23:5002/salary_upload"
      );
      if (response.status === 200) {
        setData(response.data);
      } else {
        console.log("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const pageCount = Math.ceil(filteredData.length / itemsPerPage);
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const handleMonthChange = (value) => {
    setMonth(value);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const url = `http://192.168.179.23:5002/upload?month=${month}&year=${year}`;

      // Upload file
      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);

        await axios.post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        toast.success("File Uploaded Successfully");
        
        // Fetch updated data
        await fetchData();
      } else {
        toast.warning("No file selected");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className={styles.table}>
      <h2>Salary Upload</h2>
      <div
        className={`d-flex justify-content-between align-items-center mb-3 ${styles.header}`}
      >
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#salaryModal"
        >
          Upload Salary
        </button>
        <label
            htmlFor="search"
            style={{ fontWeight: "bold", marginLeft: "50rem" }}
          >
            Search:
          </label>
        <input
          type="text"
          className={`form-control ${styles.searchInput}`}
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}          
          style={{
            width: "300px",
            borderBlockColor: "#7A4AFB",
            borderBlockEndColor: "#7A4AFB",
            borderLeftColor: "#7A4AFB",
            borderRightColor: "#7A4AFB",
            marginRight: "1rem",
          }}
        />
      </div>
      <div className="table-responsive">
        <table className={`table table-striped ${styles.dataTable}`}>
          <thead className={styles.thead}>
            <tr>
              <th>Name</th>
              <th>Month</th>
              <th>Year</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={`${item.ext_code}_${index}`}>
                <td>{item.name}</td>
                <td>{item.month}</td>
                <td>{item.year}</td>
                <td>{item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Plain Bootstrap Pagination */}
      <nav aria-label="Page navigation example">
        <ul className="pagination" style={{ float: "right" }}>
          <li className={`page-item ${currentPage === 0 && "disabled"}`}>
            <button
              className="page-link"
              onClick={() => handlePageClick(currentPage - 1)}
            >
              Previous
            </button>
          </li>
          {[...Array(pageCount).keys()].map((page) => {
            if (
              pageCount <= 7 ||
              (page >= currentPage - 2 && page <= currentPage + 2)
            ) {
              return (
                <li
                  key={page}
                  className={`page-item ${currentPage === page && "active"}`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageClick(page)}
                  >
                    {page + 1}
                  </button>
                </li>
              );
            } else if (
              (currentPage < 5 && page === 5) ||
              (currentPage >= pageCount - 5 && page === pageCount - 6)
            ) {
              return (
                <li key={page} className={`page-item disabled`}>
                  <button className="page-link" disabled>
                    ...
                  </button>
                </li>
              );
            }
            return null;
          })}
          <li
            className={`page-item ${
              currentPage === pageCount - 1 && "disabled"
            }`}
          >
            <button
              className="page-link"
              onClick={() => handlePageClick(currentPage + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>

      {/* Salary Modal */}

      <div
        className="modal fade"
        id="salaryModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Modal title
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="row" style={{ marginTop: "10px" }}>
                  <div className="col-md-6 d-flex align-items-start">
                    <label
                      htmlFor="month"
                      style={{ marginTop: "5px", fontWeight: "bold" }}
                    >
                      Month:
                    </label>
                    <select
                      id="month"
                      className={`form-select`}
                      onChange={(e) => handleMonthChange(e.target.value)}
                      style={{ width: "10rem" }}
                    >
                      <option value="">Select Month</option>
                      <option value="1">January</option>
                      <option value="2">February</option>
                      <option value="3">March</option>
                      <option value="4">April</option>
                      <option value="5">May</option>
                      <option value="6">June</option>
                      <option value="7">July</option>
                      <option value="8">August</option>
                      <option value="9">September</option>
                      <option value="10">October</option>
                      <option value="11">November</option>
                      <option value="12">December</option>
                    </select>
                  </div>

                  <div className="col-md-6 d-flex align-items-start">
                    <label
                      htmlFor="year"
                      style={{ marginTop: "5px", fontWeight: "bold" }}
                    >
                      Year:
                    </label>
                    <input
                      type="number"
                      id="year"
                      className={`form-control `}
                      placeholder="Enter a Year..."
                      style={{ width: "10rem" }}
                      onChange={(e) => {
                        setYear(e.target.value);
                      }}
                    />
                  </div>
                </div>

                <div className="modal-body">
                  <div className="row">
                    <label
                      htmlFor="fileInput"
                      className="form-label"
                      style={{ fontWeight: "bold" }}
                    >
                      Choose a CSV file:
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="fileInput"
                      onChange={handleFileChange}
                    />
                  </div>
                  <div style={{ color: "red" }}>
                    The file must be in CSV format with columns labeled as
                    'ext_name', 'month', 'year', and 'amount' respectively.
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleUpload}
                data-bs-dismiss="modal"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalaryUpload;
