import React from "react";

import "./Home.css"
const Home = () => {
  return  (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="dashboard-title">Dashboard</div>
        <div className="dashboard-search">
          <input type="text" placeholder="Type here to search" />
        </div>
      </div>
      <div className="dashboard-content">
        <div className="dashboard-stats">
          <div className="stat-item">
            <div className="stat-title">Total Users</div>
            <div className="stat-value">356</div>
          </div>
          <div className="stat-item">
            <div className="stat-title">New Order Received</div>
            <div className="stat-value">$9,548</div>
          </div>
          <div className="stat-item">
            <div className="stat-title">Weekly Total Earnings</div>
            <div className="stat-value">34,648</div>
          </div>
          <div className="stat-item">
            <div className="stat-title">Today's Visitors</div>
            <div className="stat-value">BAR CHART</div>
          </div>
        </div>
        <div className="dashboard-charts">
          <div className="chart-item">
            <div className="chart-title">My First Dataset</div>
            <div className="chart-placeholder">Chart</div>
          </div>
          <div className="chart-item">
            <div className="chart-title">My Second Dataset</div>
            <div className="chart-placeholder">Chart</div>
          </div>
          <div className="chart-item">
            <div className="chart-title">Tabview</div>
            <div className="chart-placeholder">Chart</div>
          </div>
          <div className="chart-item">
            <div className="chart-title">Stepper</div>
            <div className="chart-placeholder">Chart</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
