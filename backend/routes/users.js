const aboutUserRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers, getUserInfo, updateUserInfo, updateAvatar, getInfoAboutMe,
} = require('../controllers/users');

aboutUserRouter.get('/', getUsers);
aboutUserRouter.get('/me', getInfoAboutMe);

aboutUserRouter.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
}), getUserInfo);

aboutUserRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUserInfo);

aboutUserRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string()
      .regex(/https?:\/\/(w{3}\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/),
  }),
}), updateAvatar);

module.exports = aboutUserRouter;
