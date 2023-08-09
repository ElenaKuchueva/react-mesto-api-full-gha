import React from "react";

function ImagePopup({ card, onClose }) {
  return (
    <div
      className={`popup popup_full-image ${card.link ? "popup_opened" : ""}` }
      onClick={onClose}
    >
      <div className="popup__container popup__container_full-image" onClick={(evt) => evt.stopPropagation()}>
        <button
          className="popup__close"
          type="button"
          aria-label="Закрыть."
          onClick={onClose}
        ></button>
        <img className="popup__image" 
        alt={card.name} 
        src={card.link} />
        <h2 className="popup__title">{card.name}</h2>
      </div>
    </div>
  );
}

export default ImagePopup;
