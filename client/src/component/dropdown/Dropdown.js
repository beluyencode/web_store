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
            <button onClick={onClick} className="btn-dropdown" >
                {props.user.name}
                {(props.user.cart.length > 0 || props.user.order.length > 0) &&
                    <span className="badge notification-dot" style={{ marginLeft: 4 }}>
                        {props.user.order.length + props.user.cart.length}
                    </span>
                }
            </button>
            <div className="dropdown-menu  dropdown-content" disabled={disabled}>
                <a href="/" className="dropdown-item activeNavbaritem">Trang cá nhân</a>
                <a href="/cart" className="dropdown-item activeNavbaritem">
                    Giỏ hàng
                    {props.user.cart.length > 0 &&
                        <span className="badge notification-dot">
                            {props.user.cart.length}
                        </span>
                    }
                </a>
                <a href="/order" className="dropdown-item activeNavbaritem">
                    Đơn hàng
                    {props.user.order.length !== 0 &&
                        <span className="badge notification-dot">
                            {props.user.order.length}
                        </span>
                    }
                </a>

                <hr className="dropdown-divider" />
                <button className="dropdown-item activeNavbaritem" onClick={logout}>Đăng xuất</button>
            </div>
        </div>
    );
}