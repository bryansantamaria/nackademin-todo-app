const Database = require('../../database/dataBase');
const chai = require('chai');
chai.should();

const Users = require('../../models/userModel');

describe('userModel', () => {
	before(async () => {
		await Database.connect();
	});

	after(async () => {
		await Database.disconnect();
	});
	beforeEach(async function () {
		await Users.clear();
		const user = await Users.createUser('Bryan', 'Santamaria', 'bryan@gmail.com', 'lol', 'admin');
		this.currentTest.userId = user._id;
		this.currentTest.password = user.password;
		this.currentTest.user = user;
	});

	it('Should create a user and check if user has exact keys and values', async function () {
		await this.test.user.should.deep.equal({
			__v: 0,
			firstName: 'Bryan',
			lastName: 'Santamaria',
			email: 'bryan@gmail.com',
			password: this.test.password,
			role: 'admin',
			_id: this.test.userId,
		});
		this.test.user.should.be.an('object');
	});
});
