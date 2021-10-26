import validator from "validator";

export default class{
    constructor(formClass){
        this.form=document.querySelector(formClass)

    }

    init(){
        this.events();
    }

    events(){
        if(!this.form) return ;
        this.form.addEventListener('submit', e =>{
            e.preventDefault()
            this.validate(e);
        })
    }

    validate(e){
        const el = e.target;
        const inputEmail= el.querySelector('input[name="email"]')
        const inputPassword=el.querySelector('input[name="password"]')
        let error= false;

        for(let errorText of this.form.querySelectorAll('.check-erro')){
            errorText.remove();
        }

        if(!validator.isEmail(inputEmail.value)) {
            this.lançaErro(inputEmail, 'Email inválido')
            error= true;
        }

        if(inputPassword.value.length < 4) {
            this.lançaErro(inputPassword, 'Senha precisa ter mais de 3 caracteres')
            error= true
        }

        if(!error) el.submit();
    }

    lançaErro(campo, msg){
        const div= document.createElement('div');
        div.innerText=msg;
        div.setAttribute('class', 'check-erro')
        campo.insertAdjacentElement('afterend', div )
        
    }
}

