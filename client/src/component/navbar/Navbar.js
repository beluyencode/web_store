import React from "react";
import Dropdown from "../dropdown/Dropdown";

export default function Navbar(props) {

    return (
        <>
            <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">WEB STORE</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link " aria-current="page" href="/">Trang chủ</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link " href="/">Hot</a>
                            </li>
                            <li className="nav-item  dropdown">
                                <a className="nav-link  dropdown-toggle" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Sản phẩm
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a className="dropdown-item activeNavbaritem" href="/">Quần áo</a></li>
                                    <li><a className="dropdown-item activeNavbaritem" href="/">Đồ trang trí trong nhà</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item activeNavbaritem" href="/">Something else here</a></li>
                                </ul>
                            </li>
                            {/* <form className="d-flex">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-success" type="button">Search</button>
                            </form> */}
                        </ul>
                        <div className="user-navbar">
                            {props.user ?
                                <Dropdown user={props.user}/>:
                                <div>
                                    <a className="loginLink" href="/login">Đăng nhập</a>
                                    <span style={{paddingLeft:5,paddingRight:5}}>/</span>
                                    <a className="loginLink" href="/signin">Đăng ký</a>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}