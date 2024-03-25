import { Link } from "react-router-dom";
import styles from "./VoucherView.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FaUserEdit } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

const VoucherEntryView = () => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://192.168.179.23:5002/voucher-view");
        if (response.status === 200) {
          setData(response.data);
        } else {
          console.log("Failed to fetch data");
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.table}>
      <h2>Voucher Entry</h2>
      <div className={`d-flex justify-content-between align-items-center mb-3 ${styles.header}`}>
        <Link to="/VoucherEntry" className={`btn btn-primary mb-3 ${styles.addButton}`}>Add Voucher</Link>
        <label
          htmlFor="search"
          style={{ fontWeight: "bold", marginLeft: "50rem", marginTop: "-20px" }}
        >
          Search:
        </label>
        <input
          type="text"
          className={`form-control ${styles.searchInput}`}
          placeholder="Search by name..."
          style={{
            width: "300px", borderBlockColor: "#7A4AFB",
            borderBlockEndColor: "#7A4AFB",
            borderLeftColor: "#7A4AFB",
            borderRightColor: "#7A4AFB",
            marginRight: "1rem",
            marginTop: "-13px"
          }}
        />
      </div>
      <div className="table-responsive">
        <table className={`table table-striped ${styles.dataTable}`}>
          <thead className={styles.thead}>
            <tr>
              <th>Voucher no</th>
              <th>Voucher date</th>
              <th>Voucher Type</th>
              <th>Voucher Amount</th>              
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item,index)=>(
              <tr key={index}>
                <td>{item.voucher_no}</td>
                <td>{moment(item.voucher_date).format("DD/MM/YYYY")}</td>
                <td>{item.voucher_type}</td>
                <td>{item.voucher_amount}</td>
                        
                <td>
                  <button className={`btn btn-primary ${styles.editButton}`} data-bs-toggle="modal" data-bs-target="#editModal">
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button className={`btn btn-success ${styles.viewButton}`} data-bs-toggle="modal" data-bs-target="#viewModal">
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                </td>
              </tr>
   ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VoucherEntryView;
