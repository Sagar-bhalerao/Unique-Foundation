import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const EditMemberModal = ({ showModal, handleClose, memberdata, onSave }) => {
  const [memberData, setMemberData] = useState(memberdata);

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

  const handleChange = (statusId, newStatus) => {
    const updatedMemberData = memberData.map(member => {
      if (member.id === statusId) {
        return { ...member, status: newStatus };
      }
      return member;
    });
 
    setMemberData(updatedMemberData);
    console.log(`Status changed for member with ID ${statusId} to:`, newStatus);
  };

  const handledojChange = (dojID,newDoj) => {
    const updatedoj = memberData.map(member=>{
      if(member.id === dojID){
        return {...member, doj: newDoj}
      }
      return member
    });
    setMemberData(updatedoj);
  };

  const handleSaveChanges = () => {
    memberData.forEach(member => {
      let body = {
        status: member.status,
        doj: member.doj
      };
     
      axios.put(`http://192.168.179.23:5002/update-member/${member.id}`, body) // Send body directly here
        .then(response => {
          if (response.status === 200) {
            toast.success('Member Updated Successfully..!');
            onSave(memberData); // Trigger parent component re-render
          } else {
            throw new Error('Failed to update status');
          }
        })
        .catch(error => {
          console.error('Error updating status:', error);
        });
    });
  };
  


  return (
    <div className={`modal fade show ${showModal ? "show" : ""}`} id="exampleModal" style={{ display: showModal ? "block" : "none" }}>
    <div className="modal-dialog modal-dialog-centered modal-md">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">Edit Member</h5>
          <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button>
        </div>
        <div className="modal-body">
           {/* <h2 className="mb-4">Member Form</h2> */}
           
           <br />
            <form>
              {memberData.map((item, index) => (
                <div key={index} className="row mb-4">
                  {/* Labels */}
                  <div className="col-md-6">
                    <div className="d-flex align-items-center">
                      <label htmlFor={`name-${index}`} style={{width:"40px"}} className="form-label me-3">Name:</label>
                      <input type="text" className="form-control" id={`name-${index}`} name={`name-${index}`} value={item.name} readOnly />
                    </div>
                    <div className="d-flex align-items-center mt-3"a>
                      <label htmlFor={`dob-${index}`} className="form-label me-3">DOB:</label>
                      <input type="date" className="form-control" id={`dob-${index}`} name={`dob-${index}`} value={formatDate(item.dob)} readOnly />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex align-items-center">
                      <label htmlFor={`status-${index}`}  style={{width:"40px"}}  className="form-label me-3">Status:</label>
                      <select className="form-select" id={`status-${index}`} name={`status-${index}`} value={item.status} onChange={(e) => handleChange(item.id, e.target.value)}>
                        <option value="A">Active</option>
                        <option value="I">Inactive</option>
                      </select>
                    </div>
                    <div className="d-flex align-items-center mt-3">
                      <label htmlFor={`doj-${index}`}  style={{width:"50px"}}  className="form-label me-3">DOJ:</label>
                      <input type="date" className="form-control" id={`doj-${index}`} name={`doj-${index}`} value={formatDate(item.doj)} onChange={(e)=>handledojChange(item.id,e.target.value)} />
                    </div>
                  </div>
                </div>
              ))}
            </form>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-danger" onClick={handleClose}>Close</button>
          <button type="button" className="btn btn-primary" onClick={handleSaveChanges}>Save Changes</button>
        </div>
      </div>
    </div>
  </div>
  );
};

export default EditMemberModal;
