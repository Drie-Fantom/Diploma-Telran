require('dotenv').config();  // для работы с .env файлами
const express = require('express');      // фреймворк для сервера
const cors = require('cors');            // библиотека для CORS (чтобы фронт мог обращаться к бэку)
const categories = require('./routes/categories');  // роут для категорий
const sale = require('./routes/sale');              // роут для акций
const order = require('./routes/order');            // роут для заказов
const products = require('./routes/products');      // роут для товаров
const sequelize = require('./database/database');   // подключение базы данных Sequelize

// --- Константы окружения ---
const PORT = process.env.PORT || 3333;                  // порт (берётся из ENV, если нет → 3333)
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'https://diploma-telran-frontend.vercel.app'; // домен фронтенда (для CORS). 

const app = express();

// --- CORS настройка --- 
app.use(cors({ origin: FRONTEND_ORIGIN,
 methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false
 }));      
// если FRONTEND_ORIGIN задан → разрешаем только этот домен, иначе любой (*)

// --- Middleware --- 
app.use(express.json());                               // для работы с JSON в запросах
app.use(express.urlencoded({ extended: true }));       // для обработки form-data

// --- Health-check ---
app.get('/health', (_, res) => res.status(200).send('ok'));
// проверка жив ли сервер (используется хостингом)

// --- Статика (опционально) ---
// если положишь что-то в backend/public → оно будет доступно как файлы
app.use(express.static('public'));

// --- Подключение роутов ---
// здесь твои основные endpoints
app.use('/categories', categories);
app.use('/products', products);
app.use('/sale', sale);
app.use('/order', order);

// --- Запуск сервера с подключением к БД ---
(async () => {
  try {
    await sequelize.sync();   // синхронизация моделей с БД
    app.listen(PORT, () => console.log(`Server started on ${PORT}`));
  } catch (err) {
    console.error(err);
    process.exit(1);          // аварийный выход, если ошибка при старте
  }
})();


// app.listen('3333');