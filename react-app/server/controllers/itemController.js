const {
	insertItem,
	findAsAdmin,
	findAsUser,
	updateAsAdmin,
	updateAsUser,
	deleteAsAdmin,
	deleteAsUser,
	sortByCreatedAdmin,
	sortByCreatedUser,
	sortByUpdatedAdmin,
	sortByUpdatedUser,
	limitPaginateAdmin,
	limitPaginateUser,
	checkAuthorization,
	isOwner,
} = require('../models/itemModel');

const createToDo = async (req, res) => {
	try {
		const { title, done } = req.body;
		const doc = await insertItem(title, done, req.user.userId);

		return res.status(200).json(doc);
	} catch (error) {
		return res.status(403).json(error);
	}
};

const getToDos = async (req, res) => {
	try {
		const { userId, role } = req.user;

		if (await checkAuthorization(role)) {
			const doc = await findAsAdmin();
			return res.status(200).json(doc);
		} else {
			const doc = await findAsUser(userId);
			return res.status(200).json(doc);
		}
	} catch (error) {
		return res.status(403).json(error);
	}
};

const updToDo = async (req, res) => {
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

const delToDo = async (req, res) => {
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
		const { userId, role } = req.user;
		if (await checkAuthorization(role)) {
			const doc = await sortByCreatedAdmin(req.params.order);
			return res.status(200).json(doc);
		} else {
			const doc = await sortByCreatedUser(req.params.order, userId);
			return res.status(200).json(doc);
		}
	} catch (error) {}
	return res.status(403).json(error);
};

const sortUpdated = async (req, res) => {
	try {
		const { userId, role } = req.user;
		if (await checkAuthorization(role)) {
			const doc = await sortByUpdatedAdmin(req.params.order);
			return res.status(200).json(doc);
		} else {
			const doc = await sortByUpdatedUser(req.params.order, userId);
			return res.status(200).json(doc);
		}
	} catch (error) {}
	return res.status(403).json(error);
};

const paginate = async (req, res) => {
	try {
		const { userId, role } = req.user;
		let perPage = 5;
		let skip = Math.max(0, req.params.skip);

		if (await checkAuthorization(role)) {
			const doc = await limitPaginateAdmin(perPage, skip);
			return res.status(200).json(doc);
		} else {
			const doc = await limitPaginateUser(perPage, skip, userId);
			return res.status(200).json(doc);
		}
	} catch {
		return res.status(403).json(error);
	}
};

module.exports = {
	createToDo,
	getToDos,
	updToDo,
	delToDo,
	sortCreate,
	sortUpdated,
	paginate,
};
