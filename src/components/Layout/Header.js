import React from 'react';
import classes from './Header.module.css';
import Logo from './../../assets/images/logo-vert.svg';

const Header = () => {
    return (
        <header className={classes.header}>
            <div className={classes.container}>
                <img className={classes.logo} src={Logo} alt="Website Logo"/>
            </div>
        </header>
    );
};

export default Header;