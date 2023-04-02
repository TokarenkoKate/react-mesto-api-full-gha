import logo from './../images/logo.svg';
import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';

function Header({ email, handleLogin, setEmail }) {
  const navigate = useNavigate();

  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  };

  function signOut() {
    localStorage.removeItem('token');
    handleLogin(false);
    navigate('/signin', { replace: true });
    setEmail('');
  }

  return (
    <header className={`header ${menuOpen ? 'active' : ''}`}>
      <nav className='header__nav'>
        {location.pathname === '/signin' && 
          (<>
            <div className='logo'>
              <img src={logo} alt="Логотип" className="logo__image" />
            </div>
            <Link to='/signup' className='header__link'>Регистрация</Link>
          </>)
        }
        {location.pathname === '/signup' &&
          (<>
            <div className='logo'>
              <img src={logo} alt="Логотип" className="logo__image" />
            </div>
            <Link to='/signin' className='header__link'>Войти</Link>
          </>)
        }
        {location.pathname === '/' &&
          (<div className='header__menu'>
            <div className='header__burger-wrapper'>
              <div className='logo'>
                <img src={logo} alt="Логотип" className="logo__image" />
              </div>
              <div className='burger' onClick={toggleMenu}>
                <div className="burger__bar1"></div>
                <div className="burger__bar2"></div>
                <div className="burger__bar3"></div>
              </div>
            </div>
            <div className='header__link-wrapper'>
              <p className='header__email'>{email}</p>
              <button className='header__button' onClick={signOut}>Выйти</button>
            </div>
          </div>)
        }
      </nav>
    </header>
  );
}

export default Header;