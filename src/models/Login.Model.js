// modelo de um model
const validator= require('validator')
const mongoose=require('mongoose');
const bcryptjs=require('bcryptjs')

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

    async login(){
        this.valida()
        if(this.errors.length > 0) return; 
        this.user= await LoginModel.findOne({email: this.body.email})
        if(!this.user){
            this.errors.push('Usuário ou senha inválido')
            return
        }

        if(! bcryptjs.compareSync(this.body.password, this.user.password)) {
            this.errors.push("Usuário ou senha inválido");
            this.user= null;
            return
        }


    }

    // quando precisar registrar na base de dados não esquecer de usar promisses assync await e usar try catch
    async register(){
        this.valida();
        if(this.errors.length > 0) return; 
        //verificando se o usuário ja existe
        await this.userExist()

        if(this.errors.length > 0) return; 


        // hash da senha 
        const salt= bcryptjs.genSaltSync();
        this.body.password= bcryptjs.hashSync(this.body.password, salt);
        
            this.user= await LoginModel.create(this.body)
    

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

    async userExist(){
        // logando bd por isso o async e procurando nela usando await
        const UsuarioExisti= await LoginModel.findOne({email: this.body.email})
        if(UsuarioExisti){
            this.errors.push('Usuário já existe!! ')
        }

    }
    
 



}

module.exports=Login;