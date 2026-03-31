import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ConfirmarEmail1.module.css';
import Titulo from "../Titulo/Titulo.jsx";
import Botao from "../Botao/Botao.jsx";
import Mensagem from "../Mensagem/Mensagem.jsx";

export default function ConfirmarEmailComponente() {
    const [codigo, setCodigo] = useState('');
    const [mensagem, setMensagem] = useState({ tipo: '', texto: '' });
    const [carregando, setCarregando] = useState(false);
    const navigate = useNavigate();

    const email = localStorage.getItem('email_para_confirmar') || '';

    const handleConfirmar = (e) => {
        e.preventDefault();
        setCarregando(true);
        setMensagem({ tipo: '', texto: '' });

        const formData = new FormData();
        formData.append('codigo_digitado', codigo);
        formData.append('email', email);

        fetch('http://127.0.0.1:5000/confirmar_email', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json().then(data => ({ status: response.status, ok: response.ok, data })))
            .then(({ status, ok, data }) => {
                if (ok) {
                    setMensagem({ tipo: 'sucesso', texto: data.message });
                    localStorage.removeItem('email_para_confirmar');
                    setTimeout(() => navigate('/login'), 2500);
                } else {
                    setMensagem({ tipo: 'erro', texto: data.message || 'Erro ao validar código' });
                }
                setCarregando(false);
            })
            .catch(() => {
                setMensagem({ tipo: 'erro', texto: 'Erro de conexão com o servidor.' });
                setCarregando(false);
            });
    };

    return (
        <div className={"container-fluid " + styles.secao}>
            <Mensagem
                tipo={mensagem.tipo}
                texto={mensagem.texto}
                onClose={() => setMensagem({ tipo: '', texto: '' })}
            />

            <div className="row min-vh-100 align-items-stretch">
                <div className={"col-md-6 col-lg-7 d-flex flex-column align-items-start justify-content-center " + styles.padding}>
                    <div className={styles.width}>
                        <Titulo titulo={'Verificar E-mail'} cor={'azul-claro'} />

                        <div className="mt-4 w-100">
                            <form onSubmit={handleConfirmar} className="w-100">
                                <div className="w-100">
                                    <label className={styles.label}>Código de Verificação</label>
                                    <input
                                        type="text"
                                        maxLength="6"
                                        className={styles.inputCodigo}
                                        placeholder="000000"
                                        value={codigo}
                                        onChange={(e) => setCodigo(e.target.value.replace(/\D/g, ''))}
                                        required
                                    />
                                    <p className={styles.subtitulo}>
                                        Digite o código de 6 dígitos enviado para seu e-mail
                                    </p>
                                </div>

                                <div className="d-flex flex-column align-items-center justify-content-center w-100 mt-4">
                                    <div className="w-100 d-flex justify-content-center">
                                        <Botao
                                            cor={'amarelo'}
                                            texto={carregando ? 'Validando...' : 'Confirmar Registro'}
                                            type="submit"
                                            disabled={carregando || codigo.length < 6}
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className={"col-md-6 col-lg-5 d-none d-md-flex align-items-stretch p-0"}>
                    <img
                        className={styles.imagem}
                        src='/cachorro_macaco.png'
                        alt="Cachorro com um macaco de pelúcia"
                    />
                </div>
            </div>
        </div>
    );
}