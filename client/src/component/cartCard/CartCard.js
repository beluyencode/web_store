import React from "react";
import "./CartCard.css";

export default function CartCard(props) {

    const handleOnChangeCheckBox = (e) => {
       props.onChangeCheckBox(e.target.checked,props.index);
    }

    const handleonClickRemoveCard = () => {
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
        fetch("http://localhost:5000/user/removeProductFromCart", header)
            .then(response => {
                return response.json();
            })
            .then(data => {
                props.changeCartProduct(data);
            })
            .catch(err => {
                console.log(err);
            })

    }

    return (
        <div className="cart-card">
            <div style={{ padding: 10, display: 'flex' }}>
            <input type="checkbox" onChange={handleOnChangeCheckBox}/>
                <div>
                    <img src="https://vanhoadoanhnghiepvn.vn/wp-content/uploads/2020/08/112815953-stock-vector-no-image-available-icon-flat-vector.jpg" alt="" />
                </div>
                <div className="info_product">
                    <div>
                        <p>{props.product.name_product}</p>
                        <p>{props.product.price.toLocaleString()}đ</p>
                    </div>
                </div>
            </div>
            <div style={{ marginRight: 15 }}>
                <div >
                    <button className="btn-remove-card" onClick={handleonClickRemoveCard}>X</button>
                </div>
            </div>
        </div>
    );
}