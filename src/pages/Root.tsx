import { useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";
import { FaBars } from "react-icons/fa";

function RootLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      <div className={`${isSidebarOpen ? "block" : "hidden"} sm:block w-64`}>
        <Sidebar isOpen={isSidebarOpen} />
      </div>
      <div className="flex-1 pt-10 md:pt-2">
        <Outlet />
      </div>
      <button
        className="sm:hidden fixed top-4 right-4 p-3 bg-gray-800 text-white rounded-full"
        onClick={toggleSidebar}
      >
        <FaBars />
      </button>
    </div>
  );
}

export default RootLayout;
