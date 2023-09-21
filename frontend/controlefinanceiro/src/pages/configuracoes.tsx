import { GetServerSideProps } from 'next'
import Image from 'next/image'
import { parseCookies } from 'nookies'

export default function Configuracoes() {
  return (
    
      <h1>e tome config</h1>
      
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx)=>{
  const {["Controle-token"]: token} = parseCookies(ctx)

  if(!token){
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
