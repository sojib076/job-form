import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LoginPage from "@/Pages/Public/Login/Login";
import Home from "@/Pages/Public/Home/Home";
import Signup from "@/Pages/Public/signup/signup";
import PrivateRoute from "@/PrivateRoute/PrivateRoute";
import DashboardLayout from "@/Layout/DashboardLayout";
import AdminRoute from "@/PrivateRoute/AdminRoute";
import AdminPage from "@/Pages/Dashboard/Admin/AdminPage";
import AllJobs from "@/Pages/Dashboard/User/AllJobs";
import MyAllJobs from "@/Pages/Dashboard/User/Myalljobs";
import JobManagement from "@/components/Admin/UpdateJob";
import UserRoute from "@/PrivateRoute/UserRoute";

// Route Guards
// import PrivateRoute from "./PrivateRoute";
// import AdminRoute from "./AdminRoute";
// import UserRoute from "./UserRoute";

// Temporary placeholder pages (using <h1> for now)




const router = createBrowserRouter([
  // 🟢 PUBLIC ROUTES
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />, // 🏠 Home page
      },
      {
        path: "login",
        element: <LoginPage />, 
      },
      {
        path: "signup",
        element: <Signup />, 
      },

      //dashboard routes




     
    ],  
  },

  { 
    path: "/dashboard",
    element: <PrivateRoute> <DashboardLayout /> </PrivateRoute >,
    children: [
     
      {
        path: "admin",
        element: <AdminRoute> <AdminPage/> </AdminRoute >, // 🛡️ Admin Dashboard
      },
      {
        path: "list-jobs",
        element: <AdminRoute> <JobManagement /> </AdminRoute >,
      },

 {
        path:'jobs',
        element: <UserRoute> 
          <AllJobs />
        </UserRoute>
      },
      {
        path: "myalljobs",
        element:  <UserRoute>
          <MyAllJobs />
        </UserRoute>
      },
      
    ]

  },


  // You can add more top-level routes here if needed
]);

export default router;
