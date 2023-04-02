import { useContext } from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;

  const handleDeleteClick = () => {
    onCardDelete(card);
  };

  const isLiked = card.likes.some(i => i._id === currentUser._id);

  const cardLikeButtonClassName = (
    `card__like ${isLiked && 'card__like_active'}`
  );

  const handleLikeClick = () => {
    onCardLike(card);
  };

  return (
    <li className="card">
      <img
        src={card.link}
        alt={card.name}
        className="card__image"
        onClick={() => onCardClick(card)}
      />
      <div className="card__row">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-wrapper">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeClick}>
          </button>
          <p className="card__like-count">{card.likes?.length}</p>
        </div>
      </div>
      {isOwn &&
        <button
          className="card__delete page__link-opacity"
          type="button"
          onClick={handleDeleteClick}
        />
      }
    </li>
  )
}

export default Card;