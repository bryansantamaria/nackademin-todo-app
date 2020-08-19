const Datastore = require('nedb-promises'),
    const toDoCollection = new Datastore({
        filename: "./database/ToDo.db",
        autoload: true,
    });

const createToDo = async (title, done) => {
    const doc = await toDoCollection.insert({title, done});

    return doc;
}

module.exports = {createToDo}