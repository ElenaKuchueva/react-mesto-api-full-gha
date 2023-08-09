import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Footer from "./Footer";

function Main({
  cards,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onLikeClick,
  onDeleteClick,
}) {
  const user = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__content">
          <div className="avatar-zone">
            <img src={user.avatar} className="avatar" alt="Фото профиля." />
            <button
              className="edit-avatar"
              onClick={() => {
                onEditAvatar(true);
              }}
              type="button"
              aria-label="Добавить аватар."
            ></button>
          </div>
          <div className="profile__info">
            <div className="profile__heading">
              <h1 className="profile__title">{user.name}</h1>
              <p className="profile__subtitle">{user.about}</p>
            </div>
            <button
              className="profile__edit"
              onClick={() => {
                onEditProfile(true);
              }}
              type="button"
              aria-label="Редактировать профиль."
            ></button>
          </div>
        </div>
        <button
          className="profile__add"
          onClick={() => {
            onAddPlace(true);
          }}
          type="button"
          aria-label="Добавить фото."
        ></button>
      </section>

      <section className="elements">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onLikeClick={onLikeClick}
            onCardClick={onCardClick}
            onDeleteClick={onDeleteClick}
          />
        ))}
      </section>
      <Footer />
    </main>
    
  );
}

export default Main;
