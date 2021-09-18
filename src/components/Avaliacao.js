import styles from '../../styles/components/Avaliacao.module.css'
import DataTable from 'react-data-table-component';
import lixo from "../../public/icones/icons8_delete_trash_24px.png";
import Link from 'next/link'
import Image from "next/image";
import Router from "next/router";
import {useEffect, useState} from "react";
import up from "../../public/icones/icons8_scroll_up_48px.png";
import down from "../../public/icones/icons8_scroll_down_48px.png";
import loading from "../../public/icones/icons8_swirl_24px_2.png";
import axios from "axios";

export default function Avaliacao(props) {
    const [id,setId] = useState(props.idAvaliacao||null);
    const [estado,setEstado] = useState(0);
    const [hide,setHide] = useState(false);
    const [submit,setSubmit] = useState(false);
    const [nome,setNome] = useState("");
    const [criador,setCriador] = useState("");
    const [descricao,setDescricao] = useState("");
    const [mensagem,setMensagem] = useState({
        texto:null,
        cor:null,
    });

    useEffect(function () {
        pegaDados();
    },[]);

    async function pegaDados(){
        if(id !== null){
            const resposta = await axios.get(process.env.NEXT_PUBLIC_API_URL+"/avaliacao/"+id);
            const axuAvaliacao = resposta.data;
            setNome(axuAvaliacao.nome);
            setCriador(axuAvaliacao.criador);
            setDescricao(axuAvaliacao.descricao);
        }
    }

    function mudaHide() {
        setHide(!hide);
    }

    async function salvaDados(){
        if(nome.length>0 && criador.length>0 && descricao.length>0){
            const data = {
                data:{
                    nome:"test",
                    descricao:"test",
                    criador:"test",
                    link:"test",

                }
            }
            try {
                const resposta = await axios.post(process.env.NEXT_PUBLIC_API_URL+"/avaliacao",data);
                if(resposta.status === 200){
                    props.setIdAvaliacao(resposta.data.id);
                    atualizaDados(resposta.data.id);
                }else{
                    setMensagem({texto:"Erro:1",cor:"w3-red"});
                }
            }catch (e) {
                console.log(e);
                setEstado(0);
                setMensagem({texto:"Erro:2",cor:"w3-red"});
            }
        }else {
            setEstado(0);
            setMensagem({texto:"Preencha todos os campos.",cor:"w3-red"});
        }
    }

    async function atualizaDados(id){
        if(nome.length>0 && criador.length>0 && descricao.length>0){
            const data = {
                data:{
                    nome:nome,
                    descricao:descricao,
                    criador:criador,
                    link:process.env.NEXT_PUBLIC_URL+"/avaliacao/"+id,
                }
            }
            try {
                const resposta = await axios.put(process.env.NEXT_PUBLIC_API_URL+"/avaliacao/"+id,data);
                if(resposta.status === 200){
                    setEstado(0);
                    setMensagem({texto:"Sucesso.",cor:"w3-green"});
                    setTimeout(function () {
                        setMensagem({texto:null,cor:null});
                    },3000)
                }else{
                    setMensagem({texto:"Erro:3",cor:"w3-red"});
                }
            }catch (e) {
                console.log(e);
                setEstado(0);
                setMensagem({texto:"Erro:4",cor:"w3-red"});
            }
        }else {
            setEstado(0);
            setMensagem({texto:"Preencha todos os campos.",cor:"w3-red"});
        }
    }

    if(hide){
        return(
            <div className={"corPrimariaTr corPrimariaText w3-ripple "+styles.AvaliacaoHide} onClick={mudaHide}>
                <h2>Avaliação: {nome}</h2>
                <div className={styles.Img}>
                    <Image src={down}/>
                </div>
            </div>
        );
    }else {
        return(
            <div className={"corPrimariaTr corPrimariaText "+styles.AvaliacaoNaoHide}>
                <div className={styles.AvaliacaoNaoHideNav}>
                    <h2>Avaliação: {nome}</h2>
                    <div className={styles.Img}>
                        <Image className={"w3-ripple"} src={up} onClick={mudaHide}/>
                    </div>
                </div>
                <form className={"corPrimariaTrTr "+styles.AvaliacaoNaoHideForm}>
                    <h3>Nome:</h3>
                    <input value={nome} className={(submit === true && nome.length === 0)?styles.InputErro:styles.Input}  onChange={function (aux) {
                        setNome(aux.target.value);
                    }}/>

                    <h3>Criador:</h3>
                    <input value={criador} className={(submit === true && criador.length === 0)?styles.InputErro:styles.Input} onChange={function (aux) {
                        setCriador(aux.target.value);
                    }}/>

                    <h3>Descrição:</h3>
                    <textarea value={descricao} className={(submit === true && descricao.length === 0)?styles.InputErro:styles.Input} onChange={function (aux) {
                        setDescricao(aux.target.value);
                    }}/>

                    {mensagem.texto
                        &&
                        <div className={mensagem.cor+" "+styles.Mensagem}>
                            {mensagem.texto}
                        </div>
                    }

                    {props.idAvaliacao === null
                        ?
                        <button className={"corPrimaria w3-ripple "+styles.Botao} onClick={function (e) {
                            e.preventDefault();
                            if(estado === 0){
                                setSubmit(true);
                                setEstado(1);
                                setMensagem({texto:<div className={styles.ImgLoad}><Image className={"w3-spin "} src={loading}/></div>,cor:"corPrimaria"});
                                salvaDados();
                            }
                        }}>
                            Salvar
                        </button>
                        :
                        <button className={"corPrimaria w3-ripple "+styles.Botao} onClick={function (e) {
                            e.preventDefault();
                            if(estado === 0){
                                setSubmit(true);
                                setEstado(1);
                                setMensagem({texto:<div className={styles.ImgLoad}><Image className={"w3-spin "} src={loading}/></div>,cor:"corPrimaria"});
                                atualizaDados(props.idAvaliacao);
                            }
                        }}>
                            Atualizar
                        </button>
                    }
                </form>
            </div>
        );
    }

}
