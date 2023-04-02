import { useState, useEffect } from 'react';
import AuthForm from './AuthForm';

const Login = ({ handleAuthorize }) => {
  const [buttonText, setButtonText] = useState('Войти');

  useEffect(() => {
    setButtonText('Войти');
  }, [handleAuthorize]);

  const handleSubmit = (values) => {
    setButtonText('Загрузка...');

    const { email, password } = values;
    handleAuthorize(email, password);
  };

  return (
    <div className='login'>
      <h2 className='login__title'>
        Вход
      </h2>
      <AuthForm
        buttonText={buttonText}
        handleSubmit={handleSubmit} />
    </div>
  )
};

export default Login;