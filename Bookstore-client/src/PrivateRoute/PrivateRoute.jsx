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

//   let getAuth = async () => {
//     const localData = JSON.parse(localStorage.getItem("data"));
//     if (localData) {
//       let res = await axios.get(
//         import.meta.env.VITE_BASE_SERVER_URL + "/authenticate",
//         {
//           headers: {
//             token: localData.jwtToken,
//           },
//         }
//       );

//       // .then((res) => {
//       console.log(res);
//       if (res.data.status === 202) {
//         setUser(localData);
//       }
//       // });
//     }
//   };
//   let isJWT = getAuth()

  console.log(user);

  if (user) {
    return childern;
  }
  console.log("not user context");

  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
