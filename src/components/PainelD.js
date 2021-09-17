import styles from '../../styles/components/Painel.module.css';
import DataTable from 'react-data-table-component';
import lixo from "../../public/icones/icons8_delete_trash_24px.png";
import editar from "../../public/icones/icons8_edit_delivery_terms_30px.png";
import Link from 'next/link';
import Image from "next/image";
import Router from "next/router";
import {useEffect, useState} from "react";



export default function PainelD(props) {
    console.log(props.avaliacoes);
    const columns = [
        {
            name: 'Nome',
            selector: row => row.nome,
        },
        {
            name: 'Link',
            selector: row => row.link,
        },
        {
            name: 'Editar',
            selector: row => row.editar,
        },
        {
            name: 'Deletar',
            selector: row => row.deletar,
        },

    ];
    const [data,setData] = useState([]);

    useEffect(function () {
        geraData();
    },[]);



    function geraData(){
        let auxData = [];
        for (let i = 0; i < props.avaliacoes.length; i++) {
            const avalaicao = props.avaliacoes[i];
            const modelo = {
                id: avalaicao.id,
                nome: avalaicao.nome,
                link: <Link href={avalaicao.link}><a>Link</a></Link>,
                editar: <Image className={"w3-ripple"} src={editar} width={20} height={20}/>,
                deletar: <Image className={"w3-ripple"} src={lixo} width={20} height={20}/>
            }
            auxData.push(modelo);
        }
        setData(auxData);
    }

    function vaiParaCriador(e) {
        e.preventDefault();
        Router.push("criador");
    }

    return (
        <div className={"corPrimariaText corPrimariaTr "+styles.Painel}>
            <h1>Painel de controle</h1>
            <button className={"w3-ripple corPrimaria "+styles.Botao} onClick={vaiParaCriador}>Criar Avaliação</button>
            <div className={"corPrimariaText corPrimariaTrTr "+styles.Painel2}>
                <h1>Avaliações</h1>
                <DataTable
                    columns={columns}
                    data={data}
                />
            </div>
        </div>
    );
}
