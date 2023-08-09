import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onLikeClick, onDeleteClick, onCardClick }) {
  function handleCardClick() {
    onCardClick(card);
  }

  const handleLikeClick = () => {
    onLikeClick(card);
  };

  const handleDeleteClick = () => {
    onDeleteClick(card);
  };

  const currentUser = React.useContext(CurrentUserContext);
  // const isOwn = card.owner._id === currentUser._id;
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some((item) => item._id === currentUser._id);
  const cardLikeButtonClassName = `element__icon ${
    isLiked && `element__icon_active`
  }`;

  return (
    <article className="element">
      <img
        className="element__image"
        src={card.link}
        alt={card.name}
        onClick={handleCardClick}
      />
      <div className="element__description">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__icon-zone">
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="Нравится."
            onClick={handleLikeClick}
          ></button>
          <p className="element__total-icon">{card.likes.length}</p>
        </div>
      </div>
      {isOwn && (
        <button
          className="element__delate"
          type="button"
          aria-label="Удалить."
          onClick={handleDeleteClick}
        />
      )}
    </article>
  );
}

export default Card;
