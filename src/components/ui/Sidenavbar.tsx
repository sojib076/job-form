import { useState } from "react";

import { ChevronRight, Inbox,User, type LucideIcon} from "lucide-react";
import { Button } from "./button";
import { useAppSelector } from "@/redux/Hook";

import LogoutButton from "./logout";
import { Nav } from "./Nav";


interface NavLink {
  title: string;
  to: string;
  icon: LucideIcon;
  variant: "default" | "ghost";
  adminOnly?: boolean;
  userOnly?: boolean;
}

const Sidenavbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Access user role from Redux
  const userRole = useAppSelector((state) => state.auth.user?.role);

  // Define navigation links
  const navLinks: NavLink[] = [
    {
      title: "Dashboard",
      to: "/dashboard",
      icon: Inbox,
      variant: "default"
    },
    {
      title: "Profile",
      to: "/dashboard/profile",
      icon: User,
      variant: "default",
    },
   
  ];

  // Filter navLinks based on user role
  const filteredNavLinks = navLinks.filter((link) => {
    if (link.adminOnly && userRole !== "admin") return false;
    if (link.userOnly && userRole !== "user") return false;
    return true;
  });

  return (
    <div className="  relative min-w-[80px] lg:min-h-[100vh] border-r px-3 lg:pt-10">
      <div className="my-10">
        <Button
          variant="default"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="lg:absolute lg:right-[-20%] right-20 lg:top-5 hidden lg:block"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
      <Nav
        isCollapsed={isCollapsed}
        links={filteredNavLinks}
      />
      <LogoutButton/>
    </div>
  );
};

export default Sidenavbar;

