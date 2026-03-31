import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import css from './Login1.module.css';
import Titulo from "../components/Titulo/Titulo.jsx";
import Botao from "../components/Botao/Botao.jsx";
import Input from "../components/Input/Input.jsx";
import Mensagem from "../components/Mensagem/Mensagem.jsx";

export default function RecuperarSenha() {
    const [passo, setPasso] = useState(1);
    const [email, setEmail] = useState('');
    const [codigo, setCodigo] = useState('');
    const [novaSenha, setNovaSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [mensagem, setMensagem] = useState({ tipo: '', texto: '' });

    const navigate = useNavigate();

    const handleEnviarCodigo = (e) => {
        e.preventDefault();

        if (!email) {
            setMensagem({ tipo: 'erro', texto: 'Por favor, insira o seu e-mail.' });
            return;
        }

        fetch('http://10.92.3.156:5000', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        })
            .then(response => response.json().then(data => ({ ok: response.ok, data })))
            .then(({ ok, data }) => {
                if (ok) {
                    setMensagem({ tipo: 'sucesso', texto: 'Código enviado para o seu e-mail!' });
                    setPasso(2);
                } else {
                    setMensagem({ tipo: 'erro', texto: data.mensagem || 'E-mail não encontrado no sistema.' });
                }
            })
            .catch(() => {
                setMensagem({ tipo: 'erro', texto: 'Erro ao conectar com o servidor.' });
            });
    };

    const handleVerificarCodigo = (e) => {
        e.preventDefault();

        fetch('http://localhost:5000/recuperar-senha/validar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, codigo })
        })
            .then(response => response.json().then(data => ({ ok: response.ok, data })))
            .then(({ ok, data }) => {
                if (ok) {
                    setMensagem({ tipo: 'sucesso', texto: 'Código validado com sucesso!' });
                    setPasso(3);
                } else {
                    setMensagem({ tipo: 'erro', texto: data.mensagem || 'Código inválido ou expirado.' });
                }
            })
            .catch(() => {
                setMensagem({ tipo: 'erro', texto: 'Erro ao conectar com o servidor.' });
            });
    };

    const handleAlterarSenha = (e) => {
        e.preventDefault();

        if (novaSenha !== confirmarSenha) {
            setMensagem({ tipo: 'erro', texto: 'As senhas não coincidem.' });
            return;
        }

        fetch('http://localhost:5000/recuperar-senha/alterar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, nova_senha: novaSenha })
        })
            .then(response => response.json().then(data => ({ ok: response.ok, data })))
            .then(({ ok, data }) => {
                if (ok) {
                    setMensagem({ tipo: 'sucesso', texto: 'Senha alterada com sucesso! A redirecionar...' });
                    setTimeout(() => navigate('/login'), 2000);
                } else {
                    setMensagem({ tipo: 'erro', texto: data.mensagem || 'Erro ao alterar a senha.' });
                }
            })
            .catch(() => {
                setMensagem({ tipo: 'erro', texto: 'Erro ao conectar com o servidor.' });
            });
    };

    return (
        <div className={"container-fluid " + css.secao}>

            <Mensagem tipo={mensagem.tipo} texto={mensagem.texto} onClose={() => setMensagem({tipo: '', texto: ''})} />

            <div className="row min-vh-100 align-items-center">
                <div className={"col-md-6 col-lg-7 " + css.padding}>

                    {passo === 1 && (
                        <div className="d-flex flex-column align-items-start justify-content-center w-100">
                            <Titulo titulo={'Enviar código para e-mail'} cor={'azul-claro'} />
                            <p className="text-muted mt-3 mb-4">
                                Informe o e-mail cadastrado para receber o código de recuperação.
                            </p>
                            <form onSubmit={handleEnviarCodigo} className={"d-flex flex-column gap-4 w-100 " + css.width}>
                                <Input
                                    label="E-mail"
                                    type="email"
                                    placeholder="exemplo@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required={true}
                                />
                                <div className="d-flex flex-column gap-3 mt-3 align-items-center w-100">
                                    <div onClick={handleEnviarCodigo} className="w-100 text-center">
                                        <Botao cor={'amarelo'} texto={'Enviar código'} type="submit" />
                                    </div>
                                    <Link to="/login" style={{textDecoration: 'none'}} className="mt-2 text-center">
                                        <Botao cor={'vazadoamarelo'} texto={'Voltar ao login'} type="button" />
                                    </Link>
                                </div>
                            </form>
                        </div>
                    )}

                    {passo === 2 && (
                        <div className="d-flex flex-column align-items-start justify-content-center w-100">
                            <Titulo titulo={'Verificação de código'} cor={'azul-claro'} />
                            <p className="text-muted mt-3 mb-4">
                                Enviamos um código de verificação para o seu e-mail.
                            </p>
                            <form onSubmit={handleVerificarCodigo} className={"d-flex flex-column gap-4 w-100 " + css.width}>
                                <Input
                                    label="Digite o código"
                                    type="text"
                                    placeholder="000000"
                                    value={codigo}
                                    onChange={(e) => setCodigo(e.target.value)}
                                    required={true}
                                />
                                <div className="d-flex flex-column gap-3 mt-3 align-items-center w-100">
                                    <div onClick={handleVerificarCodigo} className="w-100 text-center">
                                        <Botao cor={'amarelo'} texto={'Verificar código'} type="submit" />
                                    </div>
                                    <div onClick={() => setPasso(1)} className="mt-2 text-center">
                                        <Botao cor={'vazadoamarelo'} texto={'Mudar e-mail'} type="button" />
                                    </div>
                                </div>
                            </form>
                        </div>
                    )}

                    {passo === 3 && (
                        <div className="d-flex flex-column align-items-start justify-content-center w-100">
                            <Titulo titulo={'Redefinir senha'} cor={'azul-claro'} />
                            <p className="text-muted mt-3 mb-4">
                                Digite a sua nova senha abaixo.
                            </p>
                            <form onSubmit={handleAlterarSenha} className={"d-flex flex-column gap-4 w-100 " + css.width}>
                                <Input
                                    label="Nova senha"
                                    type="password"
                                    placeholder="Digite a nova senha"
                                    value={novaSenha}
                                    onChange={(e) => setNovaSenha(e.target.value)}
                                    required={true}
                                />
                                <Input
                                    label="Confirmar nova senha"
                                    type="password"
                                    placeholder="Repita a nova senha"
                                    value={confirmarSenha}
                                    onChange={(e) => setConfirmarSenha(e.target.value)}
                                    required={true}
                                />
                                <div onClick={handleAlterarSenha} className="w-100 text-center mt-3">
                                    <Botao cor={'amarelo'} texto={'Alterar senha'} type="submit" />
                                </div>
                            </form>
                        </div>
                    )}

                </div>

                <div className={"col-md-6 col-lg-5 d-none d-md-flex align-items-stretch p-0"}>
                    <img className={css.imagem} src='/cachorro_macaco.png' alt="Cachorro com um macaco de pelúcia"/>
                </div>
            </div>
        </div>
    );
}