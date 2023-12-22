import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter,RouterProvider,} from "react-router-dom";
import "./index.css";
import Root from "./Root/Root";
import Home from "./Pages/Home";
import AuthProvider from "./Provider/AuthProvider";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Layout from "./Dashboard/Layout";
import MyProfile from "./Dashboard/Pages/MyProfile";

import { QueryClient, QueryClientProvider,} from '@tanstack/react-query'
import Tasks from "./Dashboard/Pages/Tasks";
const queryClient = new QueryClient();

import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'



const router = createBrowserRouter([
  {path: "/", element: <Root/>, children: [

    {path: "/", element: <Home/> },
    {path: "/login", element: <Login/>},
    {path: "/sign-up", element: <SignUp/>},
  ]},

  {path: "/dashboard", element: <Layout/>, children: [

    {path: "/dashboard/profile", element: <MyProfile/> },
    {path: "/dashboard", element: <Tasks/> },
  ]},
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>


    <DndProvider backend={HTML5Backend}>

    <QueryClientProvider client={queryClient}> 
    <AuthProvider>  <RouterProvider router={router} /></AuthProvider>
    </QueryClientProvider>
    
      </DndProvider>
   
  </React.StrictMode>
);