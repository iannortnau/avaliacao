import styles from '../../styles/components/PainelTituloRelatorio.module.css'
import DataTable from 'react-data-table-component';
import lixo from "../../public/icones/icons8_delete_trash_24px.png";
import Link from 'next/link'
import Image from "next/image";
import Router from "next/router";
import {useEffect, useState} from "react";
import loading from "../../public/icones/icons8_swirl_24px_2.png";
import moment from "moment";

export default function PainelTituloRelatorio(props) {
    const [submit,setSubmit] = useState(false);
    const [nome,setNome] = useState("");
    const [email,setEmail] = useState("");
    const[estado,setEstado] = useState(0);
    const [mensagem,setMensagem] = useState({
        texto:null,
        cor:null,
    });
    const rascunho = props.rascunho;
    const avaliacao = props.avaliacao;

    useEffect(function () {
        if(rascunho.estado !== 0){
            setNome(rascunho.usuarioNome);
            setEmail(rascunho.usuarioEmail);
        }
    })

    function vaiParaCriador(e) {
        e.preventDefault();
        Router.push("painel");
    }

    function atualizaDados() {
        if(nome.length>0 && email.length>0) {
            rascunho.estado = 1;
            rascunho.usuarioNome = nome;
            rascunho.usuarioEmail = email;

            localStorage.setItem("avaliacao" + avaliacao.id, JSON.stringify(rascunho));
            Router.reload();
        }else {
            setEstado(0);
            setMensagem({texto:"Preencha todos os campos.",cor:"w3-red"});
        }
    }

    function reiniciaDados() {
        localStorage.removeItem("avaliacao" + avaliacao.id);
        Router.reload();
    }

    return (
        <div className={"corPrimariaText corPrimariaTr "+styles.Painel}>
            <h1>{avaliacao.nome}</h1>
            <h3>{avaliacao.descricao}</h3>
            <h5>{avaliacao.criador}</h5>
            {rascunho.estado===0
                ?
                <form className={"corPrimariaTrTr "+styles.Form}>
                    <h3>Informe seu nome e email</h3>
                    <div className={styles.Linha}>
                        <h4>Nome:</h4>
                        <input value={nome} className={(submit === true && nome.length === 0)?styles.InputErro:styles.Input}  onChange={function (aux) {
                            setNome(aux.target.value);
                        }}/>
                    </div>
                    <div className={styles.Linha}>
                        <h4>Email:</h4>
                        <input type={"email"} value={email} className={(submit === true && email.length === 0)?styles.InputErro:styles.Input}  onChange={function (aux) {
                            setEmail(aux.target.value);
                        }}/>
                    </div>

                    {mensagem.texto
                    &&
                    <div className={mensagem.cor+" "+styles.Mensagem}>
                        {mensagem.texto}
                    </div>
                    }
                    <button className={"corPrimaria w3-ripple "+styles.Botao} onClick={function (e) {
                        e.preventDefault();
                        if(estado === 0){
                            setSubmit(true);
                            setEstado(1);
                            setMensagem({texto:<div className={styles.ImgLoad}><Image className={"w3-spin "} src={loading}/></div>,cor:"corPrimaria"});
                            atualizaDados();
                        }
                    }}>
                        Enviar
                    </button>
                </form>
                :
                <>
                    <div className={"corPrimariaTrTr "+styles.Painel2}>
                        <h5><b>Nome:</b> {nome}</h5>
                        <h5><b>Email:</b> {email}</h5>
                        <h5><b>Data:</b> {moment(new Date()).format("DD/MM/YYYY")}</h5>

                    </div>
                </>
            }
            {props.estado === 0 && <button className={"w3-ripple corPrimaria "+styles.Botao} onClick={vaiParaCriador}>Voltar</button>}
        </div>
    );
}
