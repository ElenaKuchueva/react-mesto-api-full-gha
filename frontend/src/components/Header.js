import React from 'react';
import logo from "../images/logo.svg";
import NavBar from './NavBar';

function Header({userEmail}) {
  return (
    <header className="header">
      <div className='header__logo'>
        <img src={logo} className="logo" alt="Логотип." />
      </div>
      
   <NavBar userEmail={userEmail}/>
    </header>
  );
}

export default Header;