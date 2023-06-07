import PopupWithForm from "./PopupWithForm";
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

function DeleteCardPopup({ isOpen, onClose, onDeleteCard, deletedCard }) {
  const { t } = useTranslation();
  const [buttonText, setButtonText] = useState(t('yes'));

  useEffect(() => setButtonText(t('yes')), [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    setButtonText(t('deleting'));
    onDeleteCard(deletedCard);
  }

  return (
    <PopupWithForm
      name='delete-card'
      title={t('are_sure')}
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit} />
  )
}

export default DeleteCardPopup;