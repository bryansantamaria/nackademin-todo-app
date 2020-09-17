const Database = require('../../database/dataBase');
const chai = require('chai');
chai.should();
const { expect } = chai;

const Users = require('../.././models/userModel');
const ToDos = require('../.././models/toDoModel');
const Item = require('../.././models/itemModel');

describe('Item Model', () => {
	before(async () => {
		await Database.connect();
	});

	after(async () => {
		await Database.disconnect();
	});
	beforeEach(async function () {
		await Users.clear();
		await ToDos.clear();
		await Item.clear();
		const user = await Users.createUser('Bryan', 'Santamaria', 'bryan@gmail.com', 'lol', 'admin');
		const todo = await ToDos.insertToDo('Todo title for Item', user._id);

		this.currentTest.toDoUserId = todo.userId;
		this.currentTest.toDoId = todo._id;
		this.currentTest.todo = todo;

		this.currentTest.userId = user._id;
		this.currentTest.password = user.password;
		this.currentTest.user = user;
	});
	// Insert user,
	it('Should create an Todo-item with a userId and toDoId', async function () {
		const item = await Item.insertItem('Item Nr1', false, this.test.userId, this.test.toDoId);

		item.should.be.an('object');
		item.should.include({
			title: 'Item Nr1',
			done: false,
			userId: this.test.userId,
			toDoId: this.test.toDoId,
		});
	});

	it('Should find all items as Admin', async function () {
		await Item.insertItem('Item Nr1', false, this.test.userId, this.test.toDoId);
		const item = await Item.findItems(this.test.toDoId);

		item.should.be.an('array');
		item.should.have.lengthOf(1);
	});

	it('Should find all items as User', async function () {
		await Item.insertItem('Item Nr1', false, this.test.userId, this.test.toDoId);

		const item = await Item.findItems(this.test.toDoId);

		item.should.be.an('array');
		item.should.have.lengthOf(1);
	});

	it('Should update a specific item with given itemId', async function () {
		const item = await Item.insertItem('Item Nr1', false, this.test.userId, this.test.toDoId);
		await Item.updateAsAdmin(item._id, 'Item Nr1 Updated', false);
		const updatedItem = await Item.findItems(this.test.toDoId);

		updatedItem.should.be.an('array');
		updatedItem.should.have.lengthOf(1);
	});

	it('Should delete a specific item with given itemId', async function () {
		const item = await Item.insertItem('Item Nr1', false, this.test.userId, this.test.toDoId);

		const del = await Item.deleteAsAdmin(item._id);

		const delItem = await Item.findItems(this.test.toDoId);

		delItem.should.be.an('array');
		delItem.should.have.lengthOf(0);
		expect(del).to.include({ n: 1, ok: 1, deletedCount: 1 });
	});
});
