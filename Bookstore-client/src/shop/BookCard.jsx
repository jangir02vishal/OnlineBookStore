import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";

import { AuthContext } from "../contexts/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function BookCard({ book }) {
  const { setCart, user } = useContext(AuthContext);
  const addtocart = () => {
    if (user) {
      setCart((oldcart) => {
        return oldcart.includes(book) ? oldcart : [...oldcart, book];
      });
    } else {
      toast.warning("Plese login first");
    }
  };

  return (
    <div className="">
      <div className="relative">
        <Link to={`/book/${book._id}`}>
          <img src={book.imageURL} alt="" />
        </Link>
        <div
          onClick={addtocart}
          className="absolute top-1 right-1 bg-blue-600 hover:bg-black p-2 rounded"
        >
          <FaCartShopping className="w-4 h-4 text-white" />
        </div>
      </div>
      <Link to={`/book/${book._id}`}>
        <div>
          <div>
            <h3>{book.title}</h3>
            <p>{book.authors[0]}</p>
          </div>
          <div>
            <p>$12.00</p>
          </div>
        </div>
      </Link>
      <ToastContainer position="bottom-left" />
    </div>
  );
}

export default BookCard;
