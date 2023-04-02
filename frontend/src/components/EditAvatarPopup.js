import { useState, useEffect } from 'react';
import { useFormWithValidation } from './../utils/form';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const [buttonText, setButtonText] = useState('Сохранить');

  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  useEffect(() => {
    setButtonText('Сохранить');
    resetForm();
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setButtonText('Загрузка...');
    
    const { avatar } = values;
    onUpdateAvatar({ avatar } );
  };

  return (
    <PopupWithForm
      name='edit-avatar'
      title='Обновить аватар'
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid} >
      <input
        type="url"
        className={`form__input ${!isValid ? 'form__input_state_error' : ''}`}
        name="avatar"
        id="avatar-input"
        placeholder="Введите ссылку на новый аватар:"
        value={values?.avatar || ''}
        onChange={handleChange}
        required />
      <span className="form__input-error">
        {errors?.avatar && errors.avatar}
      </span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;