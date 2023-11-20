import { api } from "@/lib/axios";
import { createContext, useState } from "react";
import { setCookie } from "nookies";
import Router from "next/router";


type AuthContextType ={
    isAuthenticated: boolean,
}

export const AuthContext = createContext({});


export default function AuthProvider({ children }: any){
    const [token,setYokne] = useState()

    const isAuthenticated = !!token;

    

    async function signIn({ email, senha}: any){
        console.log(email,senha)
        try {
            
            const response =  await api.post("auth/user",{
                email: email,
                password: senha
            })
                
            setCookie(undefined, "Controle-token", response.data.token, {
                maxAge: 60 * 60 * 1, //1hour
            })
    
            api.defaults.headers["Authorization"] = `Bearer ${response.data.token}`

            Router.push('/')

            console.log(response)
            console.log(response.data.token)

        } catch (error) {
            console.log(error)
        }

    }

    return(
        <AuthContext.Provider value={{ isAuthenticated, signIn }}>
            {children}
        </AuthContext.Provider>
    )

}