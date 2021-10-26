import './assets/css/style.css'
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import ValidaçãoLogin from './assets/modules/Validação-Login'
import ValidaçãoCadastro from './assets/modules/Validação-Cadastro'

const cadastro= new ValidaçãoLogin('.form-cadastro')
const login= new ValidaçãoLogin('.form-login')
const adicionar= new ValidaçãoCadastro('.form-add')

cadastro.init()
login.init()
adicionar.init()