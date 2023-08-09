import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, onLoading }) {
  const avatarRef = React.useRef();

  function handleAvatar() {
    const avatar = avatarRef.current.value;
    return avatar;
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
        name="popupAvatar"
        title="Обновить аватар"
        // textButton="Сохранить"
        textButton={onLoading ? `Сохранение ...` : `Сохранить`}
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
      >
        <input
          className="field"
          type="url"
          name="avatar"
          id="newAvatar"
          ref={avatarRef}
          onChange={handleAvatar}
          // value=""
          tabIndex="1"
          placeholder="Введите ссылку"
          required
        />
        <span className="newAvatar-message-error field-message-error"></span>
      </PopupWithForm>
  )
}

export default EditAvatarPopup;