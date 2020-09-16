require('dotenv').config();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { removeUserToDo } = require('./toDoModel');
const { removeUserItems } = require('./itemModel');

const userSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	email: { type: String, unique: true },
	role: String,
	password: String,
	posts: Array,
});

const User = mongoose.model('User', userSchema);

const createUser = async (firstName, lastName, email, password) => {
	const doc = await User.findOne({ email: email });
	if (!doc) {
		const hash = bcrypt.hashSync(password, 10);
		const doc = await User.create({
			firstName,
			lastName,
			password: hash,
			email,
			role: 'user',
		});
		return doc._doc;
	}
	return console.log('EMAIL already registered!');
};

const loginUser = async (email, password) => {
	console.log('Enter login');
	const doc = await User.findOne({ email: email });
	if (!doc) return json('Email not found');

	const success = await bcrypt.compareSync(password, doc.password);
	if (!success) return json('Wrong password');

	const token = await jwt.sign(
		{ email: doc.email, userId: doc._id, role: doc.role, name: doc.firstName },
		process.env.SECRET,
		{
			expiresIn: '1h',
		}
	);
	return token;
};

const verifyToken = async (token, secret) => {
	const validToken = await jwt.verify(token, secret);
	return validToken;
};

const clear = async () => {
	const doc = await User.remove({}, { multi: true });
	return doc;
};

const removeUser = async (id) => {
	const doc = await User.remove({ _id: id });
	await removeUserItems.remove(id);
	await removeUserToDo.remove(id);
	return doc;
};

const checkAuthorization = async (role) => {
	if (role === 'admin') {
		return true;
	} else {
		return false;
	}
};

module.exports = {
	createUser,
	loginUser,
	verifyToken,
	removeUser,
	clear,
	checkAuthorization,
};
