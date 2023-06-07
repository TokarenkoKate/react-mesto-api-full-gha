import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate, Link, useLocation } from "react-router-dom"
import Logo from "./Logo"

function Header({ email, handleLogin, setEmail }) {
  const changeLanguage = (language) => {
    i18n.changeLanguage(language)
  }
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()

  const location = useLocation()

  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  function signOut() {
    localStorage.removeItem("token")
    handleLogin(false)
    navigate("/signin", { replace: true })
    setEmail("")
  }

  return (
    <header className={`header ${menuOpen ? "active" : ""}`}>
      <nav className="header__nav">
        {location.pathname === "/signin" && (
          <>
            <Logo />
            <div className="header__links-container">
              <Link
                to="/signup"
                className="header__link"
              >
                {t("signing_up")}
              </Link>
              <button
                className={`footer__button ${
                  i18n.language === "en" ? "footer__button_active" : ""
                }`}
                onClick={() => changeLanguage("en")}
              >
                EN
              </button>
              <button
                className={`footer__button ${
                  i18n.language === "ru" ? "footer__button_active" : ""
                }`}
                onClick={() => changeLanguage("ru")}
              >
                RU
              </button>
            </div>
          </>
        )}
        {location.pathname === "/signup" && (
          <>
            <Logo />
            <div className="header__links-container">
              <Link
                to="/signin"
                className="header__link"
              >
                {t("sign_in")}
              </Link>
              <button
                className={`footer__button ${
                  i18n.language === "en" ? "footer__button_active" : ""
                }`}
                onClick={() => changeLanguage("en")}
              >
                EN
              </button>
              <button
                className={`footer__button ${
                  i18n.language === "ru" ? "footer__button_active" : ""
                }`}
                onClick={() => changeLanguage("ru")}
              >
                RU
              </button>
            </div>
          </>
        )}
        {location.pathname === "/" && (
          <div className="header__menu">
            <div className="header__burger-wrapper">
              <Logo />
              <div
                className="burger"
                onClick={toggleMenu}
              >
                <div className="burger__bar1"></div>
                <div className="burger__bar2"></div>
                <div className="burger__bar3"></div>
              </div>
            </div>
            <div className="header__link-wrapper">
              <p className="header__email">{email}</p>
              <button
                className="header__button"
                onClick={signOut}
              >
                {t("sign_out")}
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header
