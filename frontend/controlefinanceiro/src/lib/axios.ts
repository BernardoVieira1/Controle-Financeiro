import axios from "axios";

import { parseCookies } from "nookies"

const { "Controle-token": token } = parseCookies()

export const api = axios.create({
    baseURL: "http://localhost:8080/"
})

if(token){
    api.defaults.headers["Authorization"] = `bearer ${token}`;
}
