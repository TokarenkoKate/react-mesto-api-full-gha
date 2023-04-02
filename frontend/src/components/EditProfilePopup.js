import { useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useFormWithValidation } from './../utils/form';
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [buttonText, setButtonText] = useState('Сохранить');

  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  useEffect(() => {
    setButtonText('Сохранить');
    resetForm({name: currentUser.name, about: currentUser.about});
  }, [currentUser, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setButtonText('Загрузка...');

    const { name, about } = values;
    onUpdateUser({ name, about });
  };

  return (
    <PopupWithForm
      name='edit-profile'
      title='Редактировать профиль'
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid} >
      <input
        type="text"
        className={`form__input ${!isValid ? 'form__input_state_error' : ''}`}
        name="name"
        id="name-input"
        placeholder="Введите имя:"
        onChange={handleChange}
        value={values?.name || ''}
        minLength={3}
        required />
      <span className='form__input-error'>
        {errors?.name && errors.name}
      </span>
      <input
        type="text"
        className={`form__input ${!isValid ? 'form__input_state_error' : ''}`}
        name="about"
        id="about-input"
        placeholder="Введите информацию о себе:"
        onChange={handleChange}
        value={values?.about || ''}
        minLength={3}
        required />
      <span className="form__input-error">
        {errors?.about && errors.about}
      </span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;