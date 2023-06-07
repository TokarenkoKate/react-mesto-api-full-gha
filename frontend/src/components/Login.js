import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import AuthForm from './AuthForm';

const Login = ({ handleAuthorize }) => {
  const { t } = useTranslation();
  const [buttonText, setButtonText] = useState(t('sign_in'));

  useEffect(() => {
    setButtonText(t('sign_in'));
  }, [handleAuthorize]);

  const handleSubmit = (values) => {
    setButtonText(t('loading'));

    const { email, password } = values;
    handleAuthorize(email, password);
  };

  return (
    <div className='login'>
      <h2 className='login__title'>
        {t('sign_in')}
      </h2>
      <AuthForm
        buttonText={buttonText}
        handleSubmit={handleSubmit} />
    </div>
  )
};

export default Login;