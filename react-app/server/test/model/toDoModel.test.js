const chai = require('chai');
chai.should();

const Users = require('../../models/userModel');
const ToDos = require('../../models/toDoModel');

describe('toDoModel', () => {
	beforeEach(async function () {
		await Users.clear();
		await ToDos.clear();
		const user = await Users.createUser('Bryan', 'Santamaria', 'bryan@gmail.com', 'lol', 'admin');
		this.currentTest.userId = user._id;
		this.currentTest.password = user.password;
		this.currentTest.user = user;
	});

	it('Should insert a toDo-list with a userId (owner)', async function () {
		const todo = await ToDos.insertToDo('First Todo Title', this.test.userId);

		todo.should.deep.equal({
			title: 'First Todo Title',
			userId: this.test.userId,
			_id: todo._id,
		});
		todo.should.be.an('object');
	});

	it('Should get all toDo-lists for an admin', async function () {
		await ToDos.insertToDo('First Todo Title', this.test.userId);
		const getToDo = await ToDos.getAsAdmin();

		getToDo[0].should.have.keys(['title', 'userId', '_id']);
		getToDo.should.be.an('array');
		getToDo.should.have.lengthOf(1);
	});

	it('Should get all toDo-lists for a specific user (not Admin)', async function () {
		const todo = await ToDos.insertToDo('First Todo Title', this.test.userId);
		await ToDos.insertToDo('Second Todo Title', this.test.userId);
		const getToDo = await ToDos.getAsUser(todo.userId);

		getToDo[1].should.have.keys(['title', 'userId', '_id']);
		getToDo.should.be.an('array');
		getToDo.should.have.lengthOf(2);
	});

	it('Should delete a specific toDo-list as user and return true', async function () {
		const todo = await ToDos.insertToDo('User Todo soon to be deleted', this.test.userId);
		const deleteTodo = await ToDos.deleteAsUser(todo._id);
		deleteTodo.should.be.equal(true);
	});

	it('Should delete a specific toDo-list as Admin and return true', async function () {
		const todo = await ToDos.insertToDo('Admin Todo soon to be deleted', this.test.userId);
		const deleteTodo = await ToDos.deleteAsAdmin(todo._id);
		deleteTodo.should.be.equal(true);
	});
});
