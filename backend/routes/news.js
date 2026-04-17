const express = require('express');
const { getAllNews, getNewsById, createNews, updateNews, deleteNews } = require('../controllers/newsController');
const { requireAdmin } = require('../middleware/auth');

const router = express.Router();

router.get('/', getAllNews);
router.get('/:id', getNewsById);
router.post('/', requireAdmin, createNews);
router.put('/:id', requireAdmin, updateNews);
router.delete('/:id', requireAdmin, deleteNews);

module.exports = router;
