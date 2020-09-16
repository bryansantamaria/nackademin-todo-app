const app = require('../../index');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const { expect, request } = chai;

chai.should();

const UserModel = require('../.././models/userModel');
const ToDoModel = require('../.././models/toDoModel');
const ItemModel = require('../.././models/itemModel');

describe('Test RESTful resource toDoRouter & toDoController', () => {
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
		const body = {
			title: 'Test toDo from HTTP',
		};
		request(app)
			.post('/todos/create')
			.set('Authorization', `Bearer ${this.test.token}`)
			.send(body)
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res).to.be.json;
				expect(res.body).to.have.keys(['_id', 'title', 'userId']);
			});
	});

	it('Should Get all Todos with a get request', async function () {
		const todo = await ToDoModel.insertToDo('First Todo Title', this.test.userId);

		request(app)
			.get('/todos')
			.set('Authorization', `Bearer ${this.test.token}`)
			.send()
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res).to.be.json;
				expect(res.body[0]).to.include({
					title: todo.title,
					userId: todo.userId,
					_id: todo._id,
				});
			});
	});

	it('Should Get a specific Todo-list with all Todo-items', async function () {
		const todo = await ToDoModel.insertToDo('First Todo Title', this.test.userId);
		await ItemModel.insertItem('Item Title1', false, this.test.userId, todo._id);
		await ItemModel.insertItem('Item Title2', false, this.test.userId, todo._id);
		await ItemModel.insertItem('Item Title3', false, this.test.userId, todo._id);

		request(app)
			.get(`/todos/${todo._id}/items`)
			.set('Authorization', `Bearer ${this.test.token}`)
			.send()
			.end((err, res) => {
				console.log(res.body);
				//Lägga till ett stickprov på säg index 2 att titeln bör vara X.
				expect(res).to.have.status(200);
				expect(res).to.be.json;
			});
	});

	it('Should Delete a specific Todo-list and its todo-items with given ID', async function () {
		const toDo = await ToDoModel.insertToDo('First Todo Title', this.test.userId);
		await ItemModel.insertItem('DEL Item Nr1', false, this.test.userId, toDo._id);
		await ItemModel.insertItem('DEL Item Nr2', false, this.test.userId, toDo._id);
		await ItemModel.insertItem('DEL Item Nr3', false, this.test.userId, toDo._id);

		request(app)
			.delete(`/todos/${toDo._id}/delete`)
			.set('Authorization', `Bearer ${this.test.token}`)
			.send()
			.end((err, res) => {
				console.log(res.body);
				expect(err).to.be.null;
				expect(res).to.have.status(200);
			});
	});

	it('Should update a specific Todo-list title with given ID', async function () {
		const toDo = await ToDoModel.insertToDo('First Todo Title', this.test.userId);

		const body = {
			title: 'Updated title from patch',
		};
		request(app)
			.patch(`/todos/${toDo._id}/update`)
			.set('Authorization', `Bearer ${this.test.token}`)
			.send(body)
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(err).to.be.null;
				expect(res.body).to.include({
					title: 'Updated title from patch',
					userId: toDo.userId,
					_id: toDo._id,
					lastUpdated: res.body.lastUpdated,
				});
			});
	});
});
