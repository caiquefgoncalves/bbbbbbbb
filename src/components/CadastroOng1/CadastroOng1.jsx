import Titulo from "../Titulo/Titulo.jsx";
import css from "./CadastroOng1.module.css"
import Input from "../Input/Input.jsx";
import BotaoAlternar from "../BotaoAlternar/BotaoAlternar.jsx";
import Botao from "../Botao/Botao.jsx";
import Select from "../Select/Select.jsx";


export default function CadastroOng1() {
    return(
        <section>
            <div className={css.cadastroOng1}>
                <Titulo titulo={'Venha fazer parte da mudança!'} cor={'laranja'}/>
                <BotaoAlternar ong={true} />
            </div>
            <div className={css.formulario}>
                <div className={css.campos}>
                    <Input label={'Nome'} type={'text'} placeholder={'Digite seu nome'} required={true}/>
                    <Input label={'Descrição breve'} type={'text'} placeholder={'Descrição breve sobre sua ONG'} required={true}/>
                    <Input label={'Senha'} type={'password'} placeholder={'Crie uma senha'} required={true}/>
                    <Input label={'Localização'} type={'text'} placeholder={'Digite sua localização'} required={true}/>
                    <Input label={'Código do banco'} type={'text'} placeholder={'Digite o código do banco'} required={true}/>
                    <Input label={'Número da conta'} type={'text'} placeholder={'Digite o número da conta'} required={true}/>
                    <Input label={'Chave PIX'} type={'text'} placeholder={'Digite a chave PIX'} required={true}/>
                    <Input label={'CNPJ'} type={'text'} placeholder={'Digite o CNPJ'} required={true}/>
                </div>
                <div className={css.campos}>
                    <Input tamanho={'Big'} label={'Descrição longa'} type={'text'} placeholder={'Descrição longa sobre sua ONG'} required={true}/>
                    <Input label={'Confirmar senha'} type={'password'} placeholder={'Confirme sua senha'} required={true}/>
                    <Select label={'Categoria'} options={['Escolha uma categoria', 'Animal', 'Escolar', 'Comida']}/>
                    <Input label={'Número da agência'} type={'text'} placeholder={'Digite o número da sua agência'} required={true}/>
                    <Select label={'Tipo de conta'} options={['Escolha um tipo de conta', 'Conta-corrente', 'Poupança', 'Conta salário', 'Conta digital', 'Conta PJ']}/>
                    <Input label={'Foto de perfil'} type={'file'} required={true}/>
                </div>
                <Botao texto={'Cadastre-se'} cor={'rosa'}/>
            </div>

        </section>



    )
}