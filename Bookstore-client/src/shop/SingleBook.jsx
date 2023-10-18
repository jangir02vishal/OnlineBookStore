import React, { useEffect, useState, useContext } from "react";
import { useLoaderData } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../contexts/AuthProvider";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SingleBook = () => {
  const { _id, title, imageURL } = useLoaderData();
  const [book, setBook] = useState();
  const { setCart, user } = useContext(AuthContext);


  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BASE_SERVER_URL + "/book/" + _id)
      .then((res) => {
        setBook(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log("Something went wrong fetching job data" + error);
      });
  }, []);

  return (
    <div className="mt-28 px-4 lg:px-24 flex ">
      <div className="max-w-sm">
        <img src={imageURL} alt="" className="h-w-xl" />
        <h1 className="mt-4 text-2xl font-semibold text-gray-900">{title}</h1>
        <h2 className="mt-2 text-1xl font-semibold text-gray-900">{book ? book.authors.join(", ") : ""}</h2>
      </div>

      <div className="max-w-xl">
        <div>
          {book ? book.bookDescription : ""}
          <button
            onClick={()=>{
              if (user) {
                setCart((oldcart) => {
                  return oldcart.includes(book) ? oldcart : [...oldcart, book];
                });
              } else {
                toast.warning("Plese login first");
              }
            }}
            className="flex  mt-4 bg-blue-700 text-white font-semibold px-4 py-2 rounded
            hover:bg-black transition-all duration-300 text-1xl"
          >
            Add To cart
          </button>
        </div>
      </div>
      <ToastContainer position="bottom-left" />
    </div>
  );
};

export default SingleBook;
