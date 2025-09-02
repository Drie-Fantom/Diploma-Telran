# Garden Products — интернет‑магазин (монорепо)

Монорепозиторий с **frontend** (Vite + React + Redux Toolkit) и **backend API** (Express + Sequelize + SQLite) для проекта “Интернет‑магазин товаров для дома и сада”.

## Быстрый старт

### Требования
- Node.js 18+
- npm 9+

### Установка зависимостей
```bash
# из корня репозитория
npm install
npm --prefix frontend install
npm --prefix backend install
```

### Запуск в разработке
```bash
# поднимет API на :3333 и фронт на :5173 одновременно
npm run dev
```
Полезные скрипты:
```bash
npm run backend   # запустить только API
npm run frontend  # запустить только фронтенд
npm run build     # сборка фронтенда
```

> По умолчанию фронтенд ходит на `http://localhost:3333`. Переопределите адрес через переменную окружения **VITE_API_URL**.

---

## Архитектура проекта

DiplomaTelran/
├─ frontend/                # Клиент (Vite + React)
│  ├─ package.json
│  └─ src/
│     ├─ api/               # Axios-инстанс и запросы к API
│     ├─ app/               # Корневой <App/>, маршруты
│     ├─ assets/            # Статические ресурсы (если нужны)
│     ├─ common/            # Общие UI-компоненты, утилиты, страницы
│     │  ├─ components/
│     │  │  ├─ layout/      # Header, Footer и т.п.
│     │  │  ├─ navigation/  # Breadcrumbs и навигация
│     │  │  ├─ feedback/    # Loader, скелетоны
│     │  │  └─ pages/       # Общие страницы, например 404
│     │  └─ utils/          # Переиспользуемые функции (formatPrice и др.)
│     ├─ features/          # “Фичи/модули” домена
│     │  ├─ home/
│     │  │  ├─ components/  # ProductOfDayModal и прочее
│     │  │  ├─ pages/       # HomePage
│     │  │  └─ hooks|utils  # Кастомные хуки/утилиты (по мере необходимости)
│     │  ├─ products/       # Список товаров, карточка, детали
│     │  ├─ categories/     # Категории
│     │  ├─ discounts/      # Товары со скидкой
│     │  ├─ favorites/      # Избранное
│     │  └─ cart/           # Корзина
│     ├─ redux/             # Глобальное состояние (RTK)
│     │  ├─ store.js        # Конфигурация стора
│     │  └─ slices/         # Срезы: products, categories, cart, favorites, home
│     └─ styles/            # Глобальные стили и темы (themes.css)
│
├─ backend/                 # API (Express + Sequelize + SQLite)
│  ├─ index.js              # Точка входа сервера (порт 3333)
│  ├─ routes/               # Маршруты: products, categories, sale, order
│  ├─ database/             # Инициализация Sequelize и модели
│  │  └─ models/            # Category, Product (+ связи)
│  └─ public/               # Статика: изображения категорий/товаров
│
├─ package.json             # Скрипты монорепозитория
└─ README.md                # Этот файл

### Псевдо‑DDD через `features/`
Каждая бизнес‑область выделена в модуль (features): **products**, **categories**, **cart**, **favorites**, **discounts**, **home**. Внутри модуля — однотипная структура: `components/`, `pages/`, `hooks/`, `utils/`. Это упрощает навигацию и изоляцию ответственности.

### Глобальное состояние (Redux Toolkit)
Стора собирается в `src/redux/store.js`. Срезы:
- `productsSlice` — загрузка списка/деталей товара (`createAsyncThunk`, `axios`), кэш статуса (`loading/succeeded`).
- `categoriesSlice` — список категорий, выбор активной категории.
- `cartSlice` — простая корзина `{{items: []}}` с экшенами `addToCart`, `clearCart`.
- `favoritesSlice` — избранное `{{items: []}}` с экшенами `addFavorite`, `removeFavorite`.
- `homeSlice` — состояние для “товара дня” и прочего на главной.

Пример потока данных для страницы товаров:
1) `ProductsPage` → `dispatch(fetchProducts(categoryId))`  
2) `productsSlice` делает запрос через общую обёртку `@api/axios.js`  
3) `extraReducers` сохраняют данные/статус в стор  
4) Компоненты (`ProductCard`) подписаны на `{{state.products.items}}`

### Маршрутизация
В `src/app/App.jsx` описаны маршруты (React Router v6):
- `/` — главная (HomePage)
- `/products` — все товары
- `/category/:id` — товары по категории
- `/product/:id` — карточка товара
- `/categories` — список категорий
- `/sales` — товары со скидкой
- `*` — 404 (NotFoundPage)

Компонент `Breadcrumbs` строит “хлебные крошки” из `location.pathname`.

### Импорт по алиасам
Во `frontend/vite.config.js` настроены алиасы:
```
@       → src
@api    → src/api
@redux  → src/redux
@features → src/features
@common → src/common
```
Это избавляет от «../../../../». Пример: `import {{ Loader }} from '@common/components'`

### Работа с API
Общий axios‑инстанс — `src/api/axios.js`:
```js
const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3333' });
```
Также включён dev‑proxy Vite: запросы на `/api/*` проксируются на `http://localhost:3333`.

### UI и стили
- Общие компоненты — в `common/components` (layout/navigation/feedback/pages).
- Скелетон/лоадер — `feedback/Loader.jsx`.
- Темы/стили — `styles/index.css`, `styles/themes.css`. Переключатель тёмной темы планируется хранить в `localStorage` (см. TODO).

### Ключевые экраны и фичи
- **Главная**: приветственный блок + модалка “Товар дня” (`features/home/components/ProductOfDayModal.jsx`).
- **Список товаров**: `ProductsPage` с загрузкой по категории, карточки `ProductCard` (поддержка цен со скидкой).
- **Детальная карточка**: `ProductDetailsPage`.
- **Категории / скидки / избранное / корзина**: заготовленные модули (`features/*`), логика постепенно дорабатывается.

---

## Backend (API)

### Технологии
- **Express** — HTTP‑сервер
- **Sequelize + SQLite** — ORM и база данных (файл `backend/database.sqlite`)
- **CORS** — включён по умолчанию
- **Статика** — папка `backend/public` (изображения товаров/категорий)

### Модели и связи
- `Category` (id, title, image)
- `Product`  (id, title, price, discont_price, description, image, categoryId)
- `Category.hasMany(Product)`

### Маршруты (из папки `backend/routes`)
- `GET /products/all` — все товары
- `GET /products/:id` — один товар
- `GET /categories/all` — все категории
- `GET /categories/:id` — товары категории + данные категории
- `POST /sale/send` — отправка заявки на купон/скидку
- `POST /order/send` — создание заказа (заглушка)

Сервер слушает **порт 3333** (`backend/index.js`) и отдаёт `/public` как статику (например, изображения: `/product_img/...`).

---

## Переменные окружения

Фронтенд:
- `VITE_API_URL` — базовый URL API (по умолчанию `http://localhost:3333`).  
  Создайте `.env` в `frontend/`:
  ```env
  VITE_API_URL=http://localhost:3333
  ```

Бэкенд:
- (опционально) переменные для подключения к другой БД, если решите заменить SQLite.

---

## Соглашения по коду

- **Файловая структура по фичам**: каждый модуль — своя папка в `features/`.  
- **Именование**: компоненты — `PascalCase.jsx`, срезы — `camelCaseSlice.js`, хуки — `useSomething.js`.
- **Импорты через алиасы** (см. выше).
- **UI‑слои**: общие компоненты держим в `common/components`, бизнес‑специфичные — внутри фич.

---

## Типовой флоу добавления фичи

1. Создайте `src/features/<feature>/{components,pages,hooks,utils}`
2. Добавьте срез в `src/redux/slices/<feature>Slice.js`
3. Зарегистрируйте редьюсер в `src/redux/store.js`
4. (Опционально) Опишите маршруты в `src/app/App.jsx`
5. Подключите запросы к API через `@api/axios.js`

---

## TODO / Roadmap

- [ ] Переключение тёмной темы с сохранением в `localStorage`
- [ ] Формы с **react‑hook‑form** (скидка/купон, оформление заказа) + валидация
- [ ] Фильтры/сортировки на списках товаров (цена, скидка, A→Z)
- [ ] Пагинация и скелетоны на всех списках
- [ ] Persist избранного/корзины (localStorage)
- [ ] Тесты (unit на слайсы/утилиты)
- [ ] CI/CD, деплой фронтенда (например, на render.com) и API

---

## Частые вопросы

**Алиасы не работают?**  
Убедитесь, что используется Vite и не удалён `frontend/vite.config.js` с разделом `resolve.alias`.

## Авторы проекта

1. Иван - team lead
2. Алекс
3. Елена Корж
4. Оля Одарюк
