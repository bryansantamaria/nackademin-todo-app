const { createUser, loginUser, checkAuthorization, removeUser } = require('../models/userModel');
const { getAsUser, getTodoItems, insertToDo } = require('../models/toDoModel');

const userData = async (req, res) => {
	try {
		const usersToDos = await getAsUser(req.user.userId);
		let toDoWithItems = [];

		for await (todo of usersToDos) {
			let usersItems = await getTodoItems({ toDoId: todo._id });
			toDoWithItems.push({ toDoTitle: todo.title, toDoItems: usersItems });
		}

		let userData = {
			user: req.user,
			toDoList: toDoWithItems,
		};
		return res.status(200).json(userData);
	} catch (error) {
		console.log('ERRROOOR BRUR');
		return res.status(400).json(error);
	}
};

const deleteUser = async (req, res) => {
	try {
		await removeUser(req.user.userId);
		const message = `User, Lists and Items has been deleted for user ${req.user.userid} `;
		return res.status(200).json(message);
	} catch (err) {
		return res.status(400).json(err);
	}
};

const create = async (req, res) => {
	const { firstName, lastName, email, password } = req.body;
	try {
		if (await checkAuthorization(req.user.role)) {
			console.log('Authorized!!');
			const doc = await createUser(firstName, lastName, email, password);
			await insertToDo('My Tasks', doc._id);
			return res.status(200).json(doc);
		}
	} catch (error) {
		return res.status(401).json(error);
	}
};

const login = async (req, res) => {
	const { email, password } = req.body;
	try {
		const token = await loginUser(email, password);
		return res.status(200).json(token);
	} catch (error) {
		return res.status(401).json(error);
	}
};

const getUser = async (req, res) => {
	try {
		const { name, role } = req.user;
		return res.status(200).json({ name, role });
	} catch (error) {
		return res.status(401).json(error);
	}
};

module.exports = { create, login, getUser, userData, deleteUser };
