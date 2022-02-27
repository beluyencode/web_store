import React, { useEffect, useState } from "react";
import "./CartPage.css";
import { useNavigate } from 'react-router-dom';
import CartCard from "../cartCard/CartCard";



export default function CartPage(props) {
    let navigate = useNavigate();
    const [cartProduct, setCartProduct] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [disabledButton, setDisabledButton] = useState(true);

    const handleOnChangeCheckBox = (isTrue, index) => {
        let cartUpdate = [...cartProduct];
        cartUpdate[index].isTrue = isTrue;
        setCartProduct(cartUpdate);
    }

    const handleClickBuy = () => {
        if (totalPrice === 0) {

        } else {
            let product = [];
            cartProduct.forEach(item => {
                if (item.isTrue) {
                    product.push(item);
                }
            })

            var body = {
                token: localStorage.getItem("verifyToken"),
                product: product,
                totalPrice: totalPrice
            }

            var header = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body),
            }
            fetch("http://localhost:5000/user/order", header)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    if (data.messages === "successful") {
                        navigate("/success");
                    }
                })
                .catch(error => {
                    console.log(error);
                    navigate("/");
                })
        }
    }

    const changeCartProduct = (product) => {
        setCartProduct(product);
    }

    const returnHomePage = () => {
        navigate("/");
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
                    console.log(data);
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
        if (totalPrice !== 0) {
            setDisabledButton(false);
        } else {
            setDisabledButton(true);
        }
    }, [totalPrice])

    useEffect(() => {
        let price = 0;
        cartProduct.forEach(item => {
            if (item.isTrue) {
                price += item.price;
            }
        })
        setTotalPrice(price);
    }, [cartProduct])

    return (
        <>
            {cartProduct.length === 0 ?
                <div className="cartpage" style={{textAlign: 'center'}}>
                    <p>Giỏ hành của bạn không có sản phẩm</p>
                    <button onClick={returnHomePage}>Quay lại mua hàng</button>
                </div>
                :
                <div>
                    <div className="cartpage">
                        {cartProduct.map((cartProduct, index) => {
                            return <CartCard key={index} index={index} onChangeCheckBox={handleOnChangeCheckBox} changeCartProduct={changeCartProduct} product={cartProduct} />
                        })}
                    </div>
                    <div className="payment">
                        <div className="payment-content">
                            <span>Tổng thanh toán : {totalPrice.toLocaleString()}đ</span>
                            <br />
                            <button className="btn-buy-product" onClick={handleClickBuy} disabled={disabledButton}>Mua hàng</button>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}