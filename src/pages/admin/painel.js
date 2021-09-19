import Header from "../../components/Header";
import PainelD from "../../components/PainelD";
import axios from "axios";
import Head from "next/head";

export async function getServerSideProps() {
    try {
        const resposta = await axios.get(process.env.NEXT_PUBLIC_API_URL+"/avaliacao");
        return {
            props: {
                avaliacoes: resposta.data
            }, // will be passed to the page component as props
        }
    }catch (e) {
        console.log(e);
    }
}

export default function Painel(prosps) {
    return (
        <div className="container">
            <Head>
                <title>Avaliações</title>
                <link rel="shortcut icon" href={process.env.NEXT_PUBLIC_URL+"/icons8_360_degrees.ico"} />
            </Head>
            <Header/>
            <PainelD
                avaliacoes={prosps.avaliacoes}
            />
        </div>
    );
}
