import styles from '../../styles/components/Avaliacao.module.css'
import DataTable from 'react-data-table-component';
import lixo from "../../public/icones/icons8_delete_trash_24px.png";
import Link from 'next/link'
import Image from "next/image";
import Router from "next/router";
import {useState} from "react";
import up from "../../public/icones/icons8_scroll_up_48px.png";
import down from "../../public/icones/icons8_scroll_down_48px.png";

export default function Avaliacao(props) {
    const [hide,setHide] = useState(true);
    const [nome,setNome] = useState("");
    const [criador,setCriador] = useState("");
    const [descricao,setDescricao] = useState("");
    const [avaliacao,setAvaliacao] = useState({
        id: props.id,
        nome: '',
        descricao: '',
        criador: ''
    });

    console.log(nome);

    function mudaHide() {
        setHide(!hide);
    }

    function salvaDados(){

    }

    if(hide){
        return(
            <div className={"corPrimariaTr corPrimariaText w3-ripple "+styles.AvaliacaoHide} onClick={mudaHide}>
                <h2>Avaliação: {avaliacao.nome}</h2>
                <div className={styles.Img}>
                    <Image src={down}/>
                </div>
            </div>
        );
    }else {
        return(
            <div className={"corPrimariaTr corPrimariaText "+styles.AvaliacaoNaoHide}>
                <div className={styles.AvaliacaoNaoHideNav}>
                    <h2>Avaliação: {avaliacao.nome}</h2>
                    <div className={styles.Img}>
                        <Image src={up} onClick={mudaHide}/>
                    </div>
                </div>
                <form className={styles.AvaliacaoNaoHideForm}>
                    <h3>Nome:</h3>
                    <input className={styles.Input} onChange={function (aux) {
                        setNome(aux.target.value);
                    }}/>

                    <h3>Criador:</h3>
                    <input className={styles.Input} onChange={function (aux) {
                        setCriador(aux.target.value);
                    }}/>

                    <h3>Descrição:</h3>
                    <textarea className={styles.Input} onChange={function (aux) {
                        setDescricao(aux.target.value);
                    }}/>

                    <button className={"corPrimaria "+styles.Botao} onClick={function (e) {
                        e.preventDefault();
                    }}>
                        Salvar
                    </button>
                </form>
            </div>
        );
    }

}
