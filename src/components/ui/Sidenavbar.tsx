

import { Inbox,User, type LucideIcon} from "lucide-react";

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


  // Access user role from Redux
  const userRole = useAppSelector((state) => state.auth.user?.role);

  // Define navigation links
  const navLinks: NavLink[] = [
    {
      title: "Dashboard",
      to: "/dashboard/admin",
      icon: Inbox,
      variant: "default",
      adminOnly: true,
    },
    {
      title: "Jobs Lists",
      to: "/dashboard/list-jobs",
      icon: User,
      variant: "default",
      adminOnly: true,
    },
    {
      title: "Jobs",
      to: "/dashboard/jobs",
      icon: User,
      variant: "default",
       userOnly: true,
    },
    {
      title: "My Jobs",
      to: "/dashboard/myalljobs",
      icon: User,
      variant: "default",
      userOnly: true,
    }
   
  ];

  // Filter navLinks based on user role
  const filteredNavLinks = navLinks.filter((link) => {
    if (link.adminOnly && userRole !== "admin") return false;
    if (link.userOnly && userRole !== "user") return false;
    return true;
  });

  return (
    <div className="   border-r px-3 lg:pt-10">
     
      <Nav
        isCollapsed={false}
        links={filteredNavLinks}
      />
      <LogoutButton/>
    </div>
  );
};

export default Sidenavbar;

