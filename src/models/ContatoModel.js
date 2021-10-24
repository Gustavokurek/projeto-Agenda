// modelo de um model
const mongoose=require('mongoose');
const validator= require('validator')

// definindo esquemas ou requerimentos para cada chave a ser construida no bd
const contatoSchema = new mongoose.Schema({
    nome: {type: String, required: true},
    email: { type: String, required: false, default: ''},
    telefone: { type: String, required: false, default: ''},
    CriadoEm: {type: Date, default: Date.now}

});

const ContatoModel= mongoose.model('contato', contatoSchema)

function Contato(body){
    this.body=body;
    this.errors=[]
    this.contato=null;
    
} 

Contato.prototype.register= async function(){
    this.validar()
    if(this.errors.length >0) return;
    this.contato= await ContatoModel.create(this.body)

}

Contato.prototype.validar= function(){
    this.cleanUp()
    // validação
    if(!this.body.nome) this.errors.push('nome é um campo requerido')
    if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('Email inválido')
    if(!this.body.email && !this.body.telefone) this.errors.push('Precisa ser enviado um Email ou Telefone')
    
}

Contato.prototype.cleanUp= function (){
    for( const key in this.body){
        if(typeof this.body[key] !== 'string')
        this.body[key]= '';
    }

    this.body={
        nome: this.body.nome,
        email: this.body.email,
        telefone: this.body.telefone
    }

}

Contato.buscaPorId= async function(id){
    if(typeof id !== 'string') return
    const user= await ContatoModel.findById(id)
    return user 
}

Contato.prototype.edit= async function(id){
    if(typeof id !== 'string') return
    this.validar();
    if(this.errors.length > 0) return ;
    this.contato= await ContatoModel.findByIdAndUpdate(id, this.body, {new: true})
    
}



module.exports=Contato;