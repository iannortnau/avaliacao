import styles from '../../styles/components/ModuloRelatorio.module.css'
import {useEffect, useState} from "react";
import Router, { useRouter } from 'next/router'
import axios from "axios";
import Image from "next/image";
import loading from "../../public/icones/icons8_swirl_24px_2.png";
import PerguntaReletorio from "./PerguntaReletorio";

export default function ModuloRelatorio(props) {
    const modulo = props.modulo;
    const rascunho = props.rascunho;
    const [submit,setSubmit] = useState(false);
    const[estado,setEstado] = useState(0);
    const [mensagem,setMensagem] = useState({
        texto:null,
        cor:null,
    });

    function calculaMedia(auxRascunho) {
        let media = 0;
        for (let i = 0; i < auxRascunho.modulos[modulo.id].perguntasGuia.length; i++) {
            media+= auxRascunho.modulos[modulo.id].perguntas[auxRascunho.modulos[modulo.id].perguntasGuia[i]];
        }
        media = media/auxRascunho.modulos[modulo.id].perguntasGuia.length;
        auxRascunho.modulos[modulo.id].media = media;
        console.log(media);
        props.setRacunho(auxRascunho);
    }

    return (
        <div className={"corPrimariaTr corPrimariaText "+styles.Painel}>
            <h2>{modulo.titulo}</h2>
            {modulo.Pergunta.map(function (pergunta,index) {
                return(
                    <PerguntaReletorio
                        key={"pergunta"+index}
                        pergunta={pergunta}
                        rascunho={rascunho}
                        setRacunho={function (aux) {
                            calculaMedia(aux);
                        }}
                        submit={props.submit}
                        idModulo={modulo.id}
                    />
                );
            })}
        </div>
    );
}
