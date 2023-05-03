import React,{useState} from 'react';
import { useEffect } from 'react';
import "../styles/cart.css";
import { CreateBarcode } from '../barcode-generator/CreateBarcode';

export const Cart = ({cart, setCart, handleChange, setOrderTotal, setIsCompleteBtnDisabled}) => {
    const [price, setPrice] = useState(0);

    const handlePrice = ()=>{
        let ans = 0;
        cart.map((item)=>(
            ans += item.quantity * item.price
        ))
        setPrice(ans);
        setOrderTotal(price);
        console.log("### inside handle price: ",ans);
    }

    const handleRemove = (barcode) =>{
        console.log("removed barcode: ",barcode);
        const arr = cart.filter((item)=>item.barcode !== barcode);
        setCart(arr);
        if(arr.length == 0){
            setIsCompleteBtnDisabled(true);
        }
        console.log("updated Cart: ",arr);
    }

    useEffect(()=>{
        handlePrice();
    })

  return (
    <article >
        <div className="cart_box heading_background">
                    <div className='heading' >
                        <p>PRODUCT</p>
                    </div>
                    <div className='quantity heading'>
                       <p>QUANTITY (PCS)</p>
                    </div>
                    <div className='heading'>
                        <p>PRICE ($)</p>
                        
                    </div>
                    <div className='heading'>
                        <p>OPERATION</p>
                        
                    </div>
                </div>
        {   
            cart?.map((item)=>(
                <div className="cart_box" key={item.barcode}>
                    <div className="cart_img">
                        <CreateBarcode barcode={item.barcode}/>
                        <p>{item.name}</p>
                    </div>
                    <div>
                        <button onClick={()=>handleChange(item, +1)}> + </button>
                        <button>{item.quantity}</button>
                        <button onClick={()=>handleChange(item, -1)}> -- </button>
                    </div>
                    <div>
                        <span>$ {Number(item.price).toFixed(2)}</span>
                        <button onClick={()=>handleRemove(item.barcode)} >Remove</button>
                    </div>
                </div>
            ))}
        <div className='total'>
            <span>Total Price Cart</span>
            <span>$ {price.toFixed(2).split( /(?=(?:\d{3})+(?:\.|$))/g ).join( "," )}</span>
        </div>
    </article>
  )
}
