import Image from 'next/image'
import { Poppins } from 'next/font/google'
import { useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { AuthContext } from '@/contexts/AuthContexts'
import { api } from '@/lib/axios'
import { parseCookies } from "nookies"

const poppins = Poppins({ subsets: ['latin'], weight: ["400", "700"] })

import IconPlus from "@/assets/plus.svg"
import MoreIcon from "@/assets/dots-horizontal.svg"
import IconClose from "@/assets/close-circle.svg"

import Link from 'next/link'
import Cadastro from './cadastro'
import { constants } from 'buffer'
import { GetServerSideProps } from 'next'
import RenderResult from 'next/dist/server/render-result'
import Header from '@/components/Header'

interface DataLogin{
  email: string,
  password: string
}

interface Transaction{
  id: string,
  title: string,
  value: number,
  type: string,
  categoria: string,
}

interface PropsTransactios{
  err: boolean,
  transactions?: Transaction 
}

export default function Home() {
  
  const[transactions,setTransactions ] = useState([])
  
  const { register, handleSubmit } = useForm()

  const [isOpen, setIsOpen] = useState(false);

  async function getOperations(){
    try {
      const response = (await api.get("getMyTransactions")).data
      if(response.transactions){
        setTransactions(response.transactions)
      }
      console.log(response)
    } catch (error) {
      console.log(error)
    }
    

  }

  async function crateOperation(data:any){

    console.log(data)

    try {
      const response = await api.post("createTransaction",{
        title: data.titulo,
        value: Number(data.valor),
        type: data.tipo,
        categoria: data.categoria
      })

      setIsOpen(false)
      getOperations()

      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(()=>{
    getOperations()

  },[])


  return (
    <main>
      {isOpen && (
        <div className=" flex z-10 absolute modal-content w-screen h-screen bg-primary-gray-opacity justify-center items-center ">
            <div className='bg-slate-400'>
              <button className="w-full flex px-2 pt-1 close justify-end" onClick={()=>{isOpen? setIsOpen(false):setIsOpen(true) }}>
                <Image className='' src={IconClose} alt=''/> 
              </button>
              <div className='px-10 pb-5' >
                <h2 className='text-3xl flex text-primary-gray items-center justify-center font-bold ' >Criar operação</h2>
                <form className='flex flex-col' onSubmit={handleSubmit(crateOperation)} action="">

                  <label htmlFor="">Titulo</label>
                  <input {...register("titulo")} className='px-8 py-1 text-lg rounded bg-blue-color-100 w-full' type="text"/>


                  <label htmlFor="">Valor</label>
                  <input {...register("valor")} className='px-8 py-1 text-lg rounded bg-blue-color-100 w-full' type="text"/>

                  <div className='flex justify-around'>

                    <input {...register("tipo")} className='' type="radio" name="tipo" value="ENTRADA" id="ENTRADA" />

                    <label  className='bg-slate-500 border-2 rounded flex items-center justify-center w-32 p-2' htmlFor="ENTRADA">ENRADA</label>

                    <input {...register("tipo")} className='' type="radio" name="tipo" value="SAIDA" id="SAIDA" />

                    <label className='bg-slate-500 border-2 rounded flex items-center justify-center w-32 p-2' htmlFor="SAIDA">SAIDA</label>

                  </div>

                  <label htmlFor="">Categoria</label>
                  <input {...register("categoria")} className='px-8 py-1 text-lg rounded bg-blue-color-100 w-full' type="text"/>

                  <button className='w-full bg-blue-color-100 mt-2' type='submit' >Cirar operação</button>
                </form>

              </div>
              
            </div>
          </div>
        )}
    <div className='flex flex-row'>
      <Header/>
      <div className='w-full px-10 pt-10'>
        

        <div></div>
        <div className='flex items-center gap-1 pb-2'>
          <input className='px-8 py-3 text-lg rounded bg-blue-color-100 w-full' type="text" placeholder='Pesquisar' />
          <button onClick={()=>{isOpen? setIsOpen(false): setIsOpen(true)}} className='flex py-3 text-lg justify-center px-6 rounded whitespace-nowrap hover:bg-blue-color-hover-100 items-center bg-blue-color-100'>
            <Image src={IconPlus} alt="icon de mais para adicionar operaçao"/> 
            Nova operação
          </button>
        </div>
        <div>
          <table className='w-full border-spacing-y-2 border-separate'>
            <tbody >
              {transactions ?
                transactions.map((item, index) =>(
                  <tr key={index} className='bg-blue-color-100'>
                  <td className='px-8 py-4 rounded-s'>{item.title}</td>
                  <td className={`px-8 py-4 font-bold ${item.type == "ENTRADA"? "text-green-color":"text-red-color"} `}>R${item.value}</td>
                  <td className='px-8 py-4 '>{item.categoria}</td>
                  <td className='px-8 py-4 '>{item.dateCreate}</td>
                  <td className='px-8 py-4 rounded-e'><Image src={MoreIcon} alt='icone de mais opções'/></td>
                </tr>  
                ))
                : 
                null
              }
            
            </tbody>
          </table>
          {transactions.length == 0? 
          <div className='bg-blue-color-100 flex items-center justify-center px-8 py-4'>
          <p className='text-primary-gray text-lg'>Você ainda não tem operações</p>
         </div>
         :
         null }
        </div>
      </div>
    </div>
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx)=>{
  const {["Controle-token"]: token} = parseCookies(ctx)


  if(!token || token === undefined){
    return{
      redirect:{
        destination: "/login",
        permanent: false
      }
    }
  }

  return {
    props:{
      
    }
  }

}



// ((transaction:any) =>{



// })
