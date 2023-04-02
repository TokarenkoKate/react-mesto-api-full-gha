import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card';

function Main({
  isLoading,
  cardsList,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete
}) {

  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__image-wrapper" onClick={onEditAvatar}>
          {isLoading ?
            (<div className="spinner spinner_visible"><i></i></div>)
            : (<img src={currentUser.avatar} alt="Аватар" className="profile__image" />)}
        </div>
        <div className="profile__info">
          <h1 className="profile__author">{currentUser.name}</h1>
          <p className="profile__job">{currentUser.about}</p>
          <button
            className="profile__edit-btn page__link-opacity"
            type="button"
            onClick={onEditProfile} >
          </button>
        </div>
        <button
          className="profile__add-btn page__link-opacity"
          type="button"
          onClick={onAddPlace} >
        </button>
      </section>

      <section className="content" aria-label="Карточки">
        <ul className="cards">
          {cardsList.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;