import React, { useEffect,useState } from "react";
import "./Home.css";
import CardProduct from "../cardProduct/CardProduct";
import { useOutletContext } from "react-router-dom";


export default function Home() {
    const [product,setProduct] = useState([]);
    const [setUser] = useOutletContext();

    const handleUpdateUser = (user) => {
        setUser(user);
    }

    useEffect(() => {
        var header = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        }
        fetch("http://localhost:5000/product", header)
            .then(response => {
                return response.json();
            })
            .then(data => {
                setProduct(data);
            })

    },[])

    return (
        <>
            <div className="home">
                <div className="mainHome">
                    {product.map((item) => {
                        return (<CardProduct key={item.id} handleUpdateUser={handleUpdateUser} product={item}/>);
                    })}
                </div>
            </div>
        </>
    );
}