import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from 'react-router-dom';

export default function Login() {
    let navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [alert, setAlert] = useState({
        content: "",
        display: { display: "none" }
    });

    const onChangeUserName = (e) => {
        setUserName(e.target.value);
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }


    const onClick = () => {
        if (userName === "" || password === "") {
            setAlert({
                content: "tài khoản và mật khẩu không được bỏ chống",
                display: { display: "block" }
            });
        }else if(userName.includes(" ")) {
            setAlert({
                content: "tài khoản không được có khoảng trắng",
                display: { display: "block" }
            });
        }else {
            var body = {
                userName: userName,
                password: password
            }
            var header = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body),
            }

            fetch("http://localhost:5000/user/login", header)
                .then((response) => {
                    return response.json();
                })
                .then(data => {
                    if (data.token && data.message === "successful") {
                        localStorage.setItem("verifyToken", data.token);
                        navigate("/");
                    }
                    if (data.message === "error") {
                        setAlert({
                            content: data.contentError,
                            display: { display: "block" }
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }


    return (
        <>
            <div className="login-form">
                <div className="form-tt">
                    <div className="center-screen">
                        <span className="label-login-signin">Đăng nhập</span>
                        <div className="alert" style={alert.display} >
                            <div style={{ paddingLeft: 20 }}>
                                <span>
                                    <span style={{ fontWeight: 700 }}>
                                        Đã xảy ra lỗi :&nbsp;
                                    </span>
                                    {alert.content}
                                </span>
                            </div>
                        </div>
                        <input className="input-login-signin"
                            value={userName} onChange={onChangeUserName} type="text"
                            name="username" placeholder="Nhập tên tài khoản"
                        />
                        <input className="input-login-signin"
                            value={password} onChange={onChangePassword} type="password"
                            name="password" placeholder="Nhập mật khẩu"
                        />
                        <span style={{ color: "#fff" }}>Bạn chưa có tài khoản ? </span>
                        <a href="/signin" className="link-forget-password">Đăng ký</a>
                        <button className="btn-login-signin"
                            type="button" onClick={onClick}>
                            Đăng nhập
                        </button>
                        <a href="/" className="link-forget-password">Quên mật khẩu</a>
                    </div>
                </div>
            </div>
        </>
    );
}