const Datastore = require('nedb-promises');
require('dotenv').config();

let toDoCollection, itemCollection, userCollection;
switch (process.env.ENVIRONMENT) {
	case 'development':
		toDoCollection = new Datastore({
			filename: './database/ToDos.db',
			autoload: true,
		});

		userCollection = new Datastore({
			filename: './database/Users.db',
			autoload: true,
		});

		itemCollection = new Datastore({
			filename: './database/Items.db',
			autoload: true,
		});
		break;

	case 'test':
		toDoCollection = new Datastore({
			filename: './database/test_ToDos.db',
			autoload: true,
		});

		userCollection = new Datastore({
			filename: './database/test_Users.db',
			autoload: true,
		});

		itemCollection = new Datastore({
			filename: './database/test_Items.db',
			autoload: true,
		});

	// toDoCollection.remove({});
	// itemCollection.remove({});
	// userCollection.remove({});
}

module.exports = { toDoCollection, itemCollection, userCollection };
