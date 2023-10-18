import React, { useContext }  from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Spinner } from 'flowbite-react';
import { HiOutlineArrowRight } from 'react-icons/hi';

const Logout = () =>{
    const {logOut} = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || "/";
    const handleLogOut = () => {
        logOut().then(() => {
            alert("Sign-out successful.");
            navigate(from, {replace: true});
          }).catch((error) => {
            // An error happened.
          });
    }
    return (
        <div className="flex flex-col items-center text-center justify-center mt-10">
            <Button onClick={handleLogOut} outline pill className="text-center text-1xl">
                    Click me to confirm &nbsp;
                <HiOutlineArrowRight className="h-4 w-4" />
            </Button>
            <hr />
            <p className="py-2 flex text-sm text-gray-500">
                <Spinner className="h-4 w-4" aria-label="Center-aligned spinner example" />
                &nbsp; See you again!
            </p>
        </div>
        
    )
}

export default Logout;