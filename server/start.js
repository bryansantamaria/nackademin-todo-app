const app = require('./index');

const PORT = 8080;
app.listen(process.env.PORT || PORT, () => {
	console.log(`Listening to port: ${PORT}`);
});
