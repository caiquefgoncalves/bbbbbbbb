import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import css from './CadastroDoador1.module.css';
import Titulo from "../Titulo/Titulo.jsx";
import BotaoAlternar from "../BotaoAlternar/BotaoAlternar.jsx";
import Input from "../Input/Input.jsx";
import Botao from "../Botao/Botao.jsx";
import Mensagem from "../Mensagem/Mensagem.jsx";

export default function CadastroDoador1() {
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [foto, setFoto] = useState(null);
    const [mensagem, setMensagem] = useState({ tipo: '', texto: '' });
    const [carregando, setCarregando] = useState(false);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setFoto(e.target.files[0]);
    };

    const handleCadastro = (e) => {
        e.preventDefault();
        setCarregando(true);
        setMensagem({ tipo: '', texto: '' });

        if (senha !== confirmarSenha) {
            setMensagem({ tipo: 'erro', texto: 'As senhas não coincidem.' });
            setCarregando(false);
            return;
        }

        const formData = new FormData();
        formData.append('nome', nome);
        formData.append('cpf_cnpj', cpf);
        formData.append('telefone', telefone);
        formData.append('email', email);
        formData.append('senha', senha);
        formData.append('confirmar_senha', confirmarSenha);
        formData.append('tipo', 1);

        if (foto) {
            formData.append('foto_perfil', foto);
        }

        fetch('http://127.0.0.1:5000/criar_usuarios', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json().then(data => ({ status: response.status, ok: response.ok, data })))
            .then(({ status, ok, data }) => {
                if (ok) {
                    localStorage.setItem('email_para_confirmar', email);
                    setMensagem({ tipo: 'sucesso', texto: data.message });
                    setTimeout(() => navigate('/confirmar-email'), 2000);
                } else {
                    setMensagem({ tipo: 'erro', texto: data.error || 'Erro ao cadastrar' });
                }
                setCarregando(false);
            })
            .catch((error) => {
                console.error('Erro:', error);
                setMensagem({ tipo: 'erro', texto: 'Erro de conexão com o servidor.' });
                setCarregando(false);
            });
    };

    return (
        <section>
            <Mensagem tipo={mensagem.tipo} texto={mensagem.texto} onClose={() => setMensagem({tipo: '', texto: ''})} />

            <div className={css.organizar}>
                <Titulo titulo={'Venha fazer parte da mudança!'} cor={'rosa'} />
                <BotaoAlternar ong={false}/>
            </div>

            <form className={css.formulario} onSubmit={handleCadastro}>
                <div className={css.campos}>
                    <Input
                        label={'Nome'}
                        name="nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        type={'text'}
                        placeholder={'Digite seu nome'}
                        required={true}
                    />
                    <Input
                        label={'CPF'}
                        name="cpf"
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                        type={'text'}
                        placeholder={'Digite seu CPF'}
                        required={true}
                    />
                    <Input
                        label={'Telefone'}
                        name="telefone"
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                        type={'text'}
                        placeholder={'Digite seu telefone'}
                        required={true}
                    />
                    <Input
                        label={'Email'}
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type={'email'}
                        placeholder={'Digite seu email'}
                        required={true}
                    />
                </div>
                <div className={css.campos}>
                    <Input
                        label={'Senha'}
                        name="senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        type={'password'}
                        placeholder={'Digite sua senha'}
                        required={true}
                    />
                    <Input
                        label={'Confirmar senha'}
                        name="confirmarSenha"
                        value={confirmarSenha}
                        onChange={(e) => setConfirmarSenha(e.target.value)}
                        type={'password'}
                        placeholder={'Confirme sua senha'}
                        required={true}
                    />
                    <Input
                        label={'Foto de perfil'}
                        name="foto"
                        onChange={handleFileChange}
                        type={'file'}
                        required={false}
                    />
                </div>

                <div>
                    <Botao
                        texto={carregando ? 'Cadastrando...' : 'Cadastre-se'}
                        cor={'rosa'}
                        type="submit"
                        disabled={carregando}
                    />
                </div>
            </form>
        </section>
    );
}