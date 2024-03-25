import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
// import { groupTableContext } from "../../../context/context";

const AccountCreateGroupModal = ({ closeModal }) => {
  const [isMainGroupModalOpen, setIsMainGroupModalOpen] = useState(false);
  const [accountName, setAccountName] = useState(""); //accountName payload
  const [groupData, setGroupData] = useState([]);
  const [selectedViewGroupName,setselectedViewGroupName] = useState("") //payload
  const [selectedViewGroupID,setselectedViewGroupID] = useState("") //payload
  const [status,setStaus] = useState('') //payload
  useEffect(() => {
    fetchGroupData();
  }, []);


   // fetch group view data
  const fetchGroupData = async () => {
    try {
      const response = await axios.get("http://192.168.179.23:5002/group-view");
      if (response.status === 200) {
        setGroupData(response.data);
      } else {
        console.log("Failed to fetch group data");
      }
    } catch (error) {
      console.error("Error fetching group data:", error);
    }
  };
  // const TableViewData  = useContext(groupTableContext);

  // setGroupData(TableViewData);
  const openMainGroupModal = () => {
    setIsMainGroupModalOpen(true);
  };

  const closeMainGroupModal = () => {
    setIsMainGroupModalOpen(false);
  };

  const handleSelectGroup = (groupId, groupName) => {
    console.log("Selected group:", groupId, groupName);
    setselectedViewGroupName(groupName);
    setselectedViewGroupID(groupId)
   
    closeMainGroupModal();
  };

  const handleAccountNameChange = (e) => {
    setAccountName(e.target.value);
  };
   
  const addAccount = async () => {
    try {
        let body = {
           group_id:selectedViewGroupID,
           name:accountName,
           status:status,

        };
        console.log(body);
        const response = await axios.post("http://192.168.179.23:5002/account-add",
          body
        );
        if(response.status === 200){
          toast.success("Account Created Successfully")
        }
        console.log("add-account api responce",response)
    
      console.log("Account name:", accountName);
 
      // Add account logic here, including status
      closeModal();
      
    } catch (error) {
      console.error("Error adding account:", error);
    }
  };

  return (
    <>
      {/* Main modal */}
      <div className="modal fade show" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: "block" }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Create Account</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal}></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="accountName" className="form-label">Account Name :</label>
                  <input type="text" className="form-control" id="accountName" placeholder="Enter Account name" value={accountName} onChange={handleAccountNameChange} />
                </div>
                <div className="mb-3">
                      <label htmlFor={`status`}  style={{width:"40px"}}  className="form-label me-3">Status:</label>
                      <select className="form-select" id={`status`} name={`status`} value={status}  onChange={(e)=> setStaus(e.target.value)}>
                      <option value="">Select Status</option>
                        <option value="A">Active</option>
                        <option value="I">Inactive</option>
                      </select>
                    </div>
                <div className="mb-3">
                  <label htmlFor="mainGroup" className="form-label">Group :</label>
                  <div className="input-group">
                    <input type="text" className="form-control" id="mainGroup" value = {selectedViewGroupName} placeholder="Select group" readOnly />
                    <button className="btn btn-outline-secondary" type="button" onClick={openMainGroupModal}>Select</button>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
              <button onClick={addAccount} disabled={!accountName} type="button" className="btn btn-primary">Add Account</button>
            </div>
          </div>
        </div>
      </div>
       
      <div className="modal-backdrop fade show"></div>
      {/* Main group selection modal */}
      {isMainGroupModalOpen && (
        <div className="modal fade show" id="mainGroupModal" tabIndex="-1" aria-labelledby="mainGroupModalLabel" aria-hidden="true" style={{ display: "block" }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Select Main Group</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeMainGroupModal}></button>
              </div>
              <div className="modal-body">
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead className="text-center">
                      <tr>
                        <th>ID</th>
                        <th>Group Name</th>
                        <th>Select</th>
                      </tr> 
                    </thead>
                    <tbody className="text-center">
                      {groupData.map((group) => (
                        <tr key={group.id}>
                          <td>{group.id}</td>
                          <td>{group.group_name}</td>
                          <td>
                            <button className={`btn btn-primary`} onClick={() => handleSelectGroup(group.id, group.group_name)}>Select</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeMainGroupModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AccountCreateGroupModal;
