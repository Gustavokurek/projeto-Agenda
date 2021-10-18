const express = require('express');
const route= express.Router();
const homeController=require('./src/controllers/homeController')
const LoginController=require('./src/controllers/LoginController')

// importando middleware
const {middleware}=require('./src/middlewares/middleware')

// rota home
route.get('/', homeController.index)

// rota login
route.get('/login/index', LoginController.index)
   




module.exports=route;
