import Header from "../../components/Header";
import PainelCriador from "../../components/PainelCriador";
import PainelCriadorModulo from "../../components/PainelCriadorModulo";
import Avaliacao from "../../components/Avaliacao";

export default function Criador() {
    return (
        <div className="container">
            <Header/>
            <PainelCriador/>
            <Avaliacao/>
            <PainelCriadorModulo/>
        </div>
    );
}
