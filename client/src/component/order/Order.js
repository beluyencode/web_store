import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';


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
                    setOrder(data.order);
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
                        <p>asda {order.length}</p>
                    </div>
                </div>
            }
        </div>
    );
}