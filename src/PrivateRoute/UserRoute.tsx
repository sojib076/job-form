/* eslint-disable @typescript-eslint/no-explicit-any */

import { useAppSelector } from "@/redux/Hook";
import { Navigate } from "react-router-dom";

const UserRoute = ({children}:any) => {
  const userRole = useAppSelector((state) => state.auth.user?.role); 

  if (userRole !== "user") {
    return <Navigate to="/login" />;
  }

  return children ; 
};

export default UserRoute;