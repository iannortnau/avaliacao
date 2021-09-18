import Header from "../../components/Header";
import PainelCriador from "../../components/PainelCriador";
import PainelCriadorModulo from "../../components/PainelCriadorModulo";
import Avaliacao from "../../components/Avaliacao";
import {useEffect, useState} from "react";
import { useRouter } from 'next/router'
import axios from "axios";

export default function Relatorio() {
    const router = useRouter();
    const [id,setId] = useState(null);

    useEffect(function () {
        setId(router.query.id);
    },[]);

    return (
        <div key={"avaliacao"+id} className="container">
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
