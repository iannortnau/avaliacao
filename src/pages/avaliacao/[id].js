import Header from "../../components/Header";
import PainelCriador from "../../components/PainelCriador";
import PainelCriadorModulo from "../../components/PainelCriadorModulo";
import Avaliacao from "../../components/Avaliacao";
import {useEffect, useState} from "react";
import Router, { useRouter } from 'next/router'
import axios from "axios";
import PainelTituloRelatorio from "../../components/PainelTituloRelatorio";
import Carregando from "../../components/Carregando";
import Relatorio from "../../components/Relatorio";
import Grafico from "../../components/Grafico";
import Head from "next/head";

export default function RelatorioControle() {
    const router = useRouter();
    const [estado,setEstado] = useState(0);
    const [carregando,setCarregando] = useState(true);
    const [id,setId] = useState(router.query.id);
    const [avaliacaoModelo,setAvaliacaoModelo] = useState(null);
    const [avaliacaoModeloRacunho,setAvaliacaoModeloRacunho] = useState(null);

    useEffect(async function () {
        if(router.query.id !== undefined){
            setId(router.query.id);
            pegaDados();
        }
    },[router]);

    useEffect(function () {
        if(avaliacaoModelo !== null){
            pegaRascunho();
        }
    },[avaliacaoModelo]);

    async function pegaDados() {

        try {
            console.log(router.query.id);
            const resultado = await axios.get(process.env.NEXT_PUBLIC_API_URL+"/avaliacao/"+router.query.id);
            console.log(resultado.data);
            if(resultado.status === 200){
                setAvaliacaoModelo(resultado.data);
                setCarregando(false);
            }
        }catch (e) {
            console.log(e);
        }

    }

    function pegaRascunho(){
        const rascunho = localStorage.getItem("avaliacao"+avaliacaoModelo.id);
        if(rascunho !== null){
            setAvaliacaoModeloRacunho(JSON.parse(rascunho));
        }else {
            criaRascunho();
        }
    }

    function criaRascunho() {
        const auxRascunho = {
            estado:0,
            avaliacao:avaliacaoModelo.id,
            relatorio:null,
            data:new Date(),
            usuarioNome:"",
            usuarioEmail:"",
            modulosGuia:[],
            modulos:[],
        }
        for (let i = 0; i < avaliacaoModelo.Modulo.length ; i++) {
            const auxModulo = avaliacaoModelo.Modulo[i];
            auxRascunho.modulosGuia.push(auxModulo.id);
        }
        for (let i = 0; i < avaliacaoModelo.Modulo.length ; i++) {
            const auxModulo = avaliacaoModelo.Modulo[i];
            const auxModeloModulo = {
                media:null,
                perguntasGuia:[],
                perguntas:[]
            }
            for (let j = 0; j < auxModulo.Pergunta.length; j++) {
                const auxPergunta = auxModulo.Pergunta[j];
                auxModeloModulo.perguntasGuia.push(auxPergunta.id);
            }
            for (let j = 0; j < auxModulo.Pergunta.length; j++) {
                const auxPergunta = auxModulo.Pergunta[j];
                auxModeloModulo.perguntas[auxPergunta.id] = null;
            }
            //auxRascunho["modulo"+auxModulo.id] = auxModeloModulo;
            auxRascunho.modulos[auxModulo.id] = auxModeloModulo;
        }
        setAvaliacaoModeloRacunho(auxRascunho);
        console.log(auxRascunho);

    }


    return (
        <div key={"relatorio"+id} className="container">
            <Head>
                <title>Avaliações</title>
                <link rel="shortcut icon" href={process.env.NEXT_PUBLIC_URL+"/icons8_360_degrees.ico"} />
            </Head>
            <Header/>
            {carregando===true
                ?
                <Carregando/>
                :
                <PainelTituloRelatorio
                    avaliacao={avaliacaoModelo}
                    rascunho={avaliacaoModeloRacunho}
                    setRacunho={function (rascunho) {
                        setAvaliacaoModeloRacunho(rascunho);
                        Router.reload();
                    }}
                />
            }
            {(avaliacaoModeloRacunho !== null && avaliacaoModeloRacunho.estado === 1)
                ?
                <Relatorio
                    avaliacao={avaliacaoModelo}
                    rascunho={avaliacaoModeloRacunho}
                    setRacunho={function (rascunho) {
                        localStorage.setItem("avaliacao" + id, JSON.stringify(rascunho));
                        setAvaliacaoModeloRacunho(rascunho);
                    }}
                />
                :
                <></>
            }
            {(avaliacaoModeloRacunho !== null && avaliacaoModeloRacunho.estado === 2)
                ?
                <Grafico
                    avaliacao={avaliacaoModelo}
                    rascunho={avaliacaoModeloRacunho}
                    setRacunho={function (rascunho) {
                        localStorage.setItem("avaliacao" + id, JSON.stringify(rascunho));
                        setAvaliacaoModeloRacunho(rascunho);
                    }}
                />
                :
                <></>
            }
        </div>
    );
}
