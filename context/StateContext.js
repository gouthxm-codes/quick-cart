import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantiy, setTotalQuantiy] = useState(0);
  const [qty, setQty] = useState(1);

  let foundProduct;
  let index;

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );
    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQuantiy((prevTotalQuantities) => prevTotalQuantities + quantity);
    if (checkProductInCart) {
      const updatedCart = cartItems.map((cart) => {
        if (cart._id === product._id)
          return {
            ...cart,
            quantity: cart.quantity + quantity,
          };
      });
      setCartItems(updatedCart);
      // localStorage.setItem("cartItems", JSON.stringify(cartItems));
      // localStorage.setItem("totalQuantiy", totalQuantiy);
      // localStorage.setItem("totalPrice", totalPrice);
    } else {
      product.quantity = quantity;

      setCartItems([...cartItems, { ...product }]);
    }
    toast.success(`${qty} ${product.name} added to the cart !`);
  };

  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice((prev) => prev - foundProduct.price * foundProduct.quantity);

    setTotalQuantiy((prev) => prev - foundProduct.quantity);
    setCartItems(newCartItems);
  };

  const toggleCartItemQty = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((product) => product._id === id);
    const newCart = cartItems.filter((item) => item._id !== id);
    if (value === "inc") {
      let newCartItems = [
        ...newCart,
        { ...foundProduct, quantity: foundProduct.quantity + 1 },
      ];
      setCartItems(newCartItems);
      setTotalPrice((prev) => prev + foundProduct.price);
      setTotalQuantiy((prev) => prev + 1);
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        let newCartItems = [
          ...newCart,
          { ...foundProduct, quantity: foundProduct.quantity - 1 },
        ];
        setCartItems(newCartItems);
        setTotalPrice((prev) => prev - foundProduct.price);
        setTotalQuantiy((prev) => prev - 1);
      }
    }
  };

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  };

  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        totalQuantiy,
        totalPrice,
        setShowCart,
        setCartItems,
        setTotalPrice,
        setTotalQuantiy,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQty,
        onRemove,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
