import React, { useState } from "react";
import "./SignIn.css";
import { useNavigate } from 'react-router-dom';


export default function SignIn() {
    let navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [alert, setAlert] = useState({
        content: "",
        display: { display: "none" }
    });
    const [disable,setDisable] = useState(true);


    const onChangeName = (event) => {
        setName(event.target.value);
    }
    const onChangeEmail = (event) => {
        setEmail(event.target.value);
    }
    const onChangeUserName = (event) => {
        setUserName(event.target.value);
    }
    const onChangePassword = (event) => {
        setPassword(event.target.value);
    }
    const onChangeConfirmPassword = (event) => {
        setConfirmPassword(event.target.value);
    }
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const returnLogin = () => {
        navigate("/login");
    }

    const onClick = () => {
        if (name.length < 2 || name.includes(" ")) {
            setAlert({
                content: "tên phải có 2 kí tự trở lên và không có khoảng trắng"
            });
        } else if (!validateEmail(email)) {
            setAlert({
                content: "email không hợp lệ"
            });
        } else if (userName.length < 8 || userName.includes(" ")) {
            setAlert({
                content: "tài khoản khong đc có khoảng trắng và phải có 8 kí tự trở lên"
            });
        } else if (password.length < 8 || password.includes(" ")) {
            setAlert({
                content: "mật khẩu khong đc có khoảng trắng và phải có 8 kí tự trở lên"
            });
        } else if (password !== confirmPassword) {
            setAlert({
                content: "mật khẩu không trùng khớp"
            });
        } else {
            var body = {
                name: name,
                email: email,
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

            fetch("http://localhost:5000/user/signin", header)
                .then((response) => {
                    return response.json();
                })
                .then(data => {
                    if (data.message === "error") {
                        setAlert({
                            content: "tài khoản đã tồn tại"
                        });
                    }
                    if (data.message === "successful") {
                        setDisable(false)
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
                        <span className="label-login-signin">Đăng ký</span>
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
                            type="text"
                            onChange={onChangeName} value={name}
                            name="username" placeholder="Nhập tên của bạn"
                        />
                        <input className="input-login-signin"
                            type="text"
                            onChange={onChangeEmail} value={email}
                            name="username" placeholder="Nhập Email"
                        />
                        <input className="input-login-signin"
                            type="text"
                            onChange={onChangeUserName} value={userName}
                            name="username" placeholder="Nhập tên tài khoản"
                        />
                        <input className="input-login-signin"
                            type="password"
                            onChange={onChangePassword} value={password}
                            name="password" placeholder="Nhập mật khẩu"
                        />
                        <input className="input-login-signin"
                            type="password"
                            onChange={onChangeConfirmPassword} value={confirmPassword}
                            name="password" placeholder="Nhập lại mật khẩu"
                        />
                        <span style={{ color: "#fff" }}>Bạn đã có tài khoản ? </span>
                        <a href="/login" className="link-forget-password">Đăng nhập</a>
                        <button className="btn-login-signin"
                            type="button" onClick={onClick}>
                            Đăng ký
                        </button>
                    </div>
                </div>
                <div className="dialog" disabled={disable}>
                    <div className="dialog-content">
                        <div className="margin-auto">
                            <span className="dialog-label">ĐĂNG KÝ THÀNH CÔNG</span>
                            <div className="img-tichxanh"></div>
                            <button onClick={returnLogin} className="btn-return-login" >Quay lại đăng nhập</button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}