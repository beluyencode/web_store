import React, { useEffect, useState } from "react";
import "./CartPage.css";
import { useNavigate } from 'react-router-dom';
import CartCard from "../cartCard/CartCard";



export default function CartPage(props) {
    let navigate = useNavigate();
    const [cartProduct, setCartProduct] = useState([]);
    const [totalPrice,setTotalPrice] = useState(0);

    const handleClickBuy = () => {
        console.log(totalPrice);
    }

    const changeCartProduct = (product) => {
        setCartProduct(product);
    }

    useEffect(() => {
        if (localStorage.getItem("verifyToken")) {
            var body = {
                token: localStorage.getItem("verifyToken")
            }
            var header = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body),
            }
            fetch("http://localhost:5000/user/getCart", header)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    setCartProduct(data);
                })
                .catch(error => {
                    console.log(error);
                    navigate("/");
                })
        } else {
            navigate("/");
        }
    }, [navigate])

    useEffect(() => {
        let price = 0;
        cartProduct.forEach(item => {
            price += item.price;
        })
        setTotalPrice(price);
    },[cartProduct])

    return (
        <>
            <div className="cartpage">
                {cartProduct.map((cartProduct,index) => {
                    return <CartCard key={index} changeCartProduct={changeCartProduct} product={cartProduct} />
                })}
            </div>
            <div className="payment">
                <div className="payment-content">
                    <span>Tổng thanh toán : {totalPrice.toLocaleString()}đ</span>
                    <br/>
                    <button className="btn-buy-product" onClick={handleClickBuy}>Mua hàng</button>
                </div>
            </div>
        </>
    );
}