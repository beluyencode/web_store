const express = require('express')
const app = express()
const port = 5000;
const user = require('./router/user');
const product = require('./router/product');
const cors = require('cors');

require('dotenv').config()

app.use(express.static("public"));
app.use(cors({ origin: 'http://localhost:3000'}));
app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.use("/user" ,user);
app.use('/product',product);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})