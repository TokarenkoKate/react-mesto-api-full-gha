import { useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useFormWithValidation } from './../utils/form';
import { useTranslation } from 'react-i18next';
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const { t } = useTranslation();
  const currentUser = useContext(CurrentUserContext);
  const [buttonText, setButtonText] = useState(t('save'));

  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  useEffect(() => {
    setButtonText(t('save'));
    resetForm({name: currentUser.name, about: currentUser.about});
  }, [currentUser, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setButtonText(t('loading'));

    const { name, about } = values;
    onUpdateUser({ name, about });
  };

  return (
    <PopupWithForm
      name='edit-profile'
      title={t('edit_profile')}
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
        placeholder={t('enter_name')}
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
        placeholder={t('enter_about')}
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