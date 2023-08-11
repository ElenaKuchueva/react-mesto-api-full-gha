class Api {
  constructor(url) {
    this.url = url;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

//----------Карточки----------------

//Базовые карточки 
  getInitialCards() {
    return fetch(`${this.url}cards`, {
      metod: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    })
    .then((res) => this._handleResponse(res))
  }

//Добавить новую карточка
  postNewCard(data) {
    return fetch(`${this.url}cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => this._handleResponse(res))
  }

//Удалить карточку
deleteCard(cardId) {
    return fetch(`${this.url}cards/${cardId} `, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    })
    .then((res) => this._handleResponse(res))
  }

//--------Данные пользователя------------------

//Актуальные данные о пользователе
  getInitialUserInfo() {
    return fetch(`${this.url}users/me`, {
      metod: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    }).then((res) => this._handleResponse(res))
  }


//Изменить даные о пользователе
  changeValuesUserInfo(data) {
    return fetch(`${this.url}users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({ 
        name: data.name, 
        about: data.about 
      }),
    })
    .then((res) => this._handleResponse(res))
  }


//---------Аватарка-------------------

//Изменить аватар
  changeAvatar(data) {
    return fetch(`${this.url}users/me/avatar`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify(
        { avatar: data.avatar }
        ),
      })
    .then((res) => this._handleResponse(res))
  }


//------------Лайки------------------

changeLikeCardStatus(cardId, isLiked) {
  return fetch(`${this.url}cards/${cardId}/likes`, {
    method: `${!isLiked ? 'DELETE' : 'PUT'}`,
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
  })
    .then((res) => this._handleResponse(res))
}

}

// const api = new Api("http://localhost:4000/");
const api = new Api("https://api.kuchueva.nomoreparties.co/");

export default api;
