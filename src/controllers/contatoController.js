const Contato= require('../models/ContatoModel')

exports.index=(req, res, next)=>{
 
    res.render('CadastrarContato', {
        contato:{}
    })
};



exports.register=async(req, res)=>{
    try{
        const contato= new Contato(req.body)
        await contato.register();
        if(contato.errors.length > 0){
            req.flash('errors', contato.errors)
            req.session.save(()=>{
                return  res.redirect('/contato/index')
        });
        
        return 
    }   
    req.flash('success', 'contato registrado com sucesso')
        req.session.save(()=>{
            return  res.redirect(`/contato/index/${contato.contato._id}`)
        })
    }catch(e){
        console.log(e)
        return res.render('404')
    }
}

exports.editIndex= async (req, res, next)=>{
    try{
    if(!req.params.id) return res.render('404')
    const contato= await Contato.buscaPorId(req.params.id)
    if(!contato) return  res.render('404')
 
    res.render('CadastrarContato', {contato})
    }catch(e){
        console.log(e)
    }

}
exports.edit= async (req, res)=>{
    try{
    if(!req.params.id) return res.render('404')
    const contato= new Contato(req.body)
    await contato.edit(req.params.id)

    if(contato.errors.length > 0){
        req.flash('errors', contato.errors)
        req.session.save(()=>{
            return  res.redirect('back')
    });
    
    return 
    }   
    req.flash('success', 'contato editado com sucesso')
    req.session.save(()=>{
        return  res.redirect(`/contato/index/${contato.contato._id}`)
    })

    }catch(e){
        console.log(e)
        res.render('404')
        
    }
    



}
