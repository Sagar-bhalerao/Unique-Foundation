import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <nav className={`${styles.navbar} navbar navbar-expand-lg navbar-light `} >
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-7 mb-lg-0">
          <li className="nav-item">
            <Link className={`${styles.navLink} nav-link active`} style={{marginRight:"13px", color:"blue"}} aria-current="page" to="/">Home</Link>
          </li>
          <li className="nav-item dropdown">
            <a className={`${styles.navLink} nav-link dropdown-toggle`} href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Master
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <Link className={`${styles.dropdownItem} dropdown-item`} to="/memberdata">Members</Link>
              <Link className={`${styles.dropdownItem} dropdown-item`} to="/Group">Group</Link>
              <Link className={`${styles.dropdownItem} dropdown-item`} to="/Account">Account</Link>
            </div>
          </li>
          <li className="nav-item dropdown">
            <a className={`${styles.navLink} nav-link dropdown-toggle`} href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Transactions
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <Link className={`${styles.dropdownItem} dropdown-item`} to="/ApplicationView">Application</Link>
              <Link className={`${styles.dropdownItem} dropdown-item`} to="/SalaryUpload">Salary Upload</Link>
              <Link className={`${styles.dropdownItem} dropdown-item`} to="/VoucherView">Voucher Entry</Link>
            </div>
          </li>
          <li className="nav-item dropdown">
            <a className={`${styles.navLink} nav-link dropdown-toggle`} href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Reports
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <Link className={`${styles.dropdownItem} dropdown-item`} to="/Ledger">Ledger</Link>
              <a className={`${styles.dropdownItem} dropdown-item`} href="#">Member</a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
