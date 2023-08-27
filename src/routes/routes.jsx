import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import PrivateRoute from "./PrivateRoute";
import Events from "../pages/Events/Events";
import Gmail from "../pages/Gmail/Gmail";
import Mailgun from "../pages/Mailgun/Mailgun";
import Mailchimp from "../pages/Mailchimp/Mailchimp";
import Bulksms from "../pages/Bulksms/Bulksms";
import ReactDrag from "../pages/ReactDrag/ReactDrag";

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <PrivateRoute> <Main /></PrivateRoute>,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/events',
        element: <Events />
      },
      {
        path: '/gmail',
        element: <Gmail />
      },
      {
        path: '/mailgun',
        element: <Mailgun />
      },
      {
        path: '/mailchimp',
        element: <Mailchimp />
      },
      {
        path: '/bulksms',
        element: <Bulksms />
      },
      {
        path: '/react-drag-and-drop',
        element: <ReactDrag />
      },
    ]
  },
  {
    path: '/login',
    element: <Login />
  }
])
