import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthForm from './AuthForm';

const Register = ({ handleRegister }) => {
  const [buttonText, setButtonText] = useState('Зарегистрироваться');

  useEffect(() => {
    setButtonText('Зарегистрироваться')
  }, [handleRegister]);

  const handleSubmit = (values) => {
    setButtonText('Загрузка...');

    const { email, password } = values;
    handleRegister(email, password);
  };

  return (
    <div className='register'>
      <h2 className='register__title'>Регистрация</h2>
      <AuthForm
        buttonText={buttonText}
        handleSubmit={handleSubmit}
      />
      <div className='register__signin'>
        <p>Уже зарегистрированы?</p>
        <Link to='/signin' className='register__login-link'>Войти</Link>
      </div>
    </div>
  )
};

export default Register;