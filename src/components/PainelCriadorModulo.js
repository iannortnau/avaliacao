import styles from '../../styles/components/PainelCriadorModulo.module.css'
import DataTable from 'react-data-table-component';
import lixo from "../../public/icones/icons8_delete_trash_24px.png";
import Link from 'next/link'
import Image from "next/image";
import Router from "next/router";
import {useEffect, useState} from "react";
import axios from "axios";
import Modulo from "./Modulo";
import loading from "../../public/icones/icons8_swirl_24px_2.png";

export default function PainelCriadorModulo(props) {
    const [estado,setEstado] = useState(0);
    const [modulos,setModulos] = useState([]);

    useEffect(function () {
        listaModulos();
    },[]);

    async function listaModulos(){
        setEstado(1);
        try {
            const resposta = await axios.get(process.env.NEXT_PUBLIC_API_URL+"/avaliacao/"+props.idAvaliacao);
            setEstado(0);
            if(resposta.status === 200){
                setModulos(resposta.data.Modulo);
            }
        }catch (e) {
            setEstado(0);
            console.log(e);
        }
    }


    async function criaModulo() {
        setEstado(1);
        const data = {
            data:{
                avaliacao:parseInt(props.idAvaliacao),
                titulo:""
            }
        }
        try {
            const resposta = await axios.post(process.env.NEXT_PUBLIC_API_URL+"/modulo",data);
            if(resposta.status === 200){
                listaModulos();
            }

        }catch (e) {
            setEstado(0);
            console.log(e);
        }
    }

    return (
        <div className={"corPrimariaText corPrimariaTr "+styles.Painel}>
            <div className={styles.Nav}>
                <h2>Criar Módulo:</h2>
                <button className={"w3-ripple corPrimaria "+styles.Botao} onClick={criaModulo}>{estado === 0?"Criar":<Image className={"w3-spin "} src={loading}/>}</button>
            </div>
            {modulos.length>0&&
            <div className={"corPrimariaText corPrimariaTrTr "+styles.Painel2}>
                <h3>Lista de Módulos</h3>
                <div key={"lista"+modulos.length} className={styles.ListaDeModulos}>
                    {modulos.map(function (modulo,index) {
                        return(
                          <Modulo
                              key={"modulo"+index}
                              infos={modulo}
                              listaModulos={listaModulos}
                          />
                        );
                    })}
                </div>
            </div>
            }

        </div>
    );
}
