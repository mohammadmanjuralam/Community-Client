// main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
// Pages & Components
import Root from "./Components/Root/Root.jsx";
import Home from "./Components/Pages/Home/Home.jsx";
import Login from "./Components/Pages/Login/Login.jsx";
import Register from "./Components/Pages/Register/Register.jsx";
import AddIssueForm from "./Components/Pages/Add Issuse/AddIssueForm.jsx";
import AllIssues from "./Components/Pages/AllIssues/AllIssues.jsx";
import MyIssues from "./Components/Pages/MyIssuse/MyIssues.jsx";
import IssueDetails from "./Components/Pages/IssuseDetails/IssueDetails.jsx";

// Context & Private Route
import AuthProvider from "./Components/AuthProvider/AuthProvider.jsx";
import PrivateRoute from "./Components/PrivateRoute/PrivavteRoute.jsx";
import MyContribution from "./Components/Pages/My Contribution/MyContribution.jsx";

// 404 Page
export const NotFound = () => (
  <div className="text-center text-2xl mt-20">404 Page Not Found</div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "add-issues", element: <AddIssueForm /> },
      { path: "all-issues", element: <AllIssues /> },
      { path: "my-issues", element: <MyIssues /> },
      {
        path: "issues/:id",
        element: <IssueDetails />,
      },
      { path: "my-contributions", element: <MyContribution /> },
    ],
  },
  {
    path: "*",
    element: <div className="text-center text-3xl mt-20">Page Not Found</div>,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
