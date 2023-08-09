import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup ({isOpen, onClose, onChangeUserInfo, onLoading}) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

    React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);


  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

 function handleSubmit (evt) {
    evt.preventDefault();
    onChangeUserInfo({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
    name="popupEdit"
    title="Редактировать профиль"
    textButton={onLoading ? `Сохранение ...` : `Сохранить`}
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}
  >
    <input
      className="field"
      type="text"
      name="name"
      value={name || ''}
      onChange={handleChangeName}
      id="username"
      tabIndex="1"
      placeholder="Имя"
      minLength="2"
      maxLength="40"
      required
    />
    <span className="username-message-error field-message-error"></span>
    <input
      className="field"
      type="text"
      name="about"
      value = {description || ''}
      onChange={handleChangeDescription}
      id="occupation"
      tabIndex="2"
      placeholder="О себе"
      minLength="2"
      maxLength="200"
      required
    />
    <span className="occupation-message-error field-message-error"></span>
  </PopupWithForm>
  )
}

export default EditProfilePopup;