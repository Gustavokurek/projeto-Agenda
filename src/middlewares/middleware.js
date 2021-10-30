// mddls recebem next como parametro tbm, se não terminam

exports.middleware= (req, res, next)=>{
    // parametros passam como se fosse corrente até o termino do comando
    next() // usado para dar continuidade num possivel próxima função 
    }
    

    exports.middlewareGlobal=(req, res, next)=>{
      res.locals.errors= req.flash('errors');
      res.locals.success= req.flash('success');
      res.locals.user= req.session.user;
      const user= res.locals.user;
      next()
        
    }

    exports.usuario=(req, res, next)=>{
      res.locals.user
      next()
        
    }

    exports.checkCsrfError = (err, req, res, next) => {
        if(err) {
          return res.render('404');
        }
      };
      
      exports.csrfMiddleware = (req, res, next) => {
        res.locals.csrfToken = req.csrfToken();
        next();
      };      
      
      exports.loginRequired = (req, res, next) => {
        if(!req.session.user){
          req.flash('errors', 'Você precisa estar logado para acessar essa página')
          req.session.save(()=>{
            res.redirect('/login/index')
          })
          return
        }
        next();
      };