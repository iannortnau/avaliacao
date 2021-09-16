import Header from "../../components/Header";
import PainelCriador from "../../components/PainelCriador";
import PainelCriadorModulo from "../../components/PainelCriadorModulo";
import Avaliacao from "../../components/Avaliacao";
import {useState} from "react";

export default function Criador() {
    const [id,setId] = useState(null);
    return (
        <div className="container">
            <Header/>
            <PainelCriador/>
            <Avaliacao
                idAvaliacao={id}
                setIdAvaliacao={function (auxId){
                    setId(auxId);
                }}
            />
            {id &&
                <PainelCriadorModulo
                    idAvaliacao={id}
                />
            }
        </div>
    );
}
