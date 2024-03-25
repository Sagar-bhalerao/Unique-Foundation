import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {  Link, useNavigate } from "react-router-dom";
// import {toast} from "react-toastify"
import axios from "axios"
import "./Member.css";
import { toast } from "react-toastify";
const initialValues = {
  firstName: "",
  middleName: "",
  lastName: "",
  id: "",
  dob: "",
  doj: "",
  address: "", 
  city: "",
  pin: "",
  email: "",
  mobile: "",
  aadhar: "",
  pan:"",
  status:"",
  external_code:"",
};
const onSubmit = async (values, { resetForm, setSubmitting, navigate }) => {
  try {
    const fullName = `${values.firstName} ${values.middleName ? values.middleName + " " : ""}${values.lastName}`;
    const response = await axios.post("http://192.168.179.23:5002/member", values); // Use Axios instead of fetch
    if (response.status === 200) {
      console.log("Server response:", response.data);
      console.log(values);
      alert("Data inserted successfully");
      navigate('/memberdata');
      resetForm();
      setSubmitting(false);
    } else {
      // Handle the error if the request fails
      throw new Error("Failed to submit form");
    }
  } catch (error) {
    console.error("Error submitting form:", error);
  }
};




const ValidationSchema = Yup.object({
  firstName: Yup.string()
  .trim()
  .matches(/^[^\s]+(\s[^\s]+)*$/, 'White Space Not Allowed')
  .required("FirstName is required."),


lastName: Yup.string()
  .trim()
  .matches(/^[^\s]+(\s[^\s]+())*$/, 'White Space Not Allowed')
  .required("LastName is required."),


  middleName: Yup.string()
  .trim()
  .matches(/^[^\s]+(\s[^\s]+)*$/, 'White Space Not Allowed')
  .required("MiddleName is required."),
  

  dob: Yup.string().required("DOB is required."),
  
  doj: Yup.string()
    .required("DOJ is required.")
    .test(
      "date-of-joining",
      "Date of Joining must be at least 21 years greater than Date of Birth.",
      function (value) {
        const { dob } = this.parent; 
        const dobDate = new Date(dob);
        const dojDate = new Date(value);
        const ageDifference = dojDate - dobDate;
        // Convert milliseconds to years (assuming 365.25 days per year)
        const ageInYears = ageDifference / (365.25 * 24 * 60 * 60 * 1000);
        return ageInYears >= 21;
      }
    ),
    address: Yup.string()
    .trim()
    .required("Address is required.")
    .test(
      "no-white-space",
      "White spaces are not allowed.",
      (value) => value && value.trim().length > 0
    ),
  

    city: Yup.string()
    .trim()
    .required("City is required.")
    .test(
      "no-white-space",
      "White spaces are not allowed.",
      (value) => value && value.trim().length > 0
    ),


    pin: Yup.string()
    .required("Pin is required.")
    .matches(/^\d{6}$/, "Pin must be exactly 6 digits."),
  

  email: Yup.string()
  .trim()
  .required("Email is required.")
  .email("Invalid email format.")
  .test(
    "no-white-space",
    "White spaces are not allowed.",
    (value) => value && value.trim().length > 0
  ),

  mobile: Yup.string()
    .required("Mobile is required.")
    .matches(/^\d{10}$/, "Mobile must be exactly 10 digits."),
 
    
    aadhar: Yup.string()
    .trim()
    .required("Aadhar is required.")
    .matches(/^\d{12}$/, "Aadhar must be exactly 12 digits."),
  

    pan: Yup.string()
    .required("Pan is required.")
    .matches(/^[a-zA-Z0-9]{10}$/, "pan must be exactly 10 Character"),
   

  status: Yup.string().required("status required."),
  external_code: Yup.string()
  .required("code is required.")
  .matches(/^[a-zA-Z0-9]{10}$/, "code must be exactly 10 Character"),
 
});

const MemberForm = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values, { resetForm, setSubmitting }) => onSubmit(values, { resetForm, setSubmitting, navigate, }),
    validationSchema: ValidationSchema,
    
    
  });
  
  console.log(formik.errors);
  const handleCancel = () => {
   navigate("/memberdata")
    formik.resetForm();
  };
  
  return (
    <div className="member-form">
    <div className="container" style={{ maxWidth: "750px" }}>
      <h2>Member Form</h2>
      <form onSubmit={formik.handleSubmit}>
      <div className="row">
      <div className="col-md-4 mb-3 d-flex align-items-start">
            <label htmlFor="lastName" className="form-label align-self-start" style={{ width: "95px" }}>
          Name:
            </label>
            <input
              type="text"
              className="form-control"  
              id="lastName"
              name="lastName"
              style={{ width: "100%" }}
              placeholder="Last Name..."
              onChange={formik.handleChange}
              value={formik.values.lastName}
            />
           {formik.errors.lastName && formik.touched.lastName && (
          <div className="errors">{formik.errors.lastName}</div>
        )}
          </div>
          <div className="col-md-4 mb-3 d-flex align-items-start">
            <label htmlFor="firstName" className="form-label align-self-start" style={{ width: "80px" }}>
            
            </label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              name="firstName"
              style={{ width: "100%" }}
              placeholder="First Name..."
              onChange={formik.handleChange}
              value={formik.values.firstName}
            />
           {formik.errors.firstName && formik.touched.firstName && (
          <div className="errors">{formik.errors.firstName}</div>
        )}
          </div>
          <div className="col-md-4 mb-3 d-flex align-items-start">
            <label htmlFor="middleName" className="form-label align-self-start" style={{ width: "80px" }}>
              
            </label>
            <input
              type="text"
              className="form-control"
              id="middleName"
              name="middleName"
              style={{ width: "100%" }}
              placeholder="Middle Name..."
              onChange={formik.handleChange}
              value={formik.values.middleName}
            />
           {formik.errors.middleName && formik.touched.middleName && (
          <div className="errors">{formik.errors.middleName}</div>
        )}
          </div>
        
        </div>
        <div className="row mb-4">
          <div className="col-md-6 mb-3 d-flex align-items-start">
            <label
              htmlFor="dob"
              className="form-label align-self-start"
              style={{ width: "80px" }}
            >
              DOB:
            </label>
            <input
              type="date"
              className="form-control"
              id="dob"
              name="dob"
              style={{ width: "100%" }}
              onChange={formik.handleChange}
              value={formik.values.dob}
            />
          {formik.errors.dob && formik.touched.dob && (
          <div className="errors">{formik.errors.dob}</div>
        )}
          </div>
          <div className="col-md-6 d-flex align-items-start">
            <label
              htmlFor="doj"
              className="form-label align-self-start"
              style={{ width: "65px" }}
            >
              DOJ:
            </label>
            <input
              type="date"
              className="form-control"
              id="doj"
              name="doj"
              style={{ width: "100%" }}
              onChange={formik.handleChange}
              value={formik.values.doj}
            />
            {formik.errors.doj && formik.touched.doj && (
          <div className="errors">{formik.errors.doj}</div>
        )}
          </div>
          {/* {error && <div style={{ color: 'red', display:"flex", justifyContent:"center"}}>{error}</div>} */}
        </div>

        <div className="row mb-3" style={{ marginTop: "-19px" }}>
          <div className="col-md-12 mb-2 mb-md-0 d-flex align-items-start">
            <label
              htmlFor="address"
              className="form-label align-self-start"
              style={{ width: "72px" }}
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
              onChange={formik.handleChange}
              value={formik.values.address}
            />
            {formik.errors.address && formik.touched.address && (
          <div className="errors">{formik.errors.address}</div>
        )}
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6 mb-4 mb-md-0 d-flex align-items-start">
            <label
              htmlFor="city"
              className="form-label align-self-start"
              style={{ width: "80px" }}
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
              onChange={formik.handleChange}
              value={formik.values.city}
            />
            {formik.errors.city && formik.touched.city && (
          <div className="errors">{formik.errors.city}</div>
        )}
          </div>
          <div className="col-md-6 d-flex align-items-start">
            <label
              htmlFor="pin"
              className="form-label align-self-start"
              style={{ width: "65px" }}
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
              onChange={formik.handleChange}
              value={formik.values.pin}
            />
           {formik.errors.pin && formik.touched.pin && (
          <div className="errors">{formik.errors.pin}</div>
        )}
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6 mb-4 mb-md-0 d-flex align-items-start">
            <label
              htmlFor="email"
              className="form-label align-self-start"
              style={{ width: "80px" }}
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
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.errors.email && formik.touched.email && (
          <div className="errors">{formik.errors.email}</div>
        )}
          </div>
          <div className="col-md-6 d-flex align-items-start mobileHandling">
            <label
              htmlFor="mobile"
              className="form-label align-self-start"
              style={{ width: "70px" }}
            >
              Mobile:
            </label>
            <input
              type="number"
              className="form-control"
              id="mobile"
              name="mobile"
              style={{ width: "100%" }}
              placeholder="Enter Your Number..."
              onChange={formik.handleChange}
              value={formik.values.mobile}
            />
            {formik.errors.mobile && formik.touched.mobile && (
          <div className="errors">{formik.errors.mobile}</div>
        )}
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-md-6 mb-4 mb-md-0 d-flex align-items-start">
            <label
              htmlFor="aadhar"
              className="form-label align-self-start"
              style={{ width: "80px" }}
            >
              Aadhar:
            </label>
            <input
              type="number"
              className="form-control"
              id="aadhar"
              name="aadhar"
              style={{ width: "100%" }}
              placeholder="Enter Aadhar No..."
              onChange={formik.handleChange}
              value={formik.values.aadhar}
            />
           {formik.errors.aadhar && formik.touched.aadhar && (
          <div className="errors">{formik.errors.aadhar}</div>
        )}
          </div>
          <div className="col-md-6 mb-4 mb-md-0 d-flex align-items-start">
            <label
              htmlFor="pan"
              className="form-label align-self-start"
              style={{ width: "70px" }}
            >
              PAN:
            </label>
            <input
              type="text"
              className="form-control"
              id="pan"
              name="pan"
              style={{ width: "100%" }}
              placeholder="Enter PAN No..."
              onChange={formik.handleChange}
              value={formik.values.pan}
            />
            
           {formik.errors.pan && formik.touched.pan && (
          <div className="errors">{formik.errors.pan}</div>
        )}
          </div>
         
        </div>
        <div className="row" style={{ marginTop: "-5px" }}>
          <div className="col-md-6 mb-4 mb-md-0 d-flex align-items-start">
            <label
              htmlFor="status"
              className="form-label align-self-start"
              style={{ width: "63px" }}
            >
              Status:
            </label>
            <select
              className="form-select"
              id="status"
              name="status"
              style={{ width: "50%" }}
              onChange={formik.handleChange}
              value={formik.values.status}
            >
              <option value="">Select Status</option>
              <option value="A">Active</option>
              <option value="I">Inactive</option>
            </select>
            {formik.errors.status && formik.touched.status && (
          <div className="errors">{formik.errors.status}</div>
        )}
          </div>
          <div className="col-md-4 mb-3 d-flex align-items-start">
            <label htmlFor="external_code" className="form-label align-self-start" style={{ width: "95px" }}>
            ExtCode:
            </label>
            <input
              type="text"
              className="form-control"
              id="external_code"
              name="external_code"
              style={{ width: "100%" }}
              placeholder="External Code..."
              value={formik.values.external_code}
             
            />
             {formik.errors.external_code && formik.touched.external_code && (
          <div className="errors">{formik.errors.external_code}</div>
        )}
          </div>
        </div>

        <div className=" col-md-6  buttons" style={{ marginTop: "20px" }}>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>

          
          <button
            type="reset"
            className="btn btn-danger danger"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
 
    </div>
    </div>
  );
};
export default MemberForm;
