import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AuthForm from './AuthForm';

const Register = ({ handleRegister }) => {
  const { t } = useTranslation();
  const [buttonText, setButtonText] = useState(t('sign_up'));

  useEffect(() => {
    setButtonText(t('sign_up'))
  }, [handleRegister]);

  const handleSubmit = (values) => {
    setButtonText(t('loading'));

    const { email, password } = values;
    handleRegister(email, password);
  };

  return (
    <div className='register'>
      <h2 className='register__title'>{t('signing_up')}</h2>
      <AuthForm
        buttonText={buttonText}
        handleSubmit={handleSubmit}
      />
      <div className='register__signin'>
        <p>{t('already_signed_up')}</p>
        <Link to='/signin' className='register__login-link'>{t('sign_in')}</Link>
      </div>
    </div>
  )
};

export default Register;