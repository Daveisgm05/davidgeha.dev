import React from 'react';
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="header__inner container">
                <div className="header__title-wrapper">
                    <h1 className="header__title">
                        <span className="header__title-line">Creative</span>
                        <span className="header__title-line">Developer</span>
                        <span className="header__title-line">& Designer</span>
                    </h1>
                </div>

                <div className="header__media">
                    <div className="header__media-shape">
                        <img
                            className="header__image"
                            src="/david_transparent.png?v=2"
                        />
                    </div>
                </div>

                <div className="header__intro">
                    <p>
                        I build digital experiences that blend <br />
                        precision engineering with premium design.
                    </p>
                </div>
            </div>
        </header>
    );
};

export default Header;
