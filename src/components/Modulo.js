import styles from '../../styles/components/Modulo.module.css'
import DataTable from 'react-data-table-component';
import lixo from "../../public/icones/icons8_delete_trash_24px.png";
import Link from 'next/link'
import Image from "next/image";
import Router from "next/router";
import {useState} from "react";

export default function Modulo() {
    const [hide,setHide] = useState(false);
    const [modulo,setModulo] = useState({

    });

    if(hide){
        <div className=>

        </div>
    }

    return (
        <div className={"corPrimariaText corPrimariaTr "+styles.Painel}>
            <h2>Criar Módulo:</h2>
            <button className={"w3-ripple corPrimaria "+styles.Botao} onClick={vaiParaCriador}>Criar</button>
        </div>
    );
}
