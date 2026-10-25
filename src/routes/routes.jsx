import { createBrowserRouter } from "react-router";
import App from "../App";
import Gallery from "../pages/Gallery";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoute from "../components/ProtectedRoute";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />, // no login info -> redirect to /login
    children: [
      {
        element: <App />,
        children: [
          {
            index: true,
            element: <Gallery />,
          },
        ],
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
]);

export default routes;
