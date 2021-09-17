import Header from "../../components/Header";
import PainelD from "../../components/PainelD";
import axios from "axios";

export async function getStaticProps() {
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
            <Header/>
            <PainelD
                avaliacoes={prosps.avaliacoes}
            />
        </div>
    );
}
