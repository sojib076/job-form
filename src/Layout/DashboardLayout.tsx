import Sidenavbar from "@/components/ui/Sidenavbar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="">
         <Sidenavbar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
