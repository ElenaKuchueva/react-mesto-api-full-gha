import React from "react";
import * as mestoAuth from '../utils/mestoAuth';
import { useNavigate } from "react-router-dom";
import InfoToolTip from './InfoTooltip';
import failImg from "../images/fail.png";

function Login({OnLogin, userEmail}) {
  const [isOpenSuccesPopup, setIsOpenSuccesPopup] = React.useState(false);
  const [isSuccess, setIsSucces] = React.useState(false);

  const [formValue, setFormValue] = React.useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function closeSuccesPopup() {
    setIsOpenSuccesPopup(false);
  }

  const handleChangeFormValue = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    mestoAuth
    .authorize(formValue.email, formValue.password)
      .then((data) => {
        OnLogin();
        setIsSucces(true);
        userEmail(formValue.email);
        navigate('/', { replace: true });
        // localStorage.setItem('jwt', data.token);
      })
      .catch(err => {
        setIsSucces(false);
        setIsOpenSuccesPopup(true);
        console.log(err);
      });
  }

  return (
    <section className="login">
     <InfoToolTip
        isOpen={isOpenSuccesPopup}
        onClose={closeSuccesPopup}
        description={`${!isSuccess && 'Что-то пошло не так! Попробуйте ещё раз.'}`}
        image={failImg}
      />

      <form className="login__form" onSubmit={handleSubmit}>
        <h2 className="login__heading">Вход</h2>
        <div className="login__fields">
          <input
            className="login__field"
            type="email"
            name="email"
            id="email"
            value={formValue.email}
            tabIndex="1"
            placeholder="Email"
            minLength="2"
            maxLength="40"
            required
            onChange={handleChangeFormValue}
          />
          <input
            className="login__field"
            type="password"
            name="password"
            id="password"
            value={formValue.password}
            tabIndex="2"
            placeholder="Пароль"
            minLength="2"
            maxLength="200"
            required
            onChange={handleChangeFormValue}
          />
        </div>

        <button
          className="login__submit"
          type="submit"
          aria-label="Сохранить изменения."
        >
          Войти
        </button>
      </form>
    </section>
  );
}

export default Login;
