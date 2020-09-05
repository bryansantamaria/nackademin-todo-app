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

		console.log('Enter getItems');
		console.log(req.user);
		if (await checkAuthorization(role)) {
			const doc = await findAsAdmin();
			// console.log(doc);
			return res.status(200).json(doc);
		} else {
			console.log('I AM MORTAL');
			const doc = await findAsUser(userId);
			console.log(doc);
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
	createItem,
	getItems,
	updItems,
	delItems,
	sortCreate,
	sortUpdated,
	paginate,
};
