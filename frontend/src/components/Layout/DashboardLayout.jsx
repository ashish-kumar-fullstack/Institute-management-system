import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./SideBar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSideBarOpen((previous) => !previous);
  };

  const closeSidebar = () => {
    setIsSideBarOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        isSideBarOpen={isSideBarOpen}
        setIsSideBarOpen={setIsSideBarOpen}
        closeSidebar={closeSidebar}
      />

      <div className="flex-1 min-w-0">
        <Navbar onMenuClick={toggleSidebar} />

        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;