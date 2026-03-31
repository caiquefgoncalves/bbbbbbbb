import React, { useState } from 'react';
import css from './Header.module.css';
import { Link } from "react-router-dom";

export default function Header() {
    // Estado para controlar se o menu mobile está aberto ou fechado
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Função que alterna o estado do menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className={css.headerContainer}>
            <div className={css.headerContent}>

                {/* Logo */}
                <Link to="/" className={css.logoLink}>
                    <img src="/logo.png" alt="Logo Doar+" className={css.logo} />
                </Link>

                {/* Navegação Desktop */}
                <nav className={css.desktopNav}>
                    <ul className={css.navList}>
                        <li><Link to="/" className={css.link}>Home</Link></li>
                        <li><Link to="/" className={css.link}>Benefícios</Link></li>
                        <li><Link to="/" className={css.link}>Junte-se a nós!</Link></li>
                        <li><Link to="/" className={css.link}>ONGs e projetos</Link></li>
                    </ul>
                </nav>

                {/* Botões Desktop */}
                <div className={css.divbotoes}>
                    <Link to={"/cadastroOng"}><button className={css.cadastro}>Cadastro</button></Link>
                    <Link to={"/login"}><button className={css.login}>Login</button></Link>
                </div>

                {/* Botão Hamburger (Mobile) */}
                <button
                    className={css.hamburgerBtn}
                    onClick={toggleMenu}
                    type="button"
                    aria-label="Abrir menu"
                >
                    <svg width="35" height="25" viewBox="0 0 35 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="2" y1="2" x2="33" y2="2" stroke="#d9d9d9" strokeWidth="4" strokeLinecap="round"/>
                        <line x1="2" y1="12" x2="33" y2="12" stroke="#d9d9d9" strokeWidth="4" strokeLinecap="round"/>
                        <line x1="2" y1="22" x2="33" y2="22" stroke="#d9d9d9" strokeWidth="4" strokeLinecap="round"/>
                    </svg>
                </button>

                {/* Fundo Escuro ao abrir o menu (Overlay) */}
                {isMenuOpen && <div className={css.overlay} onClick={toggleMenu}></div>}

                {/* Menu Lateral Mobile (Substitui o Offcanvas do Bootstrap) */}
                <div className={`${css.mobileMenu} ${isMenuOpen ? css.open : ''}`}>

                    <div className={css.mobileMenuHeader}>
                        <button type="button" className={css.closeBtn} onClick={toggleMenu} aria-label="Fechar">
                            <svg width="35" height="25" viewBox="0 0 35 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <line x1="5" y1="2" x2="30" y2="23" stroke="#d9d9d9" strokeWidth="4" strokeLinecap="round"/>
                                <line x1="30" y1="2" x2="5" y2="23" stroke="#d9d9d9" strokeWidth="4" strokeLinecap="round"/>
                            </svg>
                        </button>
                    </div>

                    <div className={css.mobileMenuBody}>
                        <ul className={css.navListMobile}>
                            <li><Link to="/" className={css.linkMobile} onClick={toggleMenu}>Home</Link></li>
                            <li><Link to="/" className={css.linkMobile} onClick={toggleMenu}>Benefícios</Link></li>
                            <li><Link to="/" className={css.linkMobile} onClick={toggleMenu}>Junte-se a nós!</Link></li>
                            <li><Link to="/" className={css.linkMobile} onClick={toggleMenu}>ONGs e Projetos</Link></li>

                            <li className={css.marginTopMobile}><Link to={"/cadastroOng"} className={css.linkMobile} onClick={toggleMenu}>Cadastro</Link></li>
                            <li><Link to={"/login"} className={css.linkMobile} onClick={toggleMenu}>Login</Link></li>
                        </ul>
                    </div>
                </div>

            </div>
        </header>
    );
}