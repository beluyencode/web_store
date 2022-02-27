import React from "react";
import { useNavigate } from 'react-router-dom';


export default function SuccessPage () {
    let navigate = useNavigate();

    const handlerOnClick = () => {
        navigate("/");
    }

    return (
        <div style={{textAlign: 'center'}}>
            <p>bạn đã đạt hàng thành công !!</p>
            <button onClick={handlerOnClick}>Tiếp tục mua hàng</button>
        </div>
    );
}