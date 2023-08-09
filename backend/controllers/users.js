const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userInfo = require('../models/user');

const {
  STATUS_CREATED,
} = require('../errors/err');

const BadRequest = require('../errors/badRequest');
const NotFound = require('../errors/notFound');
const Conflict = require('../errors/Conflict');

module.exports.getUsers = (req, res, next) => {
  userInfo
    .find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.getUserInfo = (req, res, next) => {
  userInfo
    .findById(req.params.id)
    .orFail(() => {
      next(new NotFound('По указанному _id пользователь не найден'));
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.getInfoAboutMe = (req, res, next) => {
  const userId = req.user._id;
  return userInfo
    .findById(userId)
    .orFail(() => {
      next(new NotFound('По указанному _id пользователь не найден'));
    })
    .then((user) => res.send(user))
    .catch((err) => {
      next(err);
    });
};

module.exports.updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  userInfo
    .findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    )
    .orFail(() => {
      next(new NotFound('Пользователь по указанному _id не найден'));
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Некорректные данные при создании пользователя'));
      } else {
        next(err);
      }
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  userInfo
    .findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    )
    .orFail(() => {
      next(new NotFound('Пользователь по указанному _id не найден'));
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => userInfo.create({
      name,
      about,
      avatar,
      email,
      password: hash, // записываем хеш в базу
    }))
    .then((user) => res.status(STATUS_CREATED).send({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
      _id: user._id,
    }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new Conflict('Пользователь с такой почтой зарегестрирован'));
      } else if (err.name === 'ValidationError') {
        next(new BadRequest('Некорректные данные при создании пользователя'));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return userInfo
    .findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', {
        expiresIn: '7d',
      });
      res.send({ token });
    })
    .catch(next);
};
