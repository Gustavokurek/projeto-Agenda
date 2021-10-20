// modelo de um model
const validator= require('validator')
const mongoose=require('mongoose');

// definindo esquemas ou requerimentos para cada chave a ser construida no bd
const LoginSchema = new mongoose.Schema({
    email: { type: String, required: true},
    password: { type: String, required: true}
});

const LoginModel= mongoose.model('Login', LoginSchema)

class Login{
    constructor(body){
        this.body=body;
        this.errors= [];
        this.user=null;
    }

    // quando precisar registrar na base de dados não esquecer de usar promisses assync await e usar try catch
    async register(){
        this.valida();
        if(this.errors.length > 0) return; 
        try{            
            this.user= await LoginModel.create(this.body)
        }catch(e){
            console.log(e)
        }

    }

    valida(){
        this.cleanUp()
        // validação
        // email válido
        if(!validator.isEmail(this.body.email)) this.errors.push('Email inválido')
        // senha entre 3 e 20 caracteres
        if(this.body.password.length <= 3 || this.body.password.length >= 20)  this.errors.push('A senha precisa ter entre 3 e 20 carcteres.')
        
    }

    cleanUp(){
        for( const key in this.body){
            if(typeof this.body[key] !== 'string')
            this.body[key]= '';
        }

        this.body={
            email: this.body.email,
            password: this.body.password
        }

    }

}

module.exports=Login;