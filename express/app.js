const express = require('express');
const app = express(); 
var cors = require('cors')
app.use(cors())
const router = require('./router/index');
app.use(router)
app.listen(3000, () => console.log('开启服务器端口号为: location:3000'));