import React, { useState,useContext } from "react";
import axios from "axios";
import { groupTableContext } from "../../../context/context";
import { toast } from "react-toastify";
const CreateGroupModal = ({ closeModal, groupData }) => {
  const tableDataContex = useContext(groupTableContext);
  console.log(tableDataContex);


  const [isMainGroupModalOpen, setIsMainGroupModalOpen] = useState(false);
  const [groupName, setGroupName] = useState("");
  // const [checkedGroupId, setCheckedGroupId] = useState(null);
  const [selectedGroupName, setSelectedGroupName] = useState("");
  const [selectedGroupId, setSelectedGroupId] = useState("");

  const openMainGroupModal = () => {
    setIsMainGroupModalOpen(true);
  };

  const closeMainGroupModal = () => {
    setIsMainGroupModalOpen(false);
  };

  const groupNameHandler = (e) => {
    setGroupName(e.target.value);
  };

  const handleSelectGroup = (id, name) => {
    // setCheckedGroupId(id);
    setSelectedGroupName(name); // SubGroup Name
    setSelectedGroupId(id); // Main Group ID 
    console.log(id);
    closeMainGroupModal();
  };
   
  const addGroup = async () => {
    try {
      let body = {
        group_Id: selectedGroupId,
        group_name: groupName,
        main_group: selectedGroupId,
      };
      console.log(body);
       
        const response = await axios.post(
          `http://192.168.179.23:5002/group-add`,
          body
        );
        if(response.status === 200){
          toast.success("Group Added Successfully")
        }

        console.log("Response from group-add API:", response);
      

      closeModal();
    } catch (error) {
      console.error("Error adding group:", error);
    }
  };
   
  return (
    <>
      {/* Main modal */}
      <div
        className="modal fade show"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        style={{ display: "block" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Create Group</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={closeModal}
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                <label htmlFor="groupName" className="form-label" style={{ position: "relative" }}>
  Group Name
  {groupName === "" && (
    <span style={{ color: "red", marginLeft: "4px", position: "absolute", top: "0" }}>
      *
    </span>
  )}
</label>
                  <input
                    type="text"
                    className="form-control"
                    id="groupName"
                    placeholder="Enter group name"
                    onChange={groupNameHandler}
                    value={groupName}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="mainGroup" className="form-label">
                    Main Group
                  </label>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      id="mainGroup"
                      placeholder="Select main group"
                      value={selectedGroupName}
                      readOnly
                    />
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={openMainGroupModal}
                    >
                      Select
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={closeModal}
              >
                Close
              </button>
              <button
                onClick={addGroup}
                type="button"
                className="btn btn-primary"
                disabled={!groupName} 
              >
                Add group
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      <div className="modal-backdrop fade show"></div>

      {/* Main group selection modal */}
      {isMainGroupModalOpen && (
        <div
          className="modal fade show"
          id="mainGroupModal"
          tabIndex="-1"
          aria-labelledby="mainGroupModalLabel"
          aria-hidden="true"
          style={{ display: "block" }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Select Main Group</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={closeMainGroupModal}
                ></button>
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
                      {/* main group table data */}
                      {groupData.map((group) => (
                        <tr key={group.id}>
                          <td>{group.id}</td>
                          <td>{group.group_name}</td>
                          <td>
                            <button
                              className={`btn btn-primary`}
                              onClick={() =>
                                handleSelectGroup(group.id, group.group_name)
                              }
                            >
                              Select
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeMainGroupModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateGroupModal;
