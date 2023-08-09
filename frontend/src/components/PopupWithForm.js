import React from "react";

function PopupWithForm({ title, name, textButton, children, isOpen, onClose, onSubmit }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}  onClick={onClose}>
      <div className="popup__container"  onClick={(evt) => evt.stopPropagation()}>
        <button
          className="popup__close"
          type="button"
          aria-label="Закрыть."
          onClick={onClose}
        ></button>
        <div className="form">
          <h2 className="form__heading">{title}</h2>
          <form className="fields" name={name} onSubmit={onSubmit}>
            {children}
            <button
              className="submit"
              type="submit"
              aria-label="Сохранить изменения."
            >
              {textButton || "Сохранить"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PopupWithForm;
