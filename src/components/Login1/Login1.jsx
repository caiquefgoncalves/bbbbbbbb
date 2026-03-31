import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import css from './Login1.module.css';
import Input from "../../components/Input/Input.jsx";
import Titulo from "../Titulo/Titulo.jsx";
import Botao from "../Botao/Botao.jsx";
import Mensagem from "../Mensagem/Mensagem.jsx";

export default function Login1() {
    const [cpfCnpj, setCpfCnpj] = useState('');
    const [senha, setSenha] = useState('');
    const [mensagem, setMensagem] = useState({ tipo: '', texto: '' });
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('cpf_cnpj', cpfCnpj);
        formData.append('senha', senha);

        fetch('http://127.0.0.1:5000/login', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json().then(data => ({ status: response.status, ok: response.ok, data })))
            .then(({ status, ok, data }) => {
                if (ok) {
                    localStorage.setItem('usuario_logado', 'true');
                    setMensagem({ tipo: 'sucesso', texto: data.mensagem || 'Logado com sucesso!' });
                    setTimeout(() => navigate('/'), 1500);
                } else {
                    if (data.error === "Verifique o e-mail antes de logar!") {
                        navigate('/confirmar-email');
                    } else {
                        setMensagem({ tipo: 'erro', texto: data.error || 'Dados inválidos.' });
                    }
                }
            })
            .catch(() => {
                setMensagem({ tipo: 'erro', texto: 'Erro de conexão com o servidor.' });
            });
    };

    return (
        <div className={"container-fluid " + css.secao}>
            <Mensagem tipo={mensagem.tipo} texto={mensagem.texto} onClose={() => setMensagem({tipo: '', texto: ''})} />

            <div className="row min-vh-100 align-items-stretch">
                <div className={"col-md-6 col-lg-7 d-flex flex-column align-items-start justify-content-center " + css.padding}>
                    <div className={css.width}>
                        <Titulo titulo={'Bem vindo de volta!'} cor={'azul-claro'}/>

                        <div className="mt-4 w-100">
                            <form onSubmit={handleLogin} className="w-100">
                                <div className="d-flex flex-column align-items-start justify-content-center gap-3 w-100">
                                    <Input
                                        label={"CPF/CNPJ"}
                                        type={"text"}
                                        placeholder={"Digite seu CPF ou CNPJ"}
                                        required={true}
                                        value={cpfCnpj}
                                        onChange={(e) => setCpfCnpj(e.target.value)}
                                    />

                                    <div className="w-100">
                                        <Input
                                            label={"Senha"}
                                            type={"password"}
                                            placeholder={"Digite sua senha"}
                                            required={true}
                                            value={senha}
                                            onChange={(e) => setSenha(e.target.value)}
                                        />
                                        <Link to="/recuperar-senha" className={css.link}>Esqueci minha senha</Link>
                                    </div>
                                </div>

                                <div className="d-flex flex-column align-items-center justify-content-center w-100 mt-4">
                                    <div className="w-100 d-flex justify-content-center">
                                        <Botao cor={'amarelo'} texto={'Login'} type="submit" />
                                    </div>

                                    <div className="d-flex flex-column align-items-center gap-2 mt-4">
                                        <p className={css.p}>Ainda não está no Doar+?</p>
                                        <Link to="/cadastroDoador" style={{textDecoration: 'none'}}>
                                            <Botao cor={'vazadoamarelo'} texto={'Cadastre-se'} type="button" />
                                        </Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className={"col-md-6 col-lg-5 d-none d-md-flex align-items-stretch p-0"}>
                    <img className={css.imagem} src='/cachorro_macaco.png' alt="Cachorro com um macaco de pelúcia"/>
                </div>
            </div>
        </div>
    );
}