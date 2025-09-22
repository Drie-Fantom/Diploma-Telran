
const express = require('express');
const categories = require('./routes/categories');
const sale = require('./routes/sale');
const order = require('./routes/order');
const products = require('./routes/products');
const sequelize = require('./database/database');
const cors = require('cors')
const Category = require('./database/models/category');
const Product = require('./database/models/product');
const PORT = process.env.PORT || 3333;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
const DEPLOYED_FRONTEND_URL = 'https://diploma-telran.onrender.com';

const normalizeOrigin = (value) => {
    if (!value) {
        return null;
    }

    try {
        const url = new URL(value);
        const isDefaultPort =
            (url.protocol === 'http:' && (!url.port || url.port === '80')) ||
            (url.protocol === 'https:' && (!url.port || url.port === '443'));

        const portSegment = !isDefaultPort && url.port ? `:${url.port}` : '';

        return `${url.protocol}//${url.hostname}${portSegment}`.toLowerCase();
    } catch (error) {
        console.warn(`Ignoring invalid origin "${value}": ${error.message}`);
        return null;
    }
};

const allowedOrigins = new Set();

const registerOrigin = (value) => {
    const normalized = normalizeOrigin(value);

    if (normalized) {
        allowedOrigins.add(normalized);
    }
};

registerOrigin(FRONTEND_URL);
registerOrigin(DEPLOYED_FRONTEND_URL);
registerOrigin('http://localhost:5173');

(process.env.ADDITIONAL_ALLOWED_ORIGINS || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)
    .forEach(registerOrigin);

const isLocalhostOrigin = (value) => {
    try {
        const { hostname } = new URL(value);
        return hostname === 'localhost' || hostname === '127.0.0.1';
    } catch (error) {
        console.warn(`Failed to parse origin "${value}" for localhost check: ${error.message}`);
        return false;
    }
};

const evaluateOrigin = (origin) => {
    if (!origin) {
        return { allowed: true, value: true };
    }

    const normalized = normalizeOrigin(origin);

    if (!normalized) {
        return { allowed: false, value: null };
    }

    if (allowedOrigins.has(normalized) || isLocalhostOrigin(normalized)) {
        return { allowed: true, value: normalized };
    }

    return { allowed: false, value: null };
};

Category.hasMany(Product);

const app = express();
app.use(express.static('public'))
app.use(cors({
    origin: '*'
}));

const corsOptions = {
    origin: (origin, callback) => {
        const { allowed, value } = evaluateOrigin(origin);

        if (allowed) {
            return callback(null, value);
        }

        console.warn(`Blocked cross-origin request from ${origin}`);
        return callback(null, false);
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/categories', categories);
app.use('/products', products);
app.use('/sale', sale);
app.use('/order', order);




app.use(express.json());

const start = async () => {
    try {
        await sequelize.sync().then(
            result => {/*console.log(result) */ },
            err => console.log(err)
        );

        app.listen(PORT, () => {
            console.log(`\n\nServer started on ${PORT} port...`)
        })
    } catch (err) {
        console.log(err);
    }
}
start();

// app.listen('3333');