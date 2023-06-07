import { useTranslation } from 'react-i18next';

function Footer() {
  const { i18n } = useTranslation();
  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <footer className="footer">
      <p className="footer__copyright">© 2023 Mesto Russia</p>
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
    </footer>
  )
}

export default Footer
