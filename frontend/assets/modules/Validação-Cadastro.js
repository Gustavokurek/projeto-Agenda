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
        const inputNome=el.querySelector('input[name="nome"]')
        const inputTelefone=el.querySelector('input[name="telefone"]')
        let error= false;

        for(let errorText of this.form.querySelectorAll('.check-erro')){
            errorText.remove();
        }

        if(!validator.isEmail(inputEmail.value) && !inputTelefone.value){
            this.lançaErro(inputEmail, 'Email inválido')
            this.lançaErro(inputTelefone, 'Adicione um telefone válido')
            error= true;
        }

        if(inputTelefone.value.length !== 0  && inputTelefone.value.length < 8) {
            this.lançaErro(inputTelefone, 'Adicione um telefone válido')
            error= true;
        }
        
        if(!inputNome.value) {
            this.lançaErro(inputNome, 'Campo requerido')
            error= true;
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
