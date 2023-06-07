import { useTranslation } from 'react-i18next';
import logo from './../images/logo.svg';

function Logo() {
  const { t } = useTranslation();
  return (
    <div className="logo">
      <img
        src={logo}
        alt={t("logo_alt")}
        className="logo__image"
      />
    </div>
  )
}

export default Logo;
