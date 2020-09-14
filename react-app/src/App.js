import React, { Component } from 'react';
import axios from 'axios';
import './stylesheets/styles.css';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from './middlewares/privateRoute';
import PrivateRouteCreate from './middlewares/privateRouteCreate';
import Login from './pages/login';
import CreateAccount from './pages/createAccount';

import {
	getToDo,
	postToDo,
	getItems,
	postItem,
	patchItem,
	getOrderBy,
	delItem,
	getUser,
	updateCompleted,
	getToDoWithItems,
	delToDo,
} from './utils/api';

import ToDoContainer from './components/ToDoContainer';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			todos: [],
			toDoItems: [],
			toDoId: '',
			selectedTodo: '',
			selectedItem: null,
			inputField: '',
			editBtnState: false,
			toggleCreateOrder: false,
			toggleUpdatedOrder: false,
			isAuthenticated: false,
			token: localStorage.getItem('token'),
			users: {},
		};
		this.limit = 0;
	}

	//Application has rendered on the client side
	async componentDidMount() {
		console.log('component did mount');
		if (this.state.token) {
			try {
				const user = await getUser('http://localhost:8080/users', this.state.token);
				this.setState({ users: user.data });
				window.localStorage.setItem('role', user.data.role);
			} catch (err) {
				console.log(err);
			}
			try {
				const toDo = await getToDo('http://localhost:8080/todos/', this.state.token);
				const toDoItems = await getItems('http://localhost:8080/items/', this.state.token);
				this.setState({
					todos: toDo.data,
					toDoItems: toDoItems.data,
					toDoId: toDo.data[0]._id,
				});
				console.log(this.state.todos);
				console.log(this.state.toDoItems);
			} catch (error) {
				console.log('ERR');
			}
		}
	}

	createToDo = async (title) => {
		const res = await postToDo('http://localhost:8080/todos/create', title, this.state.token);
		this.setState({ todos: [...this.state.todos, res.data] });
	};

	getToDo = async (id) => {
		console.log('GET TODOS');
		const res = await getToDoWithItems(`http://localhost:8080/todos/${id}/items`, this.state.token);
		this.setState({ toDoItems: res.data, toDoId: id });
	};

	deleteToDo = async (id) => {
		if (this.state.todos[0]._id || id) {
			await delToDo(`http://localhost:8080/todos/${id}/delete`, this.state.token);

			const toDoLists = [...this.state.todos];
			const newToDos = toDoLists.filter((todo) => todo._id !== id);

			const toDoItems = [...this.state.toDoItems];
			const newItems = toDoItems.filter((Item) => Item.toDoId !== id);

			if (this.state.todos[0]._id) {
				this.getToDo(this.state.todos[0]._id);
			}
			this.setState({ todos: newToDos, toDoItems: newItems });
		}
	};

	//Body posts title & done, then recieves data from end point and updates state.
	createItem = async (title) => {
		const res = await postItem(
			'http://localhost:8080/items/create',
			title,
			this.state.toDoId,
			this.state.token
		);
		console.log(this.state.toDoId);
		this.setState({ toDoItems: [...this.state.toDoItems, res.data] });
		console.log(this.state.toDoItems);
	};

	//Copy current items array, filter out item being deleted and update state.
	delete = async (id) => {
		const ItemList = [...this.state.toDoItems];
		const newItems = ItemList.filter((Item) => Item._id !== id);
		await delItem(`http://localhost:8080/items/delete/${id}`, this.state.token);
		this.setState({ toDoItems: newItems });
	};

	update = async (title) => {
		await patchItem(
			`http://localhost:8080/items/update/${this.state.selectedItem}`,
			title,
			this.state.token
		);
		const index = this.state.toDoItems.findIndex((Item) => Item._id === this.state.selectedItem);
		const oldState = [...this.state.toDoItems];
		oldState[index].title = title;

		this.setState({
			toDoItems: oldState,
			selectedItem: null,
		});
	};

	orderByCreated = async () => {
		console.log(this.state.toggleCreateOrder);
		if (this.state.toggleCreateOrder) {
			const res = await getOrderBy(
				`http://localhost:8080/items/sort/created/${-1}&${this.state.toDoId}`,
				this.state.token
			);
			let oldState = [...this.state.toDoItems];
			oldState = res.data;
			this.setState({
				toDoItems: oldState,
				toggleCreateOrder: false,
			});
		} else if (!this.state.toggleCreateOrder) {
			const res = await getOrderBy(
				`http://localhost:8080/items/sort/created/${1}&${this.state.toDoId}`,
				this.state.token
			);
			let oldState = [...this.state.toDoItems];
			oldState = res.data;
			this.setState({
				toDoItems: oldState,
				toggleCreateOrder: true,
			});
		}
	};

	orderByUpdated = () => {
		if (this.state.toggleUpdatedOrder) {
			axios
				.get(`http://localhost:8080/items/sort/lastUpdated${-1}&${this.state.toDoId}`, {
					headers: {
						Authorization: 'Bearer ' + this.state.token,
					},
				})
				.then((res) => {
					let oldState = [...this.state.toDoItems];
					oldState = res.data;
					this.setState({
						toDoItems: oldState,
						toggleUpdatedOrder: false,
					});
				});
		} else if (!this.state.toggleUpdatedOrder) {
			axios
				.get(`http://localhost:8080/items/sort/lastUpdated${1}&${this.state.toDoId}`, {
					headers: {
						Authorization: 'Bearer ' + this.state.token,
					},
				})
				.then((res) => {
					let oldState = [...this.state.toDoItems];
					oldState = res.data;
					this.setState({
						toDoItems: oldState,
						toggleUpdatedOrder: true,
					});
				});
		}
	};

	paginateFwrd = () => {
		axios
			.get(`http://localhost:8080/items/limit/${this.limit}&${this.state.toDoId}`, {
				headers: {
					Authorization: 'Bearer ' + this.state.token,
				},
			})
			.then((res) => {
				let oldState = [...this.state.toDoItems];
				oldState = res.data;
				this.setState({
					toDoItems: oldState,
				});
			});
		this.limit++;
	};

	paginateBckwrd = () => {
		if (this.limit !== 0) {
			this.limit--;
		}
		axios
			.get(`http://localhost:8080/items/limit/${this.limit}&${this.state.toDoId}`, {
				headers: {
					Authorization: 'Bearer ' + this.state.token,
				},
			})
			.then((res) => {
				let oldState = [...this.state.toDoItems];
				oldState = res.data;
				this.setState({
					toDoItems: oldState,
				});
			});
	};

	selectItem = (id) => {
		console.log(id);
		const editItem = this.state.toDoItems.find((Item) => Item._id === id);
		this.setState({
			selectedItem: id,
			inputField: editItem.title,
			editBtnState: true,
		});
		let input = document.getElementById('standard-basic');
		input.focus();
	};

	handleBtnState = (editBtnState) => {
		this.setState({ editBtnState });
	};

	complete = async (id) => {
		this.setState({
			toDoItems: this.state.toDoItems.map((Item) => {
				if (Item._id === id) {
					Item.done = !Item.done;
				}
				return Item;
			}),
		});
		const index = this.state.toDoItems.findIndex((Item) => Item._id === id);
		const { title, done } = this.state.toDoItems[index];
		await updateCompleted(
			`http://localhost:8080/items/update/${id}`,
			title,
			done,
			this.state.token
		);
	};

	isAuthenticated = (auth) => {
		const isAuthenticated = localStorage.getItem('token');

		if (auth === isAuthenticated) {
			console.log('Authorized');
			this.setState({ isAuthenticated: true, token: isAuthenticated });
		}
		window.location.href = 'http://localhost:3000/items';
	};

	render() {
		return (
			<div className='App'>
				<header className='App-header'>
					<BrowserRouter>
						<Switch>
							<Route
								path='/auth'
								render={(props) => <Login {...props} auth={this.isAuthenticated} />}
							/>

							<PrivateRouteCreate
								exact
								path='/create'
								component={CreateAccount}
								token={this.state.token}
							/>

							<PrivateRoute
								exact
								path={'/items'}
								component={ToDoContainer}
								isAuthenticated={this.state.token}
								users={this.state.users}
								todos={this.state.todos}
								deleteToDo={this.deleteToDo}
								toDoItems={this.state.toDoItems}
								getToDoWithId={this.getToDo}
								createToDo={this.createToDo}
								complete={this.complete}
								delete={this.delete}
								selectItem={this.selectItem}
								orderByCreated={this.orderByCreated}
								toggleCreateOrder={this.state.toggleCreateOrder}
								orderByUpdated={this.orderByUpdated}
								toggleUpdatedOrder={this.state.toggleUpdatedOrder}
								paginateFwrd={this.paginateFwrd}
								paginateBckwrd={this.paginateBckwrd}
								createItem={this.createItem}
								update={this.update}
								selectedItem={this.state.selectedItem}
								inputField={this.state.inputField}
								editBtnState={this.state.editBtnState}
								handleBtnState={this.handleBtnState}
							/>
							<Redirect to={{ pathname: '/auth' }} />
						</Switch>
					</BrowserRouter>
				</header>
			</div>
		);
	}
}

export default App;
