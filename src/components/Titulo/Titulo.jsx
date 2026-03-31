import css from './Titulo.module.css';

export default function Titulo({titulo, cor = "azul-claro"}) {
    return (
        <div>
            <h2 className={css[cor]}>{titulo}</h2>
        </div>
    )
}