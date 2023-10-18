import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";

function CartItem({ item, removeItemfromCart }) {
  const { setCart } = useContext(AuthContext);

  const handleRemove = (id) => {
    setCart((oldcart) => {
      oldcart.filter((item) => item._id != id);
    });
  };
  return (
    <tr className="border-t border-gray-200">
      <td className="py-2">{item.title}</td>
      <td className="py-2">${item.price}</td>
      <td className="py-2">
        <button
          onClick={() => {
            setCart((oldcart) => 
              oldcart.filter((book) => book._id != item._id)
            );
          }}
          className="text-red-500 hover:text-red-700"
        >
          Remove
        </button>
      </td>
    </tr>
  );
}

export default CartItem;
