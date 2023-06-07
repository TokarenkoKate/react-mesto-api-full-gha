import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormWithValidation } from './../utils/form';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddNewPlace }) {
  const { t } = useTranslation();
  const [buttonText, setButtonText] = useState(t('create'));

  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  useEffect(() => {
    setButtonText(t('create'));
    resetForm();
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setButtonText(t('loading'));
    const { name, link } = values;
    onAddNewPlace({ name, link });
  };

  return (
    <PopupWithForm
      name='add-card'
      title={t('new_place')}
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
        placeholder={t('place_name')}
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
        placeholder={t('image_link')}
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