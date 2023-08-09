import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, onLoading }) {
  const [cardDescription, setcardDescription] = React.useState("");
  const [cardLink, setCardLink] = React.useState("");

  function handleChangeCardDescription(e) {
    setcardDescription(e.target.value);
  }

  function handleChangeCardLink(e) {
    setCardLink(e.target.value);
  }

  React.useEffect(() => {
    setcardDescription("");
    setCardLink("");
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({
      name: cardDescription,
      link: cardLink,
    });
  }

  return (
    <PopupWithForm
      name="popupAdd"
      title="Новое место"
      textButton={onLoading ? `Сохранение ...` : `Сохранить`}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="field"
        type="text"
        name="name"
        onChange={handleChangeCardDescription}
        value={cardDescription}
        id="newPlace"
        tabIndex="1"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
      />
      <span className="newPlace-message-error field-message-error"></span>
      <input
        className="field"
        type="url"
        name="link"
        onChange={handleChangeCardLink}
        value={cardLink}
        id="link"
        tabIndex="2"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="link-message-error field-message-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
