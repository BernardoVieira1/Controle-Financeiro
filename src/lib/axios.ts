import axios from "axios";

import { parseCookies } from "nookies"

const { "Controle-token": token } = parseCookies()

export const api = axios.create({
    baseURL: "https://controle-financeiro-back.vercel.app/"
})

if (token) {
    api.defaults.headers["Authorization"] = `bearer ${token}`;
}
