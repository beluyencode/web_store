import React from "react";
import "./CardProduct.css";
import { useNavigate } from 'react-router-dom';


export default function CardProduct(props) {
    let navigate = useNavigate();


    const handleClick = () => {
        if (localStorage.getItem("verifyToken")) {
            var body = {
                token: localStorage.getItem("verifyToken"),
                id: props.product.id
            }
            var header = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body),
            }
            fetch("http://localhost:5000/user/addProductToCart", header)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    if (data.message === "successful") {
                        props.handleUpdateUser(data.user);
                    }
                    if (data.message === "error") {
                        navigate("/login");
                    }
                })
        } else {
            navigate("/login");
        }
    }

    return (
        <>
            <div className="card-product">
                <img src="https://vanhoadoanhnghiepvn.vn/wp-content/uploads/2020/08/112815953-stock-vector-no-image-available-icon-flat-vector.jpg" alt="" />
                <div>
                    <p style={{ fontWeight: 700, fontSize: 18, marginBottom: 5 }}>{props.product.name_product}</p>
                    <p style={{ fontSize: 14, color: "#f94c43", fontWeight: 700 }}>{props.product.price.toLocaleString()}đ</p>
                </div>
                <button onClick={handleClick} className="btn-add-cardProduct">Thêm vào giỏ hàng</button>
            </div>
        </>
    );
}