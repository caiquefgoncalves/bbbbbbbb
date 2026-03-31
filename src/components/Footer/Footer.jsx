import React from 'react';
import css from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={css.footer}>
            <div className={css.container}>
                <div className={css.content}>


                    <div className={css.leftColumn}>
                        <div className={css.footerLogo}>
                            DOAR <span>+</span>
                        </div>

                        <h4 className={css.title}>Sobre a Doar +</h4>

                        <p className={css.textoCinza}>
                            A Doar+ é um portal solidário que conecta<br className={css.desktopOnly} /> pessoas, campanhas e instituições em todo o<br className={css.desktopOnly} /> Brasil, facilitando doações seguras e<br className={css.desktopOnly} /> transparentes.
                        </p>

                        <p className={`${css.textoCinza} ${css.desktopOnly}`}>
                            Compartilhe com seus amigos!
                        </p>
                    </div>


                    <div className={css.rightColumn}>
                        <h4 className={css.title}>Explore</h4>

                        <div className={css.linksGrid}>
                            <div className={css.linkGroup}>
                                <a href="#" className={css.textoCinza}>Home</a>
                                <a href="#" className={css.textoCinza}>Benefícios</a>
                                <a href="#" className={css.textoCinza}>Junte-se a Nós</a>
                            </div>
                            <div className={css.linkGroup}>
                                <a href="#" className={css.textoCinza}>ONGs</a>
                                <a href="#" className={css.textoCinza}>Projetos</a>
                            </div>
                        </div>

                        <button className={css.botaoDoar}>
                            Doar agora
                        </button>
                    </div>
                </div>

                <div className={css.separator}></div>

                <div className={css.copyright}>
                    <p>
                        © 2026 Todos os direitos a Campanha Doar + . Todos os direitos reservados.
                    </p>
                </div>

            </div>
        </footer>
    );
}