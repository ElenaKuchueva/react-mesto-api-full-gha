import React from "react";

function InfoTooltip({isOpen, onClose, description, image}) {
    return(
        <div className={`popup ${isOpen && 'popup_opened'}`}>
        <div className="popup__container">
          <button
            className="popup__close"
            type="button"
            aria-label="Закрыть."
            onClick={onClose}
          ></button>
            <img src={image} className="popup__pic" alt="Картинка успешности входа." />
  
            <p className="popup__description">{description}</p>
          </div>
        </div>
    )
}

export default InfoTooltip;