import { useState, useEffect } from 'react';
import { useFormWithValidation } from './../utils/form';
import { useTranslation } from 'react-i18next';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const { t } = useTranslation();
  const [buttonText, setButtonText] = useState(t('save'));

  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  useEffect(() => {
    setButtonText(t('save'));
    resetForm();
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setButtonText(t('loading'));
    
    const { avatar } = values;
    onUpdateAvatar({ avatar } );
  };

  return (
    <PopupWithForm
      name='edit-avatar'
      title={t('update_avatar')}
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
        placeholder={t('enter_link')}
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