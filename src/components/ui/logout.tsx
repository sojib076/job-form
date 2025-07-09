import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "@/redux/features/Auth/authSlice";
import { Button } from "./button";
import { resetJobs } from "@/redux/features/Application/jobApplySlice";


const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());   // optional if you're using global reset
dispatch(resetJobs());  
 
    navigate("/login"); 
  };

  return (
    <Button onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded cursor-pointer w-full"
        data-testid="logout-button"
    >
      Logout
    </Button>
  );
};
export default LogoutButton;