import { useContext } from "react"
import { useTranslation } from "react-i18next"
import { CurrentUserContext } from "../contexts/CurrentUserContext"
import Card from "./Card"
import LoadingPage from "./LoadingPage"

function Main({
  isLoading,
  cardsList,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const { t } = useTranslation()
  const currentUser = useContext(CurrentUserContext)

  return currentUser && cardsList ? (
    <main className="main">
      <section className="profile">
        <div
          className="profile__image-wrapper"
          onClick={onEditAvatar}
        >
          {currentUser ? (
            <img
              src={currentUser.avatar}
              alt={t("profile_img_alt")}
              className="profile__image"
            />
          ) : (
            <div className="spinner spinner_visible">
              <i></i>
            </div>
          )}
        </div>
        <div className="profile__info">
          <h1 className="profile__author">{currentUser.name}</h1>
          <p className="profile__job">{currentUser.about}</p>
          <button
            className="profile__edit-btn page__link-opacity"
            type="button"
            onClick={onEditProfile}
          ></button>
        </div>
        <button
          className="profile__add-btn page__link-opacity"
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>
      <section
        className="content"
        aria-label="Карточки"
      >
        <ul className="cards">
          {cardsList &&
            cardsList.map((card) => (
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
  ) : (
    <LoadingPage />
  )
}

export default Main
