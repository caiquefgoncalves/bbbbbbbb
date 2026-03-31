import {Link} from "react-router-dom";
import css from "./Botao.module.css";

export default function Botao({ pagina, texto, cor = "amarelo" }) {
    return (
        <Link to={pagina}>
            <button className={css[cor]}>{texto}</button>
        </Link>
    )
}
