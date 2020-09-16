const {
	insertToDo,
	getAsAdmin,
	getAsUser,
	deleteToDo,
	checkAuthorization,
	isOwner,
	updateTodo,
} = require('../models/toDoModel');
const { deleteItems, todoWithItems } = require('../models/itemModel');

const create = async (req, res) => {
	try {
		const { title } = req.body;
		const doc = await insertToDo(title, req.user.userId);
		return res.status(200).json(doc);
	} catch (error) {
		return res.status(403).json(error);
	}
};

const get = async (req, res) => {
	try {
		const { userId, role } = req.user;

		if (await checkAuthorization(role)) {
			console.log('Entering as Admin');
			const doc = await getAsAdmin();
			return res.status(200).json(doc);
		} else {
			const doc = await getAsUser(userId);

			return res.status(200).json(doc);
		}
	} catch (error) {
		return res.status(401).json(error);
	}
};

const del = async (req, res) => {
	try {
		const { userId, role } = req.user;

		if (await checkAuthorization(role)) {
			await deleteItems(req.params.id);
			const doc = await deleteToDo(req.params.id);
			return res.status(200).json(doc);
		}
		if (await isOwner(req.params.id, userId)) {
			await deleteItems(req.params.id);
			const doc = await deleteToDo(req.params.id);
			return res.status(200).json(doc);
		}
	} catch (error) {
		return res.status(403).json(error);
	}
};

const toDoWithItems = async (req, res) => {
	try {
		const { userId, role } = req.user;
		const { id } = req.params;
		if (await checkAuthorization(role)) {
			const doc = await todoWithItems({ toDoId: id });
			return res.status(200).json(doc);
		}
		if (await isOwner(req.params.id, userId)) {
			const doc = await todoWithItems({ toDoId: id });
			return res.status(200).json(doc);
		}
	} catch (error) {
		return res.status(403).json(error);
	}
};

const update = async (req, res) => {
	try {
		const { title } = req.body;
		const { userId, role } = req.user;
		console.log('inside update');
		if (await checkAuthorization(role)) {
			console.log('admin update');
			const doc = await updateTodo(req.params.id, title);
			return res.status(200).json(doc);
		} else if (await isOwner(req.params.id, userId)) {
			console.log('user update');
			const doc = await updateTodo(req.params.id, title);
			return res.status(200).json(doc);
		}
	} catch (error) {
		return res.status(403).json(error);
	}
};

module.exports = {
	create,
	get,
	del,
	toDoWithItems,
	update,
};
