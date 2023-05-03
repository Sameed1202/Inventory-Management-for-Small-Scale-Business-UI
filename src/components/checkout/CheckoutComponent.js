import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { Cart } from "./Cart";
import { Switch, Route } from "react-router-dom";
import { Button } from "@mui/material";
import { addOrder } from "../../api/apiEndpoints";
import { getCartProducts } from "../../api/apiEndpoints";
import { emptyCart } from "../../api/apiEndpoints";
export const CheckoutComponent = () => {

  const [cart, setCart] = useState([]);
  const [isCompleteBtnDisabled, setIsCompleteBtnDisabled] = useState(true);
  const [orderTotal, setOrderTotal] = useState(0);


  useEffect(() => {
    console.log("inside use effect");
    async function fetchCartProducts() {
      const cartProducts = await getCartProducts();
      setCart(cartProducts);
    }

    fetchCartProducts();
    console.log("cart from API:",cart);
  }, []);

  useEffect(() => {
    if(cart.length > 0)
    setIsCompleteBtnDisabled(false);
  }, [cart]);


  const buttonFontSize = 16;

  const handleChange = (item, d) => {
    let ind = -1;
    cart.forEach((data, index) => {
      if (data.barcode === item.barcode) ind = index;
    });
    const tempArr = cart;
    tempArr[ind].quantity += d;

    if (tempArr[ind].quantity === 0) tempArr[ind].quantity = 1;
    setCart([...tempArr]);

    console.log("Updated quantity cart:", cart);
  };

  const handleCompleteOrder = () => {
    
    if(cart.length > 0){
      addOrder(cart,orderTotal);
      emptyCart();
      setCart([]);
      setIsCompleteBtnDisabled(true);
      console.log("@@ Order Executed @@");
    }
  };

  return (
    <>
      <Navbar />

      <section
        className="hero-section background-img"
        style={{
          height: window.innerHeight - 100,
        }}
      >
         <Button
          sx={{
            marginTop: 3,
            width: 165,
            fontSize: buttonFontSize,
            fontWeight: "bold",
            marginBottom: 5,
            backgroundColor: "#95CD41"
          }}
          variant="contained"
          onClick={() =>{window.location.reload(false);}}
        >
          Refresh Cart
        </Button>
        <Cart cart={cart} setCart={setCart} setOrderTotal={setOrderTotal} handleChange={handleChange} setIsCompleteBtnDisabled={setIsCompleteBtnDisabled} />
        <Button
          sx={{
            marginTop: 3,
            width: 200,
            fontSize: buttonFontSize,
            fontWeight: "bold",
          }}
          variant="contained"
          color="success"
          onClick={handleCompleteOrder}
          disabled={isCompleteBtnDisabled}
        >
          Complete order of ${orderTotal.toFixed(2)}
        </Button>
      </section>
    </>
  );
  
};
