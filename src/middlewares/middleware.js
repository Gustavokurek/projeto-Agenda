// mddls recebem next como parametro tbm, se não terminam

exports.middleware= (req, res, next)=>{
    // parametros passam como se fosse corrente até o termino do comando
    next() // usado para dar continuidade num possivel próxima função 
    }
    

    exports.middlewareGlobal=(req, res, next)=>{
      res.locals.errors= req.flash('errors');
      res.locals.success= req.flash('success');
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