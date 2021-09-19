import styles from '../../styles/components/Carregando.module.css'
import DataTable from 'react-data-table-component';
import lixo from "../../public/icones/icons8_delete_trash_24px.png";
import Link from 'next/link'
import Image from "next/image";
import Router from "next/router";
import loading from "../../public/icones/icons8_loader_48px_1.png";

export default function Carregando() {
    return (
        <div className={"corPrimariaText corPrimariaTr "+styles.ModuloHide}>
            <Image className={"w3-spin "} src={loading}/>
        </div>
    );
}
