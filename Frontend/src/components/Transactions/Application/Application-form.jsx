import React, { useState } from 'react';
import { useFormik } from 'formik';
import {  useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import { useData } from '../../../context/memberDatacontext';
import { toast } from 'react-toastify';
const Application = () => {

  const [searchQuery,setsearachQuery] = useState('');
  const [selectedMemberName , setSelectedMemberName] = useState(null)
  const [selectedMemberID , setSelectedMemberID] = useState(null)
   const {data} = useData();
  //  console.log(data);
      const navigate = useNavigate();
      const [currentPage, setCurrentPage] = useState(0);
      const [itemsPerPage] = useState(25); 
    
      const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
      };
    
      const indexOfLastItem = (currentPage + 1) * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const filteredData = data.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(indexOfFirstItem, indexOfLastItem);
    

    //  const FilterdData = data.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
     
    const formik = useFormik({
        initialValues: {
            appdate: '',
            member: '',
            relation: '',
            fromdate: '',
            todate: '',
            disease: '',
            amount: '',
            ext_name: '',
            ext_amount: '',
            remark: '',
           
        },
        validationSchema: Yup.object({
          appdate: Yup.date().required('Field required...'),      
          member: Yup.string().required('Field required...'),
          relation: Yup.string().required('Select Relationship..'),
          fromdate: Yup.date().required('Field required...'),
          todate: Yup.date().required('Field required...'),
      
          disease: Yup.string()
              .trim()
              .matches(/^[^\s]+(\s[^\s]+)*$/, 'White Space Not Allowed')
              .required('Field required...'),
      
          amount: Yup.number().required('Field required...'),
      
          ext_name: Yup.string()
              .trim()
              .matches(/^[^\s]+(\s[^\s]+)*$/, 'White Space Not Allowed')
              .required('Field required...'),
      
          ext_amount: Yup.number().required('Field required...'),
      
          remark: Yup.string()
              .trim()
              .matches(/^[^\s]+(\s[^\s]+)*$/, 'White Space Not Allowed')
              .required('Field required...'),
      
            }),

    
          });
     const submitHandler = async(values)=>{
      // Prepare the body for the request
      let body = {
        app_no: null,
        app_date: values.appdate,
        mem_id: selectedMemberID,
        relation: values.relation,
        from_date: values.fromdate,
        to_date: values.todate,
        disease: values.disease,
        amount: values.amount,
        ext_name: values.ext_name,
        ext_amount: values.ext_amount,
        remark: values.remark,
       
    };
    console.log(body);
    try {
        // Sending the request
        const response = await axios.post("http://192.168.179.23:5002/application", body);
        console.log("Server response:", response.data);
        toast.success("Data inserted Successfully!...")
        navigate('/ApplicationView');
    } catch (error) {
        console.log("Error:", error);
    }
     }
    //  const selectMemeberModal = ()=> {
    //     setSelectMemberModal(true)
    //  }
     const handleSelectMemberName = (memberID,memberName) => {
      setSelectedMemberName(memberName); // Set the selected member name
      setSelectedMemberID(memberID)
      formik.setFieldValue('member', memberName); // Set the member field in formik
      // setSelectMemberModal(false); // Close the modal
    };
    
  // const currnetDate = new Date().toISOString().split('T')[0];

    return (
        <>
        <div className="container" style={{ maxWidth: "750px", backgroundColor:" #CCCCCC", fontFamily: "'Calibri', sans-serif"}}>
            <h2> Application Details</h2>
            <form onSubmit={formik.handleSubmit} style={{ fontFamily: "'Calibri', sans-serif"}}>
                <div className="row">
                    <div className="col-md-4 mb-3 d-flex align-items-start">
                        <label htmlFor="appdate" className="form-label align-self-start" style={{ width: "8rem"}}>
                            App Date:
                        </label>
                        <input
                            type="date"
                            className="form-control"
                            id="appdate"
                            name="appdate"
                            style={{ width: "100%" }}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.appdate}

                        />
                        {/* {formik.touched.appdate && formik.errors.appdate && (
                            <div className="text-danger">{formik.errors.appdate}</div>
                        )} */}
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 mb-3 d-flex align-items-start">
                        <label htmlFor="member" className="form-label" style={{ width: "94px" }}>
                            Member:
                        </label>
                        <div className="input-group">
                        <input
                  type="text"
                  className="form-control"
                  id="member"
                  placeholder="Select member group"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.member}
                  readOnly
                />
                           
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                data-bs-toggle="modal" data-bs-target="#mainGroupModal"
                                data-bs-dismiss="modal"
                                // onClick = {selectMemeberModal}
                             >
                                Select
                            </button>
                            {formik.touched.member && formik.errors.member && (
                            <div className="text-danger">{formik.errors.member}</div>
                        )}
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
                        <select
                            className="form-select"
                            id="relation"
                            name="relation"
                            style={{ width: "100%" }}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.relation}

                        >
                             {formik.touched.relation && formik.errors.relation && (
                            <div className="text-danger">{formik.errors.relation}</div>
                        )}
                            <option >Select Relationship</option>
                            <option value="self">Self</option>
                            <option value="father">Father</option>
                            <option value="mother">Mother</option>
                            <option value="wife">Wife</option>
                            <option value="daughter">Daughter</option>
                            <option value="son">Son</option>

                        </select>

                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 mb-3 d-flex align-items-start">
                        <label htmlFor="lastName" className="form-label align-self-start" style={{ width: "95px", marginTop: "-12px" }}>
                            From Date:
                        </label>
                        <input
                            type="date"
                            className="form-control"
                            id="fromdate"
                            name="fromdate"
                            style={{ width: "100%" }}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.fromdate}

                        />
                          {formik.touched.fromdate && formik.errors.fromdate && (
                            <div className="text-danger">{formik.errors.fromdate}</div>
                        )}
                    </div>
                    <div className="col-md-6 d-flex align-items-start">
                        <label htmlFor="lastName" className="form-label align-self-start" style={{ width: "95px", marginTop: "4px" }}>
                            To Date:
                        </label>
                        <input
                            type="date"
                            className="form-control"
                            id="todate"
                            name="todate"
                            style={{ width: "100%" }}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.todate}

                        />
                          {formik.touched.todate && formik.errors.todate && (
                            <div className="text-danger">{formik.errors.todate}</div>
                        )}
                    </div>
                </div>

                <div className="row" style={{ marginTop: "-10" }}>
                    <div className="col-md-6 mb-3 d-flex align-items-start">
                        <label htmlFor="disease" className="form-label align-self-start" style={{ width: "95px" }}>
                            Disease:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="disease"
                            name="disease"
                            style={{ width: "100%" }}
                            placeholder="Enter Disease ..."
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.disease}
                        />
                          {formik.touched.disease && formik.errors.disease && (
                            <div className="text-danger">{formik.errors.disease}</div>
                        )}
                    </div>
                    <div className="col-md-6 d-flex align-items-start">
                        <label htmlFor="amount" className="form-label align-self-start" style={{ width: "95px", marginTop: "4px" }}>
                            Amount:
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            id="amount"
                            name="amount"
                            style={{ width: "100%" }}
                            placeholder="Enter Amount..."
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.amount}

                        />
                          {formik.touched.amount && formik.errors.amount && (
                            <div className="text-danger">{formik.errors.amount}</div>
                        )}
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 mb-3 d-flex align-items-start">
                        <label htmlFor="ext_name" className="form-label align-self-start" style={{ width: "95px", marginTop: "3px" }}>
                            Any Help:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="ext_name"
                            name="ext_name"
                            style={{ width: "100%" }}
                            placeholder="Any Other Help ..."
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.ext_name}
                        />
                          {formik.touched.ext_name && formik.errors.ext_name && (
                            <div className="text-danger">{formik.errors.ext_name}</div>
                        )}
                    </div>
                    <div className="col-md-6 d-flex align-items-start">
                        <label htmlFor="ext_amount" className="form-label align-self-start" style={{ width: "95px", marginTop: "-10px" }}>
                            Help Amount:
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            id="ext_amount"
                            name="ext_amount"
                            style={{ width: "100%" }}
                            placeholder="Enter Help Amount..."
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.ext_amount}

                        />
                          {formik.touched.ext_amount && formik.errors.ext_amount && (
                            <div className="text-danger">{formik.errors.ext_amount}</div>
                        )}
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
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.remark}
                        />
                          {formik.touched.remark && formik.errors.remark && (
                            <div className="text-danger">{formik.errors.remark}</div>
                        )}
                    </div>
                </div>

            
                <div className=" col-md-6  buttons" style={{ marginTop: "20px" }}>
                    <button type="submit" onClick={()=>submitHandler(formik.values)} className="btn btn-primary">
                        Submit
                    </button>
                    <button
                        type="reset"
                        className="btn btn-danger danger"
                        onClick={()=> navigate('/ApplicationView')}
                    >
                        Cancel
                    </button>
                </div>

            </form>

        </div> 
         {/* SelectMemberModal  */}           
     <div className="modal fade" id="mainGroupModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
       <div className="modal-dialog modal-dialog-scrollable">
         <div className="modal-content">
           <div className="modal-header">
             <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
             <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
           </div>
           <div className="modal-body">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by name"
                  value={searchQuery}
                  onChange={(e) => setsearachQuery(e.target.value)}
                />
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead className="text-center">
                      <tr>
                        <th>ID</th>
                        <th>Member Name</th>
                        <th>Select</th>
                      </tr>
                    </thead>
                    <tbody className="text-center">
                      {filteredData.map((item) => (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>{item.name}</td>
                          <td>
                            <button className={`btn btn-primary`}   data-bs-dismiss="modal" onClick={() => handleSelectMemberName(item.id, item.name)}>Select</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* Pagination */}
                <nav aria-label="Member pagination">
                  <ul className="pagination justify-content-center">
                    {[...Array(Math.ceil(data.length / itemsPerPage)).keys()].map((index) => (
                      <li key={index} className={`page-item ${index === currentPage ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => handlePageChange(index)}>{index + 1}</button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
         </div>
       </div>
     </div>
     
        </>         
    );
};

export default Application;
