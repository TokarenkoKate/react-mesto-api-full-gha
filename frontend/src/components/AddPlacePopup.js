import { useState, useEffect } from 'react';
import { useFormWithValidation } from './../utils/form';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddNewPlace }) {
  const [buttonText, setButtonText] = useState('Создать');

  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  useEffect(() => {
    setButtonText('Создать');
    resetForm();
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setButtonText('Загрузка...');
    const { name, link } = values;
    onAddNewPlace({ name, link });
  };

  return (
    <PopupWithForm
      name='add-card'
      title='Новое место'
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid} >
      <input
        type="text"
        className={`form__input ${!isValid ? 'form__input_state_error' : ''}`}
        name="name"
        id="place-name-input"
        placeholder="Название:"
        value={values?.name || ''}
        onChange={handleChange}
        minLength={3}
        required />
      <span className="form__input-error">
        {errors?.name && errors.name}
      </span>
      <input
        type="url"
        className={`form__input ${!isValid ? 'form__input_state_error' : ''}`}
        name="link"
        id="link-input"
        placeholder="Ссылка на изображение:"
        value={values?.link || ''}
        onChange={handleChange}
        required />
      <span className="form__input-error">
        {errors?.link && errors.link}
      </span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;