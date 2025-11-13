import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router";
import Root from "./Components/Root/Root.jsx";
import Home from "./Components/Pages/Home/Home.jsx";
import AuthProvider from "./Components/AuthProvider/AuthProvider.jsx";
import Login from "./Components/Pages/Login/Login.jsx";
import "./index.css";
import Register from "./Components/Pages/Register/Register.jsx";
import AddIssueForm from "./Components/Pages/Add Issuse/AddIssueForm.jsx";
import AllIssuse from "./Components/Pages/All Issuse/AllIssuse.jsx";
import MyIssues from "./Components/Pages/MyIssuse/MyIssues.jsx";
import IssueDetails from "./Components/Pages/IssuseDetails/IssueDetails.jsx";
import Issues from "./Components/Issues/Issues.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "addIssues",
        Component: AddIssueForm,
      },
      {
        path: "AllIssues",
        Component: AllIssuse,
      },
      {
        path: "my-issues",
        Component: MyIssues,
      },
      {
        path: "issues/:id",
        Component: IssueDetails,
      },
      {
        path: "allIssues",
        Component: Issues,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </StrictMode>
);
