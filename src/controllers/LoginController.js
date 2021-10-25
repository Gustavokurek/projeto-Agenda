const Login= require('../models/Login.Model')

exports.index=(req, res, next)=>{
    if(!req.session.user){
        res.render('login')
    } else{ 
        res.redirect('/')
}
};

exports.register= async (req, res)=>{
    try{
        const login= new Login(req.body)
        await login.register();
        if(login.errors.length > 0){
            req.flash('errors', login.errors)
            req.session.save(()=>{
               return  res.redirect('/login/index')
            });
            
            return 
        }
            req.flash('success', 'Conta criada com sucesso')
            req.session.save(()=>{
               return  res.redirect('/login/index')
            })
            
            

        } catch(e){
        console.log(e);
        res.render('404')

    }

}

exports.login= async (req, res)=>{
    try{
        const login= new Login(req.body)
        await login.login();
        if(login.errors.length > 0){
            req.flash('errors', login.errors)
            req.session.save(()=>{
               return  res.redirect('/login/index')
            });
            
            return 
        }
           
            req.session.user= login.user;

            req.session.save(()=>{ 
                req.flash('success', 'você entrou')
               return  res.redirect('/')
            })
            
            

        } catch(e){
        console.log(e);
        res.render('404')

    }
}
    
    exports.logout=(req, res)=>{
        req.session.destroy();
        res.redirect('/login/index')



    };



