import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidenavbar from "@/components/ui/Sidenavbar";
import { Menu } from "lucide-react";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // 👇 Close sidebar on route change
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed z-50 top-0 left-0 h-screen w-64 bg-white shadow-lg transform transition-transform duration-300
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Sidenavbar />
      </aside>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex flex-col flex-1 min-h-screen">
        {/* Header with toggle button */}
        <header className="bg-white shadow px-4 py-3 flex items-center">
          <button onClick={() => setIsSidebarOpen(true)}>
            <Menu className="h-6 w-6 text-gray-800 cursor-pointer" />
          </button>
          <h1 className="ml-4 font-semibold text-lg">Dashboard</h1>
        </header>

        {/* Page content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
