import { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Sidenavbar from "@/components/ui/Sidenavbar";
;
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Menu, } from "lucide-react"
import { Button } from "@/components/ui/button";
import LogoutButton from "@/components/ui/logout";
import { useAppSelector } from "@/redux/Hook";
const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location]);
  const user = useAppSelector((state) => state.auth.user);
 


  return (
    <div className="flex min-h-screen bg-gray-100 ">
      {/* Welcome Section */}

      <aside
        className={`fixed z-50 top-0 left-0 h-screen w-64 bg-white shadow-lg transform transition-transform duration-300 overflow-hidden
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Sidenavbar />
      </aside>

      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 "
          onClick={() => setIsSidebarOpen(false)}
        />
      )}


      <div className="flex flex-col flex-1 min-h-screen">
        <header className="sticky top-0 z-30 backdrop-blur bg-white/30 border-b border-white/20 shadow-sm py-3 flex items-center justify-between md:px-10 px-4">
          <button onClick={() => setIsSidebarOpen(true)}>
            <Menu className="h-6 w-6 text-gray-800 cursor-pointer" />
          </button>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-8 w-8">

                    <AvatarFallback className="bg-primary text-primary-foreground">{
                      user?.name ? user.name.charAt(0).toUpperCase() : "U"

                    }</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>

                  {
                    user?.role === "admin" ? (
                      <Link to={'/dashboard/admin'} className="flex-1">
                        Admin Dashboard
                      </Link>
                    ) : <Link to={'/dashboard/jobs'} className="flex-1">
                      Avaiable Jobs
                    </Link>
                  }
                </DropdownMenuItem>
                <DropdownMenuItem>

                  {
                    user?.role === "admin" ? (
                      <Link to={'/dashboard/list-jobs'} className="flex-1">
                        List of Jobs
                      </Link>
                    ) : <Link to={'/dashboard/myalljobs'} className="flex-1">
                      Applied JObs
                    </Link>
                  }
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <LogoutButton />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

       

        <main className="md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
