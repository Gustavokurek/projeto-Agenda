const Contato = require('../models/ContatoModel');

exports.index= async(req, res, next)=>{
    const contatos= await Contato.buscaContatos()
    if(req.session.user){
        res.render('index', {contatos})
    } else{
        res.render('login')
    }


};



