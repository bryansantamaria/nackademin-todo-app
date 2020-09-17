const {
	insertItem,
	findItems,
	updateAsAdmin,
	updateAsUser,
	deleteAsAdmin,
	deleteAsUser,
	sortByCreated,
	sortByUpdated,
	limitPagination,
	checkAuthorization,
	isOwner,
} = require('../models/itemModel');

const { getOneToDo, getAsAdmin, getAsUser } = require('../models/toDoModel');

const createItem = async (req, res) => {
	try {
		const { title, done, toDoId } = req.body;
		const doc = await insertItem(title, done, req.user.userId, toDoId);

		return res.status(200).json(doc);
	} catch (error) {
		return res.status(403).json(error);
	}
};

const getItems = async (req, res) => {
	try {
		const { userId, role } = req.user;
		if (await checkAuthorization(role)) {
			const toDo = await getAsAdmin();
			const doc = await findItems(toDo[0]._id);
			return res.status(200).json(doc);
		} else {
			const toDo = await getAsUser(userId);
			const doc = await findItems(toDo[0]._id);
			return res.status(200).json(doc);
		}
	} catch (error) {
		return res.status(403).json(error);
	}
};

const updItems = async (req, res) => {
	try {
		const { title, done } = req.body;
		const { userId, role } = req.user;

		if (await checkAuthorization(role)) {
			const doc = await updateAsAdmin(req.params.id, title, done);
			return res.status(200).json(doc);
		} else if (await isOwner(req.params.id, userId)) {
			const doc = await updateAsUser(req.params.id, title, done, userId);
			return res.status(200).json(doc);
		}
	} catch (error) {
		return res.status(403).json(error);
	}
};

const delItems = async (req, res) => {
	try {
		const { userId, role } = req.user;

		if (await checkAuthorization(role)) {
			const doc = await deleteAsAdmin(req.params.id);
			return res.status(200).json(doc);
		} else if (await isOwner(req.params.id, userId)) {
			const doc = await deleteAsUser(req.params.id, userId);
			return res.status(200).json(doc);
		}
	} catch (error) {
		return res.status(403).json(error);
	}
};

const sortCreate = async (req, res) => {
	try {
		const { role } = req.user;
		const toDoId = await getOneToDo(req.params.toDoId);
		if (await checkAuthorization(role)) {
			const doc = await sortByCreated(req.params.order, toDoId._id);
			return res.status(200).json(doc);
		} else {
			const doc = await sortByCreated(req.params.order, toDoId._id);
			return res.status(200).json(doc);
		}
	} catch (error) {
		return res.status(403).json(error);
	}
};

const sortUpdated = async (req, res) => {
	try {
		const { role } = req.user;
		const toDoId = await getOneToDo(req.params.toDoId);
		if (await checkAuthorization(role)) {
			const doc = await sortByUpdated(req.params.order, toDoId._id);
			return res.status(200).json(doc);
		} else {
			const doc = await sortByUpdated(req.params.order, toDoId._id);
			return res.status(200).json(doc);
		}
	} catch (error) {
		return res.status(403).json(error);
	}
};

const paginate = async (req, res) => {
	try {
		const { role } = req.user;
		let perPage = 5;
		let skip = Math.max(0, req.params.skip);
		const toDoId = await getOneToDo(req.params.toDoId);
		if (await checkAuthorization(role)) {
			const doc = await limitPagination(perPage, skip, toDoId._id);
			return res.status(200).json(doc);
		} else {
			const doc = await limitPagination(perPage, skip, toDoId._id);
			return res.status(200).json(doc);
		}
	} catch {
		return res.status(403).json(error);
	}
};

module.exports = {
	createItem,
	getItems,
	updItems,
	delItems,
	sortCreate,
	sortUpdated,
	paginate,
};
