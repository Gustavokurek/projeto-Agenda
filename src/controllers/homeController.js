exports.index=(req, res, next)=>{
    if(req.session.user){
        res.render('index')
    } else{
        res.render('login')
    }

};



