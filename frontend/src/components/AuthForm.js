import { useFormWithValidation } from "../utils/form";

const AuthForm = ({ buttonText, handleSubmit }) => {

  const { values, handleChange, errors, isValid } = useFormWithValidation();

  const handleSubmitForm = (e) => {
    e.preventDefault();
    handleSubmit(values);
  };

  return (
    <form className='auth' onSubmit={handleSubmitForm} >
      <div className='auth__inputs-container'>
        <input
          name='email'
          type='email'
          className={`auth__input ${errors?.email ? 'auth__input_state_error' : ''}`}
          placeholder="Email"
          value={values?.email || ''}
          onChange={handleChange}
          minLength={3}
          required />
        <span className="auth__input-error">
          {errors?.email && errors.email}
        </span>
        <input
          name='password'
          type='password'
          className={`auth__input ${errors?.password ? 'auth__input_state_error' : ''}`}
          placeholder='Пароль'
          value={values?.password || ''}
          onChange={handleChange}
          minLength={3}
          required />
        <span className="auth__input-error">
          {errors?.password && errors.password}
        </span>
      </div>
      <button
        type='submit'
        className={`auth__button ${!isValid ? 'auth__button_disabled' : ''}`}
        disabled={!isValid} >
        {buttonText}
      </button>
    </form>
  )
};

export default AuthForm;