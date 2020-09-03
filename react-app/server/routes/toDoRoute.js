const { Router } = require('express');
const router = new Router();
const { get, create, del, toDoWithItems } = require('../controllers/toDoController');
const { authenticate } = require('../middlewares/auth');

router.get('/', authenticate, get);
router.get('/:id/items', authenticate, toDoWithItems);
router.post('/create', authenticate, create);
router.delete('/delete/:id', authenticate, del);

module.exports = router;
