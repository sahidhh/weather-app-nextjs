import React, { Suspense } from "react";
import SearchBar from "../components/SearchBar";
import DashboardBody from "./body";

const Dashboard = () => {
  return (
    <Suspense>
      <SearchBar />
      <DashboardBody />
      <p>Dashboard</p>
    </Suspense>
  );
};

export default Dashboard;
