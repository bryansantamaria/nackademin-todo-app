const app = require('./index');
const Database = require('./database/dataBase');
const PORT = 8080;

Database.connect().then(() =>
	app.listen(process.env.PORT || PORT, () => console.log("It's running birch"))
);
