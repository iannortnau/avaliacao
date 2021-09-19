import styles from '../../styles/components/PerguntaRelatorio.module.css'
import {useEffect, useState} from "react";
import Router, { useRouter } from 'next/router'
import axios from "axios";
import Image from "next/image";
import loading from "../../public/icones/icons8_swirl_24px_2.png";

export default function PerguntaReletorio(props) {
    const idModulo = props.idModulo;
    const pergunta = props.pergunta;
    const rascunho = props.rascunho;
    const [submit,setSubmit] = useState(false);
    const[estado,setEstado] = useState(0);
    const [mensagem,setMensagem] = useState({
        texto:null,
        cor:null,
    });
    const [resposta,setResposta] = useState(null);

    useEffect(function () {
        //console.log(rascunho.modulos[idModulo].perguntas[pergunta.id]);
        setResposta(rascunho.modulos[idModulo].perguntas[pergunta.id]);
    },[]);

    function atualizaDados(valor) {
        rascunho.modulos[idModulo].perguntas[pergunta.id]=valor;
        props.setRacunho(rascunho);
    }

    return (
        <div key={"pergunta"+pergunta.id+resposta} className={props.submit===true&&resposta===null?"corPrimariaTrTr corPrimariaText "+styles.PainelErro:"corPrimariaTrTr corPrimariaText "+styles.Painel}>
            <p><b>{pergunta.titulo}: </b>{pergunta.descricao}</p>
            <div className={styles.Linha}>
                <div className={styles.Linha}>
                    <button className={1===resposta?"corPrimaria w3-ripple "+styles.Botao:"corPrimariaTr w3-ripple "+styles.Botao} onClick={function (e) {
                        e.preventDefault();
                        setResposta(1);
                        atualizaDados(1);
                    }}>
                        1
                    </button>
                    <button className={2===resposta?"corPrimaria w3-ripple "+styles.Botao:"corPrimariaTr w3-ripple "+styles.Botao} onClick={function (e) {
                        e.preventDefault();
                        setResposta(2);
                        atualizaDados(2);
                    }}>
                        2
                    </button>
                    <button className={3===resposta?"corPrimaria w3-ripple "+styles.Botao:"corPrimariaTr w3-ripple "+styles.Botao} onClick={function (e) {
                        e.preventDefault();
                        setResposta(3);
                        atualizaDados(3);
                    }}>
                        3
                    </button>
                    <button className={4===resposta?"corPrimaria w3-ripple "+styles.Botao:"corPrimariaTr w3-ripple "+styles.Botao} onClick={function (e) {
                        e.preventDefault();
                        setResposta(4);
                        atualizaDados(4);
                    }}>
                        4
                    </button>
                    <button className={5===resposta?"corPrimaria w3-ripple "+styles.Botao:"corPrimariaTr w3-ripple "+styles.Botao} onClick={function (e) {
                        e.preventDefault();
                        setResposta(5);
                        atualizaDados(5);
                    }}>
                        5
                    </button>
                </div>
                <div className={styles.linha}>
                    <button className={6===resposta?"corPrimaria w3-ripple "+styles.Botao:"corPrimariaTr w3-ripple "+styles.Botao} onClick={function (e) {
                        e.preventDefault();
                        setResposta(6);
                        atualizaDados(6);
                    }}>
                        6
                    </button>
                    <button className={7===resposta?"corPrimaria w3-ripple "+styles.Botao:"corPrimariaTr w3-ripple "+styles.Botao} onClick={function (e) {
                        e.preventDefault();
                        setResposta(7);
                        atualizaDados(7);
                    }}>
                        7
                    </button>
                    <button className={8===resposta?"corPrimaria w3-ripple "+styles.Botao:"corPrimariaTr w3-ripple "+styles.Botao} onClick={function (e) {
                        e.preventDefault();
                        setResposta(8);
                        atualizaDados(8);
                    }}>
                        8
                    </button>
                    <button className={9===resposta?"corPrimaria w3-ripple "+styles.Botao:"corPrimariaTr w3-ripple "+styles.Botao} onClick={function (e) {
                        e.preventDefault();
                        setResposta(9);
                        atualizaDados(9);
                    }}>
                        9
                    </button><button className={10===resposta?"corPrimaria w3-ripple "+styles.Botao:"corPrimariaTr w3-ripple "+styles.Botao} onClick={function (e) {
                    e.preventDefault();
                    setResposta(10);
                    atualizaDados(10);
                }}>
                    10
                </button>
                </div>
            </div>
        </div>
    );
}
