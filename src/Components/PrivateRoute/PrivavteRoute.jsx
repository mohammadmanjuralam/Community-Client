import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import Loading from "../Pages/Loading/Loading";
import AuthContext from "../AuthCOntext/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }

  if (!user) {
    // Logged out হলে login page এ redirect, original page info state এ pathano hocche
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
