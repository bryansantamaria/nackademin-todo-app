const app = require('../../index');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const { expect, request } = chai;

chai.should();

const UserModel = require('../.././models/userModel');
const ToDoModel = require('../.././models/toDoModel');
const ItemModel = require('../.././models/itemModel');

describe('Test RESTful resource ItemRouter & ItemController', () => {
	beforeEach(async function () {
		await UserModel.clear();
		await ToDoModel.clear();

		const user = await UserModel.createUser(
			'Bryan',
			'Santamaria',
			'bryan@gmail.com',
			'lol',
			'admin'
		);
		this.currentTest.userId = user._id;

		this.currentTest.token = await UserModel.loginUser('bryan@gmail.com', 'lol');
		this.currentTest.payload = await UserModel.verifyToken(
			this.currentTest.token,
			process.env.SECRET
		);
	});

	it('Should create a Todo with a post request', async function () {
		const toDo = await ToDoModel.insertToDo('BRYAN TODO', this.test.userId);
		const item = await ItemModel.insertItem(
			'ITEM IN BRYAN TODO',
			false,
			this.test.userId,
			toDo._id
		);
		const body = {
			title: 'Test toDo from HTTP',
		};
		request(app)
			.get('/items')
			.set('Authorization', `Bearer ${this.test.token}`)
			.send(body)
			.end((err, res) => {
				console.log(res.body);
			});
	});
});
