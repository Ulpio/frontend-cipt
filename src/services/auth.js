import api from './api'


export async function login({ cpf, password }){
// Backend deve retornar ao menos um token. Tentamos alguns campos comuns.
const { data } = await api.post('/auth/login', { cpf, password })
const token = data.access_token || data.token || data.jwt || ''
if (token) localStorage.setItem('accessToken', token)
return data
}


export async function fetchMe(){
const { data } = await api.get('/users/me')
return data
}