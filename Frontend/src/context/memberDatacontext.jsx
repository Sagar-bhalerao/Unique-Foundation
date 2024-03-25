import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const MemberDataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://192.168.179.23:5002/members");
        if (response.status === 200) {
          setData(response.data);
        } else {
          setError("Failed to fetch data");
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <MemberDataContext.Provider value={{ data, setData, loading, }}>
      {children}
    </MemberDataContext.Provider>
  );
};

export const useData = () => useContext(MemberDataContext);
