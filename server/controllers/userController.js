const db = require("../db");
const jwt = require('jsonwebtoken');

class User {
    getUser(req, res) {
        let findUser = db.db.find(user => user.userName === req.user.userName);
        let user = {
            message : "successful",
            user :{
                name: findUser.name,
                userName: findUser.userName,
                cart : findUser.cart
            }
        }
        res.json(user);
    }

    login(req, res) {
        let findUser = db.db.find((user) => {
            return user.userName === req.body.userName && user.password === req.body.password
        });
        if (findUser !== undefined) {
            var user = {
                name: findUser.name,
                userName: findUser.userName
            }
            const token = jwt.sign(user, process.env.jwtSignature, { expiresIn: "1m" });
            res.json({ message:"successful", token: token });
        } else {
            res.json({message: 'error',contentError : "Tài khoản hoặc mật khẩu không đúng"});
        }
    }

    signin(req, res) {
        let findUserName = db.db.find(user => {
            return user.userName === req.body.userName;
        });
        if (findUserName) {
            res.json({message: 'error',contentError : "Tài khoản đã tồn tại"});
        }else {
            req.body.cart = [];
            db.db.push(req.body);
            console.log(db.db);
            res.json({message: 'successful'});
        }
    }

}

module.exports = new User;