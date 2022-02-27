import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import CartCard from '../cartCard/CartCard';


export default function Order(props) {
    let navigate = useNavigate();
    const [order, setOrder] = useState([]);


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
            fetch("http://localhost:5000/user/getOrder", header)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    setOrder(data.order.reverse());
                })
                .catch(error => {
                    navigate("/");
                })
        } else {
            navigate("/");
        }
    }, [navigate])

    return (
        <div>
            {order.length === 0 ?
                <div className="cartpage" style={{ textAlign: 'center' }}>
                    <p>Giỏ hành của bạn không có sản phẩm</p>
                    <button onClick={returnHomePage}>Quay lại mua hàng</button>
                </div>
                :
                <div>
                    <div className="cartpage">
                        {order.map((cartProduct,i) => {
                            return (
                            <div key={i}>
                                <hr className="dropdown-divider" />
                                <p className="centerText">Thời gian đặt hàng : {cartProduct.date} ({cartProduct.time})</p>
                                {cartProduct.product.map((item, index) => {
                                    return <CartCard key={index} index={index} product={item} />
                                })}
                                <p className="centerText">Tổng giá trị đơn hàng : {cartProduct.price.toLocaleString()} đ</p>
                            </div>);
                        })}
                    </div>
                </div>
            }
        </div>
    );
}