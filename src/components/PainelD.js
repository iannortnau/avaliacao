import styles from '../../styles/components/Painel.module.css'
import DataTable from 'react-data-table-component';
import lixo from "../../public/icones/icons8_delete_trash_24px.png";
import Link from 'next/link'
import Image from "next/image";
import Router from "next/router";

export default function PainelD() {
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
            name: 'Deletar',
            selector: row => row.deletar,
            right:true
        },

    ];
    const data = [
        {
            id: 1,
            nome: 'RODA DA VIDA - NA BUSCA DA PLENITUDE DA VIDA',
            link: <Link href="https://nextjs.org/docs/api-reference/next/link"><a>http://localhost:3000/admin/painel</a></Link>,
            deletar: <Image className={"w3-ripple"} src={lixo} width={20} height={20}/>
        },
    ];

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
