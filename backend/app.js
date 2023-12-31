require('dotenv').config();
const express = require('express');

const { PORT = 3000 } = process.env;
const app = express();
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const aboutUserRouter = require('./routes/users');
const aboutCardRouter = require('./routes/cards');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const NotFound = require('./errors/notFound');
const {
  validationCreateUser,
  validationLogin,
} = require('./middlewares/validation');

const allowedCors = [
  'http://kuchueva.nomoreparties.co',
  'https://kuchueva.nomoreparties.co',
  'http://localhost:3000',
  'http://localhost:3001',
];

app.use(cors(allowedCors));

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(helmet());
app.use(express.json());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', validationCreateUser, createUser);
app.post('/signin', validationLogin, login);

app.use(auth);

app.use('/users', aboutUserRouter);
app.use('/cards', aboutCardRouter);

app.use('*', (req, res, next) => {
  next(new NotFound('Страница не найдена'));
});

app.use(errorLogger);

app.use(errors());
app.use((err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
