import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { api } from '../utils/api';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import InfoTooltip from './InfoTooltip';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import * as auth from './../utils/auth';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [cardsList, setCardsList] = useState([]);
  const [currentUser, setCurrentUser] = useState({ name: 'Загрузка...', about: 'Загрузка...', avatar: '' });
  const [deletedCard, setDeletedCard] = useState({});
  const [email, setEmail] = useState('');
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    handleTokenCheck();
  }, [])

  useEffect(() => {
    {
      isLoggedIn &&
        setIsLoading(true);
      isLoggedIn &&  Promise.all([api.getUserInfo(), api.getInitialCards()])
          .then(([user, cards]) => {
            setCurrentUser(user);
            setCardsList(cards);
            setIsLoading(false);
          })
          .catch(err => console.log(err.message))
    }
  }, [isLoggedIn]);

  const handleTokenCheck = () => {
    const token = localStorage.getItem('token');
    if (token) {
      auth.tokenCheck(token)
        .then(({ data }) => {
          if (data) {
            setIsLoggedIn(true);
            setEmail(data.email);
            navigate('/', { replace: true });
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const handleRegister = (email, password) => {
    auth.register(email, password)
      .then((res) => {
        if (res) {
          navigate('/signin', { replace: true })
          setRegisterSuccess(true);
          setIsInfoTooltipOpen(true);
        } else {
          setRegisterSuccess(false);
          setIsInfoTooltipOpen(true);
        }
      })
      .catch(err => console.log(err));
  }

  const handleAuthorize = (email, password) => {
    auth.authorize(email, password)
      .then((res) => {
        if (res.token) {
          setEmail(email);
          setIsLoggedIn(true);
          navigate('/', { replace: true });
        }
      })
      .catch((err) => console.log(err))
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleDeleteCardClick(card) {
    setIsDeleteCardPopupOpen(true);
    setDeletedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setIsInfoTooltipOpen(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCardsList((cardList) => cardList.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(err));
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCardsList(cardsList.filter((currentCard) => currentCard._id !== card._id));
        closeAllPopups();
        setDeletedCard({});
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateUser(userData) {
    api.editUserInfo(userData)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  }

  function handleUpdateAvatar(userAvatar) {
    api.editUserAvatar(userAvatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddNewPlace(newCard) {
    api.addNewCard(newCard)
      .then((card) => {
        setCardsList([card, ...cardsList]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <div className='page__container'>
          <Header email={email} handleLogin={setIsLoggedIn} setEmail={setEmail} />
          <Routes>
            <Route path='/signin' element={<Login handleAuthorize={handleAuthorize} />} />
            <Route path='/signup' element={<Register handleRegister={handleRegister} />} />
            <Route path='/' element={
              <ProtectedRoute
                isLoading={isLoading}
                isLoggedIn={isLoggedIn}
                cardsList={cardsList}
                setCardsList={setCardsList}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleDeleteCardClick}
                element={Main} />
            } />
          </Routes>
          {isLoggedIn && <Footer />}

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser} />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddNewPlace={handleAddNewPlace} />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar} />

          <ImagePopup
            card={selectedCard}
            isOpen={isImagePopupOpen}
            onClose={closeAllPopups} />

          <DeleteCardPopup
            isOpen={isDeleteCardPopupOpen}
            onClose={closeAllPopups}
            onDeleteCard={handleCardDelete}
            deletedCard={deletedCard} />

          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
            registerSuccess={registerSuccess} />
        </div>
      </div>
    </CurrentUserContext.Provider >
  );
}

export default App;