import DashboardLayout from "../../Layout/DashboardLayout";
import Appointment from "../../Pages/Appointment/Appointment/Appointment";
import AddDoctor from "../../Pages/Dashboard/AddDoctor/AddDoctor";
import AllUsers from "../../Pages/Dashboard/AllUsers/AllUsers";
import Payment from "../../Pages/Dashboard/Dashboard/Payment/Payment";
import ManageDoctors from "../../Pages/Dashboard/ManageDoctors/ManageDoctors";
import MyAppointment from "../../Pages/Dashboard/MyAppointment/MyAppointment";
import Login from "../../Pages/Login/Login";
import DisplayError from "../../Pages/Shared/DisplayError/DisplayError";
import SignUp from "../../Pages/SignUp/SignUp";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import AdminRoute from "./AdminRoute/AdminRoute";

const { createBrowserRouter } = require("react-router-dom");
const { default: Main } = require("../../Layout/Main");
const { default: Home } = require("../../Pages/Home/Home/Home");

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <DisplayError></DisplayError>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/appointment",
        element: <Appointment></Appointment>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    errorElement: <DisplayError></DisplayError>,
    children: [
      {
        path: "/dashboard",
        element: <MyAppointment></MyAppointment>,
      },
      {
        path: "/dashboard/allusers",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/add-doctor",
        element: (
          <AdminRoute>
            <AddDoctor></AddDoctor>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manage-doctors",
        element: (
          <AdminRoute>
            <ManageDoctors></ManageDoctors>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/payment/:id",
        element: (
          <AdminRoute>
            <Payment></Payment>
          </AdminRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/bookings/${params.id}`),
      },
    ],
  },
]);
