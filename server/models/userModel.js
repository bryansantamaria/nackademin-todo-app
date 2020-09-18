require('dotenv').config();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	email: { type: String, unique: true },
	password: String,
	role: String,
});

const User = mongoose.model('User', userSchema);

const createUser = async (firstName, lastName, email, password, role = 'user') => {
	try {
		const doc = await User.findOne({ email: email }).exec();
		if (!doc) {
			const hash = bcrypt.hashSync(password, 10);
			const doc = await User.create({
				firstName,
				lastName,
				password: hash,
				email,
				role: role,
			});
			return doc._doc;
		}
		return console.log('EMAIL already registered!');
	} catch (err) {
		console.log(err);
	}
};

const loginUser = async (email, password) => {
	const doc = await User.findOne({ email: email });
	if (!doc) return console.log('email not found');

	const success = bcrypt.compareSync(password, doc.password);
	if (!success) return console.log('password not correct');

	const token = jwt.sign(
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
	const doc = await User.deleteMany({}, { multi: true });
	return doc;
};

const removeUser = async (id) => {
	console.log('entering removeUser');
	const doc = await User.deleteOne({ _id: id });
	console.log('remove user finished');
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
