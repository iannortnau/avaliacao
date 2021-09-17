import styles from '../../styles/components/Modulo.module.css'
import DataTable from 'react-data-table-component';
import lixo from "../../public/icones/icons8_delete_trash_24px.png";
import Link from 'next/link'
import Image from "next/image";
import Router from "next/router";
import {useState} from "react";
import down from "../../public/icones/icons8_scroll_down_48px.png";
import up from "../../public/icones/icons8_scroll_up_48px.png";
import loading from "../../public/icones/icons8_swirl_24px_2.png";
import axios from "axios";

export default function Modulo(props) {
    const [estado,setEstado] = useState(0);
    const [hide,setHide] = useState(true);
    const [modulo,setModulo] = useState({});
    const [submit,setSubmit] = useState(false);
    const [titulo,setTitulo] = useState(props.infos.titulo);
    const [tituloEstatico,setTituloEstatico] = useState(props.infos.titulo);
    const [mensagem,setMensagem] = useState({
        texto:null,
        cor:null,
    });

    function mudaHide() {
        setHide(!hide);
    }

    async function atualizaTitulo() {
        if(titulo.length>0){
            const data = {
                data:{
                    titulo:titulo,
                }
            }
            try {
                const resposta = await axios.put(process.env.NEXT_PUBLIC_API_URL+"/modulo/"+props.infos.id,data);
                if(resposta.status === 200){
                    setTituloEstatico(titulo);
                    setEstado(0);
                    setMensagem({texto:"Sucesso.",cor:"w3-green"});
                    setTimeout(function () {
                        setMensagem({texto:null,cor:null});
                    },3000)
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

    async function deletaModulo(){
        try {
            const resposta = await axios.delete(process.env.NEXT_PUBLIC_API_URL+"/modulo/"+props.infos.id);
            console.log(resposta);
            if(resposta.status === 200){
                setEstado(0);
                props.listaModulos();
            }
        }catch (e) {
            console.log(e);
            setEstado(0);
            setMensagem({texto:"Erro:3",cor:"w3-red"});
        }
    }

    if(hide){
        return (
            <div className={"corPrimariaText corPrimariaTr w3-ripple "+styles.ModuloHide} onClick={mudaHide}>
                <h3>Módulo: {props.infos.titulo}</h3>
                <div className={styles.Img}>
                    <Image src={down}/>
                </div>
            </div>
        );
    }else {
        return (
            <div className={"corPrimariaText corPrimariaTr "+styles.ModuloNaoHide}>
                <div className={styles.Nav}>
                    <h3>Módulo: {tituloEstatico}</h3>
                    <div className={styles.Img}>
                        <Image className={"w3-ripple"} onClick={mudaHide} src={up}/>
                    </div>
                </div>
                <form className={"corPrimariaTrTr "+styles.ModuloNaoHideForm}>
                    <div className={styles.Linha}>
                        <h4>Título:</h4>
                        <input value={titulo} className={(submit === true && titulo.length === 0)?styles.InputErro:styles.Input}  onChange={function (aux) {
                            setTitulo(aux.target.value);
                        }}/>
                    </div>

                    <button className={"corPrimaria w3-ripple "+styles.Botao} onClick={function (e) {
                        e.preventDefault();
                        if(estado === 0){
                            setSubmit(true);
                            setEstado(1);
                            setMensagem({texto:<div className={styles.ImgLoad}><Image className={"w3-spin "} src={loading}/></div>,cor:"corPrimaria"});
                            atualizaTitulo();
                        }
                    }}>
                        Atualiazar Título
                    </button>

                    {/*props.idAvaliacao === null
                            ?

                                Salvar
                            </button>
                            :
                            <button className={"corPrimaria w3-ripple "+styles.Botao} onClick={function (e) {
                                e.preventDefault();
                            }}>
                                Atualizar
                            </button>
                        */}
                </form>

                {mensagem.texto
                &&
                <div className={mensagem.cor+" "+styles.Mensagem}>
                    {mensagem.texto}
                </div>
                }

                <button className={"w3-red w3-ripple "+styles.Botao} onClick={function (e) {
                    e.preventDefault();
                    if(estado === 0){
                        setSubmit(true);
                        setEstado(1);
                        setMensagem({texto:<div className={styles.ImgLoad}><Image className={"w3-spin "} src={loading}/></div>,cor:"corPrimaria"});
                        deletaModulo();
                    }
                }}>
                    Deletar Módulo
                </button>

            </div>
        );
    }
}
