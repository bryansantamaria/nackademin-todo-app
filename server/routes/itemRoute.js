const { Router } = require('express');
const {
	createItem,
	getItems,
	updItems,
	delItems,
	sortCreate,
	sortUpdated,
	paginate,
} = require('../controllers/itemController');
const { authenticate } = require('../middlewares/auth');

const router = new Router();

router.get('/', authenticate, getItems);
router.post('/create', authenticate, createItem);
router.patch('/update/:id', authenticate, updItems);
router.delete('/delete/:id', authenticate, delItems);
router.get('/sort/created/:order&:toDoId', authenticate, sortCreate);
router.get('/sort/lastUpdated:order&:toDoId', authenticate, sortUpdated);
router.get('/limit/:skip&:toDoId', authenticate, paginate);

module.exports = router;
