import React from 'react';
import { useEffect } from "react";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/contextprovider";

const Home = () => {
  const { user, setUser} = useStateContext();
  useEffect(() => {
    axiosClient.get("/user").then(({ data }) => {
      setUser(data);
    });
  }, []);
  return (
    <div>
      <p className='display-6'>Welcome back, {user.name}</p>
    </div>
  );
};

export default Home;
