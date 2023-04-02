import { useCallback, useEffect } from 'react';

function InfoTooltip({ isOpen, onClose, registerSuccess }) {

  const handleOverlayClose = (e) => {
    if (e.target.classList.contains('popup')) {
      onClose();
    }
  };

  const escFunction = useCallback((event) => {
    if (event.key === "Escape") {
      onClose();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, []);

  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`} onClick={handleOverlayClose}>
      <div className='popup__container'>
        <div className={`popup__icon popup__icon_type_${registerSuccess ? 'success' : 'failure'}`}></div>
        <p className='popup__message'>
          {registerSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </p>
        <button className="popup__close-button page__link-opacity" type="button" onClick={onClose}></button>
      </div>
    </div>
  )
};

export default InfoTooltip;