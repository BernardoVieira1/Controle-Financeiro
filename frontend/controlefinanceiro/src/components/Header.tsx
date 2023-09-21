import React from "react";
import Image from "next/image";
import Link from "next/link";

import sairIcon from "@/assets/logout.svg"
import PerfilImage from "@/assets/93623181.jpg"


const Header = ()=>{
    return(
        <div className="container flex w-[251px] h-screen bg-primary-gray flex-col justify-between">
            <div>
                <div className=" flex flex-col items-center mt-10" >
                    <Image className="bg-white rounded-full w-24 h-24 mb-3" src={PerfilImage} alt="Icone padrão pra imagem de perfil" />
                    <h1 className="text-white text-lg font-">Bernardo Vieria</h1>
                </div>
                <div className="flex flex-col items-center justify-start mt-10">
                    <Link className="text-white text-base m-2" href="/">página inicial</Link>
                    <Link className="text-white text-base m-2" href="/relatorio">Relatorio</Link>
                    <Link className="text-white text-base m-2" href="/configuracoes">Configurações</Link>
                </div>
            </div>
            <div className="flex items-center justify-center mb-[40px] gap-3">
                <Image src={sairIcon} alt="icone de sair da página" />
                <p className="text-white text-sm"> sair da conta</p>
            </div>
        </div>
    )
}

export default Header