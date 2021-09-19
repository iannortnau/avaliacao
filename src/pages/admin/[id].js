import Header from "../../components/Header";
import PainelCriador from "../../components/PainelCriador";
import PainelCriadorModulo from "../../components/PainelCriadorModulo";
import Avaliacao from "../../components/Avaliacao";
import {useEffect, useState} from "react";
import { useRouter } from 'next/router'
import axios from "axios";
import Head from "next/head";

export default function Editar() {
    const router = useRouter();
    const [id,setId] = useState(null);

    useEffect(function () {
        setId(router.query.id);
    },[]);

    return (
        <div key={"avaliacao"+id} className="container">
            <Head>
                <title>Avaliações</title>
                <link rel="shortcut icon" href={process.env.NEXT_PUBLIC_URL+"/icons8_360_degrees.ico"} />
            </Head>
            <Header/>
            <PainelCriador/>
            <Avaliacao
                idAvaliacao={id}
                setIdAvaliacao={function (auxId){
                    setId(auxId);
                }}
            />
            {id &&
            <PainelCriadorModulo
                idAvaliacao={id}
            />
            }
        </div>
    );
}
