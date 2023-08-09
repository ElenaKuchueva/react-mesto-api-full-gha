import React from 'react';
import { NavLink, useNavigate, useLocation} from 'react-router-dom';

function NavBar({userEmail}) {
  const navigate = useNavigate();
  const location = useLocation();

  function signOut () {
    localStorage.removeItem('jwt');
    navigate ('/signin');
  }

  return (
    <nav className="nav-menu">
      {location.pathname === "/" && <p>{userEmail}</p>}
      {location.pathname !== "/signin" && location.pathname !== "/" && <NavLink to="/signin" className="nav-menu__link">Войти</NavLink>}
      {location.pathname !== "/signup" && location.pathname !== "/" && <NavLink to="/signup" className="nav-menu__link">Регистрация</NavLink>}
      {location.pathname !== "/signin" && location.pathname !== "/signup" && <button onClick={signOut} className="nav-menu__button">Выйти</button>}
    </nav>
  );
}

export default NavBar;