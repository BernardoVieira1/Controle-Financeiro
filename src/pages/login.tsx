"use client"
import Image from 'next/image'

import imageLogin from "@/assets/Finance leaders-rafiki 1.svg"
import { api } from '@/lib/axios'
import { useContext, useEffect } from 'react'
import Header from '@/components/Header'
import { useForm } from 'react-hook-form'
import { AuthContext } from '@/contexts/AuthContexts'
import Link from 'next/link'




export default function Login() {

  const { register, handleSubmit } = useForm()
  const { signIn }:any = useContext(AuthContext)

  function handleSignIn(data: any){

    signIn(data)
  }

  return (
    
   <div className='flex flex-row h-full w-full bg-secondary-color'>
          <div className='w-full' >
            <Image className='h-full w-full' src={imageLogin} alt='Money illustrations by Storyset' />
          </div>

          <div className='flex justify-center items-center w-full'>
            <div className='bg-primary-gray rounded flex flex-col items-center justify-center p-10'>
              <h1 className='font-bold text-blue-50 text-3xl'>LOGIN</h1>
              <form onSubmit={handleSubmit(handleSignIn)} className='flex flex-col mt-5' action="">
                <label className='mb-1 text-white' htmlFor="">Email:</label>
                <input {...register("email")}  className='h-10 px-5 items-center w-64 bg-blue-color-100 rounded mb-1' type="text" />
                <label className='mb-1 text-white' htmlFor="">Senha:</label>
                <input {...register("senha")} className='h-10 px-5 items-center w-64 bg-blue-color-100 rounded' type="password" />
                <button className='mt-8 w-full text-xl bg-secondary-color font-bold text-primary-gray rounded p-3' >Entrar</button>
                <span className='mt-2 text-blue-color-100' >Não tem cadastro? <Link className='font-bold ' href="/cadastro" >cadastre-se</Link></span>
              </form>
            </div>
          </div>
        </div>
  
  )
}
