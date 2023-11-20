import Image from 'next/image'
import ImageFinance from "@/assets/Finance leaders-rafiki 1.svg"
import { useForm } from "react-hook-form"
import { api } from '@/lib/axios'
import { constants } from 'buffer'
import Link from 'next/link'

export default function Cadastro() {
    const { register, handleSubmit } = useForm()

    async function handleCadastro(data:any){
      console.log(data)
      const response = await api.post("createUser",{
        name: data.Nome,
        email: data.Email,
        password: data.Senha,
      })
      
      console.log(response)
      
    
  
    }

  return (
    <div className='flex h-full flex-row bg-secondary-color'>
        <div className='h-full w-full justify-center items-center' >
            <Image className='h-full' src={ImageFinance} alt='Money illustrations by Storyset' />
        </div>

        <div className='flex justify-center items-center w-full'>
            <div className='bg-primary-gray rounded flex flex-col items-center justify-center p-10'>
                <h1 className='font-bold text-blue-50 text-3xl'>CADASTRO</h1>
                <form onSubmit={handleSubmit(handleCadastro)} className='flex flex-col mt-5' action="">
                    <label className='mb-1 text-white' htmlFor="">Nome:</label>
                    <input {...register("Nome")} className='h-10 px-5 items-center w-64 bg-blue-color-100 rounded mb-1' type="text" />
                    <label className='mb-1 text-white' htmlFor="">Email:</label>
                    <input {...register("Email")} className='h-10 px-5 items-center w-64 bg-blue-color-100 rounded mb-1' type="text" />
                    <label className='mb-1 text-white' htmlFor="">Senha:</label>
                    <input {...register("Senha")} className='h-10 px-5 items-center w-64 bg-blue-color-100 rounded' type="password" />
                    <button className='mt-8 w-full text-xl bg-secondary-color font-bold text-primary-gray rounded p-3' >Criar conta</button>
                    <Link className='text-blue-color-100' href="/login" >Já tem conta? <span className='font-bold' >Entrar</span></Link>
                </form>
            </div>
        </div>
    </div>  
  )
}