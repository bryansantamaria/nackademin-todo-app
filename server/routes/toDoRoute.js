const { Router } = require('express');
const router = new Router();
const { get, create, del, toDoWithItems, update } = require('../controllers/toDoController');
const { authenticate } = require('../middlewares/auth');

router.get('/', authenticate, get);
router.get('/:id/items', authenticate, toDoWithItems);
router.post('/create', authenticate, create);
router.delete('/:id/delete', authenticate, del);
router.patch('/:id/update', authenticate, update);

module.exports = router;
