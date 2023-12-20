import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Root from "./Root/Root";
import Home from "./Pages/Home";
import AuthProvider from "./Provider/AuthProvider";

const router = createBrowserRouter([
  {path: "/", element: <Root/>, children: [

    {path: "/", element: <Home/> }
   
  ]},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

   <AuthProvider>  <RouterProvider router={router} /></AuthProvider>

  </React.StrictMode>
);