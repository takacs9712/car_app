import { useState, useRef, MouseEvent } from "react";
import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar/Sidebar";
import { FaBars, FaTimes } from "react-icons/fa";

function RootLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (event: MouseEvent<HTMLDivElement>) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node) &&
      isSidebarOpen
    ) {
      setIsSidebarOpen(false);
    }
  };

  const handleButtonClick = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex min-h-screen" onClick={handleOutsideClick}>
      <div
        ref={sidebarRef}
        className={`sm:w-64 sm:block ${isSidebarOpen ? "block" : "hidden"}`}
      >
        <Sidebar isOpen={isSidebarOpen} />
      </div>
      <div className="flex-1 pt-10 md:pt-2">
        <Outlet />
      </div>
      <div className="fixed top-4 right-4 z-50 md:hidden">
        {isSidebarOpen ? (
          <button
            className="p-3 bg-gray-800 text-white rounded-full"
            onClick={closeSidebar}
          >
            <FaTimes />
          </button>
        ) : (
          <button
            className="p-3 bg-gray-800 text-white rounded-full"
            onClick={handleButtonClick}
          >
            <FaBars />
          </button>
        )}
      </div>
    </div>
  );
}

export default RootLayout;
