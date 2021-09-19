import styles from '../../styles/components/Relatorio.module.css'
import {useEffect, useState} from "react";
import Router, { useRouter } from 'next/router'
import axios from "axios";
import Image from "next/image";
import loading from "../../public/icones/icons8_swirl_24px_2.png";
import ModuloRelatorio from "./ModuloRelatorio";

export default function Relatorio(props) {
    const avaliacao = props.avaliacao;
    const rascunho = props.rascunho;
    const [submit,setSubmit] = useState(false);
    const[estado,setEstado] = useState(0);
    const [mensagem,setMensagem] = useState({
        texto:null,
        cor:null,
    });

    function reiniciaDados() {
        localStorage.removeItem("avaliacao" + avaliacao.id);
        Router.reload();
    }

    async function enviaDados() {
        let saida = 0;
        for (let i = 0; i < rascunho.modulosGuia.length; i++) {
            for (let j = 0; j < rascunho.modulos[rascunho.modulosGuia[i]].perguntasGuia.length; j++) {
                if(rascunho.modulos[rascunho.modulosGuia[i]].perguntas[rascunho.modulos[rascunho.modulosGuia[i]].perguntasGuia[j]] === null){
                    saida = 1;
                    break;
                }
            }
        }

        if(saida !== 1){
            try {
                const reposta = await axios.post(process.env.NEXT_PUBLIC_API_URL+"/relatorio",rascunho);
                console.log(reposta.data);
                setEstado(0);
                if(reposta.status === 200){
                    setMensagem({texto:"Sucesso.",cor:"w3-green"});
                    setTimeout(function () {
                        setMensagem({texto:null,cor:null});
                        rascunho.estado = 2;
                        rascunho.relatorio = reposta.data.id;
                        localStorage.setItem("avaliacao" + avaliacao.id, JSON.stringify(rascunho));
                        Router.reload();
                    },3000)

                }else{
                    setMensagem({texto:"Erro:1",cor:"w3-red"});
                }
            }catch (e) {
                console.log(e);
                setEstado(0);
                setMensagem({texto:"Erro:2",cor:"w3-red"});
            }
        }else{
            setEstado(0);
            setMensagem({texto:"Responda todas as perguntas.",cor:"w3-red"});
            console.log("b");
        }
    }

    return (
        <>
            {avaliacao.Modulo.map(function (modulo,index) {
                return(
                    <ModuloRelatorio
                        key={"modulo"+index}
                        modulo={modulo}
                        rascunho={rascunho}
                        setRacunho={function (aux) {
                            props.setRacunho(aux);
                        }}
                        submit={submit}
                    />
                );
            })}
            <div className={"corPrimariaTr "+styles.Painel}>
                <button className={"corPrimaria w3-ripple "+styles.Botao} onClick={function (e) {
                    e.preventDefault();
                    if(estado === 0){
                        setSubmit(true);
                        setEstado(1);
                        setMensagem({texto:<div className={styles.ImgLoad}><Image className={"w3-spin "} src={loading}/></div>,cor:"corPrimaria"});
                        enviaDados();
                    }
                }}>
                    Enviar
                </button>
                <button className={"corPrimaria w3-ripple "+styles.Botao} onClick={function (e) {
                    e.preventDefault();
                    if(estado === 0){
                        reiniciaDados();
                    }
                }}>
                    Reiniciar
                </button>
            </div>
            {mensagem.texto
                &&
                <div className={mensagem.cor+" "+styles.Mensagem}>
                    {mensagem.texto}
                </div>
            }
        </>
    );
}
