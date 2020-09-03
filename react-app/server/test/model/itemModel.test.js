const chai = require('chai');
chai.should();

const Users = require('../.././models/userModel');
const ToDos = require('../.././models/toDoModel');
const Item = require('../.././models/itemModel');

describe('Item Model', () => {
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
		item.should.deep.equal({
			title: 'Item Nr1',
			done: false,
			userId: this.test.userId,
			toDoId: this.test.toDoId,
			created: item.created,
			_id: item._id,
		});
	});

	it('Should find all items as Admin', async function () {
		await Item.insertItem('Item Nr1', false, this.test.userId, this.test.toDoId);

		const item = await Item.findAsAdmin();

		item.should.be.an('array');
		item.should.have.lengthOf(1);
		item[0].should.have.keys(['title', 'done', 'created', 'userId', 'toDoId', '_id']);
	});

	it('Should find all items as User', async function () {
		await Item.insertItem('Item Nr1', false, this.test.userId, this.test.toDoId);

		const item = await Item.findAsUser(this.test.userId);

		item.should.be.an('array');
		item.should.have.lengthOf(1);
		item[0].should.have.keys(['title', 'done', 'created', 'userId', 'toDoId', '_id']);
	});

	it('Should update a specific item with given itemId', async function () {
		const item = await Item.insertItem('Item Nr1', false, this.test.userId, this.test.toDoId);

		const updated = await Item.updateAsAdmin(item._id, 'Item Nr1 Updated', false);

		const updatedItem = await Item.findAsAdmin();

		updated.should.be.equal(1);
		updatedItem.should.be.an('array');
		updatedItem.should.have.lengthOf(1);
		updatedItem[0].should.have.keys([
			'title',
			'done',
			'created',
			'userId',
			'toDoId',
			'lastUpdated',
			'_id',
		]);
	});

	it('Should delete a specific item with given itemId', async function () {
		const item = await Item.insertItem('Item Nr1', false, this.test.userId, this.test.toDoId);

		const del = await Item.deleteAsAdmin(item._id);

		const delItem = await Item.findAsAdmin();

		del.should.be.equal(1);
		delItem.should.be.an('array');
		delItem.should.have.lengthOf(0);
	});
});
