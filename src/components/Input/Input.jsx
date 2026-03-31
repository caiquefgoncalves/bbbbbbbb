import css from './Input.module.css';

export default function Input({ tamanho = 'inputBig', label, type, placeholder, required = false, name, value, onChange }) {
    return (
        <div className={"d-flex flex-column col-md-6 gap-2"}>
            <label>{label}</label>
            <input
                className={css[tamanho]}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                placeholder={placeholder}
            />
        </div>
    );
}