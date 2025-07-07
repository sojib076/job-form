import { createBrowserRouter } from "react-router-dom";
import App from "../App";

// Route Guards
// import PrivateRoute from "./PrivateRoute";
// import AdminRoute from "./AdminRoute";
// import UserRoute from "./UserRoute";

// Temporary placeholder pages (using <h1> for now)
const Home = () => <h1>Home Page</h1>;
const Login = () => <h1>Login Page</h1>;
const SignUp = () => <h1>Signup Page</h1>;
const Jobs = () => <h1>User - All Jobs Page</h1>;
const AppliedJobs = () => <h1>User - Applied Jobs Page</h1>;
const AdminLayout = () => <h1>Admin Dashboard Layout</h1>;
const PostJob = () => <h1>Admin - Post Job Page</h1>;
const JobList = () => <h1>Admin - Job Listings Page</h1>;
const EditJob = () => <h1>Admin - Edit Job Page</h1>;
const NotFound = () => <h1>404 - Page Not Found</h1>;

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
        element: <Login />, // 🔐 Login page
      },
      {
        path: "signup",
        element: <SignUp />, // 📝 Signup page
      },


        // 🟢 USER ROUTE
      // Add user-specific routes here in the future
    ],
  },
  // You can add more top-level routes here if needed
]);

export default router;
