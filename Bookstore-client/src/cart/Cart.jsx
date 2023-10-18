import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";

import { AuthContext } from "../contexts/AuthProvider";
import CartItem from "./CartItem";
import Navbar from "../components/Navbar";

function Cart() {
  const { cart } = useContext(AuthContext);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(cart.reduce((acc, item) => acc + item.price, 0));
  }, [cart.length]);

  return (
    <>
    <Navbar/>
      <div className="p-4">
        <Link to="/">
          <h1 className="text-1xl mt-12 font-semibold flex items-center">
            {" "}
            <FaArrowLeft className="mr-2 w-4 h-4 text-black" />
            Back to Home
          </h1>
        </Link>
        <table className="w-full mt-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2">Title</th>
              <th className="py-2">Price</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cart &&
              cart.map((item) => <CartItem key={item._id} item={item} cart />)}
          </tbody>
        </table>
      </div>

      <div className="p-4 bg-gray-100">
        <p className="text-1xl font-semibold">Total: ${total.toFixed(2)}</p>
      </div>

      <div className="p-3 pr-20 flex justify-end">
        <button
          className="bg-blue-700 text-white font-semibold px-4 py-2 rounded
                    hover:bg-black transition-all duration-300 text-1xl"
        >
          Proceed to Checkout
        </button>
      </div>
    </>
  );
}

export default Cart;
