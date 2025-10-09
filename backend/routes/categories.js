const express = require('express');
const Category = require('../database/models/category');
const Product = require('../database/models/product');

const router = express.Router();

// GET /categories/all — список категорий
router.get('/all', async (_req, res) => {
  try {
    const rows = await Category.findAll();
    // На всякий случай сериализуем
    const data = rows.map(r => (typeof r.toJSON === 'function' ? r.toJSON() : r));
    return res.json({
  category,
  data,
  items: data,
  products: data,
  count: data.length
});
  } catch (err) {
    console.error('GET /categories/all error:', err);
    return res.status(500).json({ status: 'ERR', message: 'Internal Server Error' });
  }
});

// GET /categories/:id — товары категории (с метаданными категории)
router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ status: 'ERR', message: 'wrong id' });
    }

    // Категория
    const categoryRow = await Category.findOne({ where: { id } });
    if (!categoryRow) {
      return res.status(404).json({ status: 'ERR', message: 'category not found' });
    }

    // Товары этой категории
    const productsRows = await Product.findAll({ where: { categoryId: id } });

    // Если пусто — это не ошибка сервера, просто отдаём пустой массив
    const category = typeof categoryRow.toJSON === 'function' ? categoryRow.toJSON() : categoryRow;
    const data = productsRows.map(p => (typeof p.toJSON === 'function' ? p.toJSON() : p));

    return res.json({ category, data });
  } catch (err) {
    console.error(`GET /categories/${req.params.id} error:`, err);
    // Любая необработанная ошибка — 500, чтобы не было 502 от Render
    return res.status(500).json({ status: 'ERR', message: 'Internal Server Error' });
  }
});
module.exports = router;