import React, { useState } from "react";
import "./Dropdown.css";


export default function Dropdown(props) {
    const [disabled, setDisable] = useState(true);

    const onClick = () => {
        setDisable(!disabled);
    }
    const logout = () => {
        localStorage.removeItem("verifyToken");
        window.location.reload();

    }

    return (
        <div className="dropdown">
            <button onClick={onClick} className="btn-dropdown" >{props.user.name}</button>
            <div className="dropdown-menu  dropdown-content" disabled={disabled}>
                <a href="/" className="dropdown-item activeNavbaritem">Trang cá nhân</a>
                <a href="/" className="dropdown-item activeNavbaritem">
                    Giỏ hàng
                    {props.user.cart.length > 0 &&
                        <span className="badge notification-dot">
                            {props.user.cart.length}
                        </span>
                    }
                </a>
                <a href="/" className="dropdown-item activeNavbaritem">Đơn hàng</a>

                <hr className="dropdown-divider" />
                <button className="dropdown-item activeNavbaritem" onClick={logout}>Đăng xuất</button>
            </div>
        </div>
    );
}