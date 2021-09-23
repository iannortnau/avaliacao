import styles from '../../styles/components/Grafico.module.css'
import {useEffect, useRef, useState} from "react";
import Router, { useRouter } from 'next/router'
import axios from "axios";
import Image from "next/image";
import loading from "../../public/icones/icons8_swirl_24px_2.png";
import fetch from "node-fetch";
import {Radar,toBase64Image} from 'react-chartjs-2';

export default function Grafico(props) {
    const chartRef = useRef(null);
    const ref = useRef(null);
    const avaliacao = props.avaliacao;
    const rascunho = props.rascunho;
    const [submit,setSubmit] = useState(false);
    const [estado,setEstado] = useState(0);
    const [mensagem,setMensagem] = useState({
        texto:null,
        cor:null,
    });
    const [tamanho,setTamanho] = useState(0);
    const [data,setData] = useState({
        labels: [],
        datasets: [
            {
                label: avaliacao.nome,
                backgroundColor: 'rgba(179,181,198,0.2)',
                borderColor: 'rgba(179,181,198,1)',
                pointBackgroundColor: 'rgba(179,181,198,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(179,181,198,1)',
                data: []
            },
            {
                label: "",
                backgroundColor: 'rgba(179,181,198,0)',
                borderColor: 'rgba(179,181,198,0)',
                pointBackgroundColor: 'rgba(179,181,198,0)',
                pointBorderColor: 'rgba(255,255,255,0)',
                pointHoverBackgroundColor: 'rgba(255,255,255,0)',
                pointHoverBorderColor: 'rgba(179,181,198,0)',
                data: [10,0]
            },
        ]
    });

    useEffect(function () {
        geraData()
    },[]);

    async function enviaPdf(e) {
        try{
            const base64Image = chartRef.current.toBase64Image();
            //console.log(base64Image);
            const resposta = await axios.post(process.env.NEXT_PUBLIC_API_URL+"/pdf",{
                avaliacao:avaliacao,
                rascunho:rascunho,
                graficoData:base64Image
            });
            if(resposta.status === 200){
                setEstado(0);
                setMensagem({texto:"Sucesso.",cor:"w3-green"});
                setTimeout(function () {
                    setMensagem({texto:null,cor:null});
                },5000);
            }else{
                setMensagem({texto:"Erro:1",cor:"w3-red"});
            }
        }catch (e) {
            console.log(e);
            setEstado(0);
            setMensagem({texto:"Erro:2",cor:"w3-red"});
        }

    }

    function geraData() {
        console.log(rascunho);
        for (let i = 0; i < avaliacao.Modulo.length; i++) {
            data.labels.push(avaliacao.Modulo[i].titulo);
        }
        for (let i = 0; i < rascunho.modulosGuia.length; i++) {
            data.datasets[0].data.push(rascunho.modulos[rascunho.modulosGuia[i]].media);
        }
    }


    function reiniciaDados() {
        localStorage.removeItem("avaliacao" + avaliacao.id);
        Router.reload();
    }

    async function volta() {
        rascunho.estado = 1;
        try {
            await axios.delete(process.env.NEXT_PUBLIC_API_URL+"/relatorio/"+rascunho.relatorio);
            rascunho.relatorio = null;
            localStorage.setItem("avaliacao" + avaliacao.id, JSON.stringify(rascunho));
            Router.reload();
        }catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <div className={"corPrimariaTr "+styles.Painel}>
                <button className={"corPrimaria w3-ripple "+styles.Botao} onClick={function (e) {
                    e.preventDefault();
                    if(estado === 0){
                        setSubmit(true);
                        setEstado(1);
                        setMensagem({texto:<div className={styles.ImgLoad}><Image className={"w3-spin "} src={loading}/></div>,cor:"corPrimaria"});
                        volta();
                    }
                }}>
                    Voltar
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
            <div ref={ref} className={"corPrimariaText "+styles.Painel2}>
                <h1>Gráfico:</h1>
                <Radar
                    data={data}
                    width={500}
                    height={500}
                    ref={chartRef}
                    options={{
                        plugins: {
                            legend: {
                                labels: false
                            }
                        }}
                    }
                />
            </div>
            <div className={"corPrimariaTr "+styles.Painel}>
                <button className={"corPrimaria w3-ripple "+styles.Botao2} onClick={function (e) {
                    e.preventDefault();
                    if(estado === 0){
                        setSubmit(true);
                        setEstado(1);
                        setMensagem({texto:<div className={styles.ImgLoad}><Image className={"w3-spin "} src={loading}/></div>,cor:"corPrimaria"});
                        enviaPdf(e);
                    }
                }}>
                    Enviar Como Pdf por Email
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
