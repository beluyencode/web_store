import React, { useEffect, useState } from "react";
import "./Home.css";
import { useSearchParams } from "react-router-dom";
import CardProduct from "../cardProduct/CardProduct";
import { useOutletContext } from "react-router-dom";


export default function Home() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [product, setProduct] = useState([]);
    const [setUser] = useOutletContext();

    const handleUpdateUser = (user) => {
        setUser(user);
    }

    const handleOnClickPagination = (e) => {
        scrollToTop();
        setSearchParams({ page: e.target.value });
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };


    useEffect(() => {
        console.log(searchParams.get("page"));
        if (searchParams.get('page')) {
            fetch(`http://localhost:5000/product/${searchParams.get("page")}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }})
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    setProduct(data);
                })
        } else {
            fetch(`http://localhost:5000/product/`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }})
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    setProduct(data);
                })
        }
    }, [searchParams])

    return (
        <>
            <div className="home">
                <div className="mainHome">
                    {product.map((item) => {
                        return (<CardProduct key={item.id} handleUpdateUser={handleUpdateUser} product={item} />);
                    })}
                </div>
                <ul className="pagination" style={{ justifyContent: 'center' }}>
                    <li className="page-item"><button value={1} onClick={handleOnClickPagination} className="page-link">1</button></li>
                    <li className="page-item"><button value={2} onClick={handleOnClickPagination} className="page-link">2</button></li>
                    <li className="page-item"><button value={3} onClick={handleOnClickPagination} className="page-link">3</button></li>
                    <li className="page-item"><button value={4} onClick={handleOnClickPagination} className="page-link">4</button></li>
                    <li className="page-item"><button value={5} onClick={handleOnClickPagination} className="page-link">5</button></li>
                </ul>
            </div>
        </>
    );
}