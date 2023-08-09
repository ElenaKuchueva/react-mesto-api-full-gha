import React from "react";
import * as mestoAuth from "../utils/mestoAuth";
import { useNavigate, Link } from "react-router-dom";
import InfoToolTip from './InfoTooltip';
import successImg from "../images/success.png";
import failImg from "../images/fail.png";


function Register() {
  const [isOpenSuccesPopup, setIsOpenSuccesPopup] = React.useState(false);
  const [isSuccess, setIsSucces] = React.useState(false);
  const [formValue, setFormValue] = React.useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function closeSuccesPopup() {
    setIsOpenSuccesPopup(false);
    if (isSuccess) {
      navigate("/signin", { replace: true });
    }
  }

  const handleChangeFormValue = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });

  }

    const handleSubmit = (e) => {
      e.preventDefault();
      const { email, password } = formValue;
      mestoAuth
        .register(email, password)
        .then(() => {
          setIsSucces(true);
          setIsOpenSuccesPopup(true);
        })
        .catch((err) => {
          setIsSucces(false);
          setIsOpenSuccesPopup(true);
          console.log(err);
        });
    };


  return (
    <section className="login">
       <InfoToolTip
        isOpen={isOpenSuccesPopup}
        onClose={closeSuccesPopup}
        description={`${isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}`}
        image={`${isSuccess ? successImg : failImg}`}
      />

      <form className="login__form" onSubmit={handleSubmit}>
        <h2 className="login__heading">Регистрация</h2>
        <div className="login__fields">
          <input
            className="login__field"
            type="email"
            name="email"
            id="email-input"
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
            id="password-input"
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
          Зарегистрироваться
        </button>
      </form>
      <p className="login__question">
        Уже зарегистрированы?&nbsp;
        <Link to="/signin" className="login__link">
          Войти
        </Link>
      </p>
    </section>
  );
}

export default Register;
