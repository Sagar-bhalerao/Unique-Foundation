import axios from "axios";
import styles from "./ApplicationView.module.css";
import { Link } from "react-router-dom";
import { useEffect, useState,useCallback } from "react";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

const ApplicationView = () => {
  const [data, setData] = useState([]);
  const [amount,setAmount] = useState(Number)
  const [post ,setpost] = useState("")
  const [editedMember, setEditedMember] = useState([]);
  const [viewedApplication, setViewedApplication] = useState([]);


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    if (month < 10) {
      month = '0' + month;
    }
    if (day < 10) {
      day = '0' + day;
    }
    return `${year}-${month}-${day}`;
  };
  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://192.168.179.23:5002/application-view"
        );
        if (response.status === 200) {
          setData(response.data);
        } else {
          console.log("something went wrong");
        }
      } catch (error) {
        console.log(`failed to fetch data ${error}`);
      }
    };
    return () =>fetchData();
  }, []);
  //filter the id
  const handleEdit = useCallback((memberId) => {
    const selectedMember = data.find(item => item.app_no === memberId);
    setEditedMember([selectedMember]);
  }, [data]);
  const handleView = async (appId) => {
    try {
      const response = await axios.get(
        `http://192.168.179.23:5002/application-view/${appId}`
      );
      if (response.status === 200) {
        setViewedApplication([response.data]);
      } else {
        toast.error("Failed to fetch data");
        console.log("something went wrong");
      }
    } catch (error) {
      console.log(`failed to fetch application ${error}`);
    }
  };
 
  const handleSaveChanges = async () => {
    try {
      // Extract the app_no from the first edited member (assuming there's only one)
      const memberId = editedMember[0].app_no;
      const updatedData = {
        post: post,
        post_amount: amount
      };
      console.log(updatedData);
      // Send a PUT request to update the application with memberId
      const response = await axios.put(`http://192.168.179.23:5002/update-application/${memberId}`, updatedData);
        if(response.status == 200){
          toast.success("Data updated successfully:")
           
        }
      console.log("Data updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <>
      <div className={styles.table}>
        <h2>Application Data</h2>
        <div className={`d-flex justify-content-between align-items-center mb-3 ${styles.header}`}>
          <Link to="/Application-form" className={`btn btn-primary mb-3 ${styles.addButton}`}>Add Application</Link>
          <label
            htmlFor="search"
            style={{ fontWeight: "bold", marginLeft: "50rem",marginTop:"-20px" }}
          >
            Search:
          </label>
          <input
            type="text"
            className={`form-control ${styles.searchInput}`}
            placeholder="Search by name..."
            style={{ width: "300px",borderBlockColor: "#7A4AFB",
            borderBlockEndColor: "#7A4AFB",
            borderLeftColor: "#7A4AFB",
            borderRightColor: "#7A4AFB",
            marginRight: "1rem",
          marginTop:"-13px" }}
          />
        </div>
        <div className="table-responsive">
          <table className={`table table-striped ${styles.dataTable}`}>
            <thead className={styles.thead}>
              <tr>
                <th>APP ID</th>
                <th>App Date</th>
                <th>Member</th>
                <th>From-date</th>  
                <th>To-date</th>
                <th>Amount</th>
                <th>Disease</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.app_no}>
                  <td>{item.app_no}</td>
                  <td>{moment(item.app_date).format("DD/MM/YYYY")}</td>
                  <td>{item.mem_id}</td>
                  <td>{moment(item.from_date).format("DD/MM/YYYY")}</td>
                  <td>{moment(item.to_date).format("DD/MM/YYYY")}</td>
                  <td>{item.amount}</td>
                  <td>{item.disease}</td>
                  <td>
                    <button className={`btn btn-primary ${styles.editButton}`} data-bs-toggle="modal" data-bs-target="#editModal" onClick={() => handleEdit(item.app_no)}>
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button className={`btn btn-success ${styles.viewButton}`} data-bs-toggle="modal" data-bs-target="#viewModal" onClick={()=> handleView(item.app_no)}>
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={styles.pagination}></div>
        </div>
      </div>     

     {/*  edit modal */}
      <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Application</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      {editedMember.map((item,index)=>(
        <form key={index}>     
        <div className="container1" style={{ maxWidth: "750px", fontFamily: "'Calibri', sans-serif" }}>
               <div className="row">
                 <div className="col-md-6 mb-3 d-flex align-items-start">
                   <label htmlFor="member" className="form-label" style={{ width: "94px", }}>
                     Member:
                   </label>
                   <div className="input-group">
                     <input
                       type="text"
                       className="form-control"
                       id="member"
                       placeholder="Select member group"
                       style={{ width: "100%" }}
                       value={item.mem_id}
                       readOnly
                     />
                   </div>
                 </div>
                 <div className="col-md-6 mb-3 d-flex align-items-start">
                   <label htmlFor="appdate" className="form-label align-self-start" style={{ width: "6rem" }}>
                     Date:
                   </label>
                   <input
                     type="date"
                     className="form-control"
                     id="appdate"
                     name="appdate"
                     style={{ width: "100%" }}
                     value={formatDate(item.app_date)}
                     readOnly
                   />
                 </div>
               </div>
               <div className="row">
                 <div className="col-md-6 mb-3 d-flex align-items-start">
                   <label htmlFor="fromdate" className="form-label align-self-start" style={{ width: "100px" }}>
                     From:
                   </label>
                   <input
                     type="date"
                     className="form-control"
                     id="fromdate"
                     name="fromdate"
                     style={{ width: "100%" }}
                     value={formatDate(item.from_date)}
                     readOnly
                   />
                 </div>
                 <div className="col-md-6 mb-3 d-flex align-items-start">
                   <label htmlFor="todate" className="form-label align-self-start" style={{ width: "95px" }}>
                     To:
                   </label>
                   <input
                     type="date"
                     className="form-control"
                     id="todate"
                     name="todate"
                     style={{ width: "100%" }}
                     value={formatDate(item.to_date)}
                     readOnly
                   />
                 </div>
               </div>
               <div className="row">
                 <div className="col-md-6 mb-4 mb-md-0 d-flex align-items-start">
                   <label
                     htmlFor="status"
                     className="form-label align-self-start"
                     style={{ width: "100px" }}
                   >
                     Post:
                   </label>
                   <select className={`form-select `} id="status" name="status" style={{ width: "100%" }} value={post} onChange={(e)=>setpost(e.target.value)} >
                     <option value="">Select Post</option>
                     <option value="P">Post</option>
                     <option value="R">Reject</option>
                   </select>
                 </div>
                 <div className="col-md-6 mb-3 d-flex align-items-start">
                   <label htmlFor="postAmount" className="form-label align-self-start">
                     Amount:
                   </label>
                   <input
                     type="number"
                     className="form-control"
                     id="postAmount"
                     name="postAmount"
                     style={{ width: "100%" }}
                     onChange={(e)=>{setAmount(e.target.value)}}
                     value={amount}
                   />
                 </div>
               </div>
             </div>
           
         </form>
      ))}
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary " data-bs-dismiss="modal" aria-label="Close" onClick={handleSaveChanges}>Save changes</button>
      </div>
    </div>
  </div>
</div>




    {/* view modal */}
<div className="modal fade" id="viewModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">View Application</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      
     {viewedApplication.map((item,index)=>(   <form key={index}  style={{ fontFamily: "'Calibri', sans-serif"}}>
        <div className="row">
            <div className="col-md-6 mb-3 d-flex align-items-start">
                <label htmlFor="appdate" className="form-label align-self-start" style={{ width: "100px" }} >
                   Date:
                </label>
                <input
                    type="date"
                    className="form-control"
                    id="appdate"
                    name="appdate"
                    style={{ width: "100%" }}                          
                    value={formatDate(item.app_date)}
                    readOnly
                />                     
            </div>
        </div>

        <div className="row">
            <div className="col-md-6 mb-3 d-flex align-items-start">
                <label htmlFor="member" className="form-label " style={{ width: "94px" }}>
                    Member:
                </label>
                <div className="input-group">
                <input
               type="text"
               className="form-control"
               id="member"
               placeholder="Select member group"  
          value={item.mem_id}               
          readOnly
          // defaultValue={item.mem_id}
        />                                      
        </div>
               
            </div>
            <div className="col-md-6 mb-4 mb-md-0 d-flex align-items-start">
                <label
                    htmlFor="relation"
                    className="form-label align-self-start"
                    style={{ width: "100px", marginTop: "4px" }}
                
                >
                    Relation:
                </label>
                <input
          type="text"
          className="form-control"
          id="member"
          placeholder="Select member group"  
          value={item.relation}               
          readOnly
        />    
            </div>
        </div>

        <div className="row">
            <div className="col-md-6 mb-3 d-flex align-items-start">
                <label htmlFor="lastName" className="form-label align-self-start" style={{ width: "95px",  }}>
                    From :
                </label>
                <input
                    type="date"
                    className="form-control"
                    id="fromdate"
                    name="fromdate"
                    style={{ width: "100%" }}
                    readOnly
                    value={formatDate(item.from_date)}
                />
            
            </div>
            <div className="col-md-6 d-flex align-items-start">
                <label htmlFor="lastName" className="form-label align-self-start" style={{ width: "95px", marginTop: "4px" }}>
                    To date:
                </label>
                <input
                    type="date"
                    className="form-control"
                    id="todate"
                    name="todate"
                    style={{ width: "100%" }} 
                    readOnly 
                    value={formatDate(item.to_date) }                         
                />
                
            </div>
        </div>
        <div className="row" >
            <div className="col-md-6 mb-3 d-flex align-items-start">
                <label htmlFor="disease" className="form-label align-self-start" style={{ width: "95px", }}>
                    Disease:
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="disease"
                    name="disease"
                    style={{ width: "100%" }}
                    placeholder="Enter Disease ..."   
                    value={item.disease}    
                    readOnly                    
                />
               
            </div>
            <div className="col-md-6 d-flex align-items-start">
                <label htmlFor="amount" className="form-label align-self-start" style={{ width: "95px", marginTop: "-3px" }}>
                    Amount:
                </label>
                <input
                    type="number"
                    className="form-control"
                    id="amount"
                    name="amount"
                    style={{ width: "100%" }}                                    
                    value={item.amount}
                    readOnly
                />
                 
            </div>
        </div>

        <div className="row">
            <div className="col-md-6 mb-3 d-flex align-items-start">
                <label htmlFor="ext_name" className="form-label align-self-start" style={{ width: "95px", marginTop: "3px" }}>
                    AnyHelp:
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="ext_name"
                    name="ext_name"
                    style={{ width: "100%" }}
                    placeholder="Any Other Help ..." 
                    value={item.ext_name}   
                    readOnly                      
                />
             
            </div>
            <div className="col-md-6 d-flex align-items-start">
                <label htmlFor="ext_amount" className="form-label align-self-start" style={{ width: "95px", }}>
                    Amount:
                </label>
                <input
                    type="number"
                    className="form-control"
                    id="ext_amount"
                    name="ext_amount"
                    style={{ width: "100%" }}                       
                    value={item.ext_amount}    
                    readOnly                 
                />
                
            </div>
        </div>
        <div className="row">
              <div className="col-md-6 mb-4 mb-md-0 d-flex align-items-start">
                <label
                  htmlFor="status"
                  className="form-label align-self-start"
                  style={{ width: "100px" }}
                >
                  Post:
                </label>
                <select className={`form-select`} id="post" name="post" style={{ width: "100%" }} value={item.post}  readOnly >
                  <option value="">Select Post</option>
                  <option value="P">Post</option>
                  <option value="R">Reject</option>
                  
                </select>
              </div>
              <div className="col-md-6 mb-3 d-flex align-items-start">
                <label htmlFor="postAmount" className="form-label align-self-start">
                  Amount:
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="postAmount"
                  name="postAmount"
                  style={{ width: "100%" }}
                  value={item.post_amount}
                  readOnly
                />
              </div>
            </div>
     
        <div className="row">
            <div className="col-md-6 mb-3 d-flex align-items-start">
                <label htmlFor="remark" className="form-label align-self-start" style={{ width: "95px", marginTop: "14px" }}>
                Remark:
                </label>
                <textarea
                    type="text"
                    className="form-control"
                    id="remark"
                    name="remark"
                    style={{ width: "100%" }}
                    placeholder="Remark..."   
                    value={item.remark}  
                    readOnly                       
                />
                  
            </div>
        </div>  
    </form>))}
      
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
       
      </div>
    </div>
  </div>
</div>



    </>
  );
};

export default ApplicationView;
