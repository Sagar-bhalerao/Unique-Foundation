
import axios from "axios";
import React,{useState,useEffect} from "react";
const ViewMemberModal = ({ showModal, handleClose, memberdata }) => {
    const [memberDetails, setMemberDetails] = useState({
        name: "",
        id: "",
        dob: "",
        doj: "",
        address: "",
        city: "",
        pin: "",
        email: "",
        mobile: "",
        aadhar: "",
        pan: "",
        status: "",
        external_code:"",
      });
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
        if (showModal && memberdata && memberdata.length > 0) {
        // api fething when the modal true
          fetchMemberDetails(memberdata[0].id); // Assuming the memberdata contains an ID
        }
      }, [showModal, memberdata]);
    
      const fetchMemberDetails = async (memberId) => {
        try {
            const response = await axios.get(`http://192.168.179.23:5002/members-view/${memberId}`);
            if (response.status === 200) {
                const memberDetailsData = response.data;
                setMemberDetails(memberDetailsData);
            } else {
                console.error("Failed to fetch member details");
            }
        } catch (error) {
            console.error("Error fetching member details:", error);
        }
    };

  return (
    <div className={`modal ${showModal ? "show" : ""}`} id="ViewModal" style={{ display: showModal ? "block" : "none" }}>
      <div className="modal-dialog modal-md">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">View Member</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button>
          </div>
          <div className="modal-body">
            <h2 className="mb-4">Member Form</h2>
            <form>
        <div className="row">
          <div className="col-md-8 mb-3 d-flex align-items-start">
            <label
              htmlFor="name"
              className="form-label mr-2 align-self-start"
              style={{ width: "90px" }}
            >
              Name:
            </label>

            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              style={{ width: "100%" }}
              placeholder="Enter Your Name..."
              value={memberDetails.name}
              readOnly
            />           
          </div>
          <div className="col-md-4 mb-3 d-flex align-items-start">
            <label
              htmlFor="id"
              className="form-label align-self-start"
              style={{ width: "50px" }}
            >
              ID:
            </label>
            <input
              type="number"
              className="form-control"
              id="id"
              name="id"
              style={{ width: "100%" }}
              placeholder="Enter Your ID..."   
              value={memberDetails.id}
                readOnly        
            />
           
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-md-6 mb-3 d-flex align-items-start">
            <label
              htmlFor="dob"
              className="form-label align-self-start"
              style={{ width: "100px" }}
            >
              DOB:
            </label>
            <input
              type="date"
              className="form-control"
              id="dob"
              name="dob"
              style={{ width: "100%" }}
            //   value={memberDetails.dob}
              value={formatDate(memberDetails.dob)}
                readOnly
            />
           
          </div>
          <div className="col-md-6 d-flex align-items-start">
            <label
              htmlFor="doj"
              className="form-label align-self-start"
              style={{ width: "100px" }}
            >
              DOJ:
            </label>
            <input
              type="date"
              className="form-control"
              id="doj"
              name="doj"
              style={{ width: "100%" }} 
              value={formatDate(memberDetails.doj)}
                readOnly            
            />
            
          </div>
        </div>
        <div className="row mb-3" style={{ marginTop: "-19px" }}>
          <div className="col-md-12 mb-2 mb-md-0 d-flex align-items-start">
            <label
              htmlFor="address"
              className="form-label align-self-start"
              style={{ width: "70px" }}
            >
              Address:
            </label>
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              style={{ width: "100%" }}
              placeholder="Enter Your Address..."   
              value={memberDetails.address}
                readOnly         
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6 mb-4 mb-md-0 d-flex align-items-start">
            <label
              htmlFor="city"
              className="form-label align-self-start"
              style={{ width: "100px" }}
            >
              City:
            </label>
            <input
              type="text"
              className="form-control"
              id="city"
              name="city"
              style={{ width: "100%" }}
              placeholder="Enter Your City..."  
              value={memberDetails.city}
                readOnly           
            />
          </div>
          <div className="col-md-6 d-flex align-items-start">
            <label
              htmlFor="pin"
              className="form-label align-self-start"
              style={{ width: "100px" }}
            >
              PIN:
            </label>
            <input
              type="number"
              className="form-control"
              id="pin"
              name="pin"
              style={{ width: "100%" }}
              placeholder="Enter Your Pin..." 
              value={memberDetails.pin}
                readOnly       
            />           
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6 mb-4 mb-md-0 d-flex align-items-start">
            <label
              htmlFor="email"
              className="form-label align-self-start"
              style={{ width: "100px" }}
            >
              Email:
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              style={{ width: "100%" }}
              placeholder="Enter Your Email..."    
              value={memberDetails.email}
                readOnly         
            />
           
          </div>
          <div className="col-md-6 d-flex align-items-start mobileHandling">
            <label
              htmlFor="mobile"
              className="form-label align-self-start"
              style={{ width: "68px" }}
            >
              Mobile:
            </label>
            <input
              type="number"
              className="form-control"
              id="mobile"
              name="mobile"
              style={{ width: "155px" }}
              placeholder="Enter Your Number..."   
              value={memberDetails.mobile}
                readOnly           
            />
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-md-6 mb-4 mb-md-0 d-flex align-items-start">
            <label
              htmlFor="aadhar"
              className="form-label align-self-start"
              style={{ width: "90px" }}
            >
              Aadhar:
            </label>
            <input
              type="text"
              className="form-control"
              id="aadhar"
              name="aadhar"
              style={{ width: "100%" }}
              placeholder="Enter Aadhar No..."   
              value={memberDetails.aadhar}
                readOnly           
            />           
          </div>
          <div className="col-md-6 mb-4 mb-md-0 d-flex align-items-start">
            <label
              htmlFor="pan"
              className="form-label align-self-start"
              style={{ width: "100px" }}
            >
              PAN No:
            </label>
            <input
              type="text"
              className="form-control"
              id="pan"
              name="pan"
              style={{ width: "100%" }}
              placeholder="Enter PAN No..."   
              value={memberDetails.pan}
                readOnly          
            />           
          </div>
        </div>
        <div className="row" style={{ marginTop: "-30px" }}>
          <div className="col-md-6 mb-4 mb-md-0 d-flex align-items-start">
            <label
              htmlFor="status"
              className="form-label align-self-start"
              style={{ width: "100px" }}
            >
              Status:
            </label>
            <select className={`form-select ${memberDetails.status === 'I' ? 'text-danger' : 'text-success'}`} id="status" name="status" style={{ width: "100%" }} value={memberDetails.status} readOnly>
                    <option value="">Select Status</option>
                    <option value="A">Active</option>
                    <option value="I">Inactive</option>
                  </select>            
          </div>
          <div className="col-md-6 mb-3 d-flex align-items-start">
            <label htmlFor="external_code" className="form-label align-self-start" style={{ width: "95px" }}>
            Code:
            </label>
            <input
              type="text"
              className="form-control"
              id="external_code"
              name="external_code"
              style={{ width: "100%" }}
              placeholder="External Code..."           
              value={memberDetails.external_code}
              readOnly
            />        
          </div>
        </div>
         
      </form>
          </div>
          <div className="modal-footer">
          <button type="button" style={{marginLeft:"400px" }} className="btn btn-danger" onClick={handleClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );

  
};

export default ViewMemberModal;
