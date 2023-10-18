import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import { Spinner } from "flowbite-react";

const PrivateRoute = ({ childern }) => {
  const { user, loading, setUser } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="text-center">
        <Spinner aria-label="Center-aligned spinner example" />
      </div>
    );
  }


  console.log(user);

  if (user) {
    return childern;
  }
  console.log("not user context");

  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
