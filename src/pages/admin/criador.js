import Header from "../../components/Header";
import PainelCriador from "../../components/PainelCriador";
import PainelCriadorModulo from "../../components/PainelCriadorModulo";
import Avaliacao from "../../components/Avaliacao";
import {useState} from "react";
import Head from "next/head";

export default function Criador() {
    const [id,setId] = useState(null);
    return (
        <div className="container">
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
