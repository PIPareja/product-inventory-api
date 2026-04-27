const pool = require('../config/db');

const createError = (message, statusCode) => {
    const err = new Error(message);
    err.statusCode = statusCode;
    return err;
};

const getAllProducts = async (req, res, next) => {
    try {
        const [rows] = await pool.query('SELECT * FROM products ORDER BY created_at DESC');
        res.json({ success: true, data: rows });
    } catch (err) {
        next(err);
    }
};

const getProductById = async (req, res, next) => {
    try {
        const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
        if (rows.length === 0) throw createError('Product not found', 404);
        res.json({ success: true, data: rows[0] });
    } catch (err) {
        next(err);
    }
};

const createProduct = async (req, res, next) => {
    try {
        const { name, description, price, stock } = req.body;
        if (!name || price === undefined || stock === undefined) {
            throw createError('Fields name, price and stock are required', 400);
        }
        const [result] = await pool.query(
            'INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)',
            [name, description || null, price, stock]
        );
        res.status(201).json({
            success: true,
            message: 'Product created',
            data: { id: result.insertId, name, description, price, stock },
        });
    } catch (err) {
        next(err);
    }
};

const updateProduct = async (req, res, next) => {
    try {
        const { name, description, price, stock } = req.body;
        const [existing] = await pool.query('SELECT id FROM products WHERE id = ?', [req.params.id]);
        if (existing.length === 0) throw createError('Product not found', 404);
        await pool.query(
            'UPDATE products SET name = ?, description = ?, price = ?, stock = ? WHERE id = ?',
            [name, description, price, stock, req.params.id]
        );
        res.json({ success: true, message: 'Product updated' });
    } catch (err) {
        next(err);
    }
};

const deleteProduct = async (req, res, next) => {
    try {
        const [existing] = await pool.query('SELECT id FROM products WHERE id = ?', [req.params.id]);
        if (existing.length === 0) throw createError('Product not found', 404);
        await pool.query('DELETE FROM products WHERE id = ?', [req.params.id]);
        res.json({ success: true, message: 'Product deleted' });
    } catch (err) {
        next(err);
    }
};

// POST /api/products/reset
const resetProducts = async (req, res, next) => {
    try {
        await pool.query('DELETE FROM products');
        await pool.query('ALTER TABLE products AUTO_INCREMENT = 1');

        await pool.query(`
      INSERT INTO products (name, description, price, stock) VALUES
        ('Laptop Pro 15',     'Laptop de alto rendimiento',             1300, 10),
        ('Mouse Inalámbrico', 'Mouse ergonómico con batería recargable',  40, 50),
        ('Teclado Mecánico',  'Switches red, retroiluminado RGB',          90, 25),
        ('Monitor 4K',        '27 pulgadas UHD',                         500,  8)
    `);

        res.json({ success: true, message: 'Products reset successfully' });
    } catch (err) {
        next(err);
    }
};

module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, resetProducts };