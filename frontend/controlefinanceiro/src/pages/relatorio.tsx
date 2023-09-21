import Image from 'next/image'
import { GetServerSideProps } from 'next/types'
import { parseCookies } from 'nookies'

export default function Relatorio() {
  return (
    <div className='container h-screen ' >
      <h1>Aqui é o relatorio</h1>
      <div>
        <div>

        </div>
        <div>

        </div>
        <div>

        </div>
      </div>
    </div>
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
