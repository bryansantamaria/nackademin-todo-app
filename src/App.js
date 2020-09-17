import React, { Component } from 'react';
import axios from 'axios';
import './stylesheets/styles.css';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from './middlewares/privateRoute';
import PrivateRouteCreate from './middlewares/privateRouteCreate';
import Login from './pages/login';
import CreateAccount from './pages/createAccount';
import ErrorBoundary from './middlewares/ErrorBoundary';
import Cookie from './components/Cookie';
import {
	getToDo,
	postToDo,
	getItems,
	postItem,
	patchItem,
	getOrderBy,
	delItem,
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
			toDoTitle: '',
			selectedTodo: '',
			selectedItem: null,
			inputField: '',
			editBtnState: false,
			createBtnState: false,
			toggleCreateOrder: false,
			toggleUpdatedOrder: false,
			isAuthenticated: false,
			token: sessionStorage.getItem('token'),
			users: {},
		};
		this.limit = 0;
	}

	//Application has rendered on the client side
	async componentDidMount() {
		console.log('component did mount');
		if (this.state.token) {
			try {
				const name = sessionStorage.getItem('name');
				const role = sessionStorage.getItem('role');
				const user = { name: name, role: role };
				this.setState({ users: user });
				const toDo = await getToDo('/todos/', this.state.token);
				if (toDo.data.length > 0) {
					const toDoItems = await getItems('/items/', this.state.token);
					this.setState({
						todos: toDo.data,
						toDoItems: toDoItems.data,
						toDoId: toDo.data[0]._id,
					});
				}
			} catch (error) {
				console.log('Err');
			}
		}
	}

	isAuthenticated = (auth) => {
		console.log(auth);
		const isAuthenticated = sessionStorage.getItem('token');

		if (auth) {
			console.log('Authorized');
			this.setState({ isAuthenticated: true, token: isAuthenticated });
			window.location.href = '/todo';
		}
	};

	setCookie = async (userData) => {
		window.sessionStorage.setItem('token', this.state.token);
		window.sessionStorage.setItem('role', userData.role);
		window.sessionStorage.setItem('name', userData.name);
		this.setState({ users: userData });
	};

	createToDo = async (title) => {
		const res = await postToDo('/todos/create', title, this.state.token);
		this.setState({
			todos: [...this.state.todos, res.data],
			toDoId: res.data._id,
			toDoTitle: title,
			toDoItems: [],
			createBtnState: true,
		});
	};

	getToDoWithId = async (id, title) => {
		console.log('GET TODOS');
		const res = await getToDoWithItems(`/todos/${id}/items`, this.state.token);
		if (res) {
			this.setState({ toDoItems: res.data, toDoId: id, toDoTitle: title, createBtnState: false });
		}
	};

	deleteToDo = async (id) => {
		if (this.state.todos.length >= 0) {
			await delToDo(`/todos/${id}/delete`, this.state.token);

			const toDoLists = [...this.state.todos];
			const newToDos = toDoLists.filter((todo) => todo._id !== id);

			const toDoItems = [...this.state.toDoItems];
			const newItems = toDoItems.filter((Item) => Item.toDoId !== id);

			this.setState({ todos: newToDos, toDoItems: newItems, createBtnState: false });
		}
	};

	//Body posts title & done, then recieves data from end point and updates state.
	createItem = async (title) => {
		if (this.state.toDoId !== '') {
			const res = await postItem('/items/create', title, this.state.toDoId, this.state.token);
			console.log(this.state.toDoId);
			this.setState({ toDoItems: [...this.state.toDoItems, res.data] });
			console.log(this.state.toDoItems);
		} else {
			console.log('Wooops, create an todo-list first');
		}
	};

	//Copy current items array, filter out item being deleted and update state.
	delete = async (id) => {
		const ItemList = [...this.state.toDoItems];
		const newItems = ItemList.filter((Item) => Item._id !== id);
		await delItem(`/items/delete/${id}`, this.state.token);
		this.setState({ toDoItems: newItems });
	};

	update = async (title) => {
		await patchItem(`/items/update/${this.state.selectedItem}`, title, this.state.token);
		const index = this.state.toDoItems.findIndex((Item) => Item._id === this.state.selectedItem);
		const oldState = [...this.state.toDoItems];
		oldState[index].title = title;

		this.setState({
			toDoItems: oldState,
			selectedItem: null,
		});
	};

	orderByCreated = async () => {
		try {
			if (this.state.toggleCreateOrder) {
				const res = await getOrderBy(
					`/items/sort/created/${-1}&${this.state.toDoId}`,
					this.state.token
				);
				if (Array.isArray(res.data)) {
					let oldState = [...this.state.toDoItems];
					oldState = res.data;
					this.setState({
						toDoItems: oldState,
						toggleCreateOrder: false,
					});
				}
			} else if (!this.state.toggleCreateOrder) {
				const res = await getOrderBy(
					`/items/sort/created/${1}&${this.state.toDoId}`,
					this.state.token
				);
				if (Array.isArray(res.data)) {
					console.log(res.data);
					let oldState = [...this.state.toDoItems];
					oldState = res.data;
					this.setState({
						toDoItems: oldState,
						toggleCreateOrder: true,
					});
				}
			}
		} catch (error) {
			console.log('No items to sort by');
		}
	};

	orderByUpdated = () => {
		try {
			if (this.state.toggleUpdatedOrder) {
				axios
					.get(`/items/sort/lastUpdated${-1}&${this.state.toDoId}`, {
						headers: {
							Authorization: 'Bearer ' + this.state.token,
						},
					})
					.then((res) => {
						if (Array.isArray(res.data)) {
							let oldState = [...this.state.toDoItems];
							oldState = res.data;
							this.setState({
								toDoItems: oldState,
								toggleUpdatedOrder: false,
							});
						}
					});
			} else if (!this.state.toggleUpdatedOrder) {
				axios
					.get(`/items/sort/lastUpdated${1}&${this.state.toDoId}`, {
						headers: {
							Authorization: 'Bearer ' + this.state.token,
						},
					})
					.then((res) => {
						if (Array.isArray(res.data)) {
							let oldState = [...this.state.toDoItems];
							oldState = res.data;
							this.setState({
								toDoItems: oldState,
								toggleUpdatedOrder: true,
							});
						}
					});
			}
		} catch (error) {
			console.log('no items to sortUpdatedBy');
		}
	};

	paginateFwrd = () => {
		try {
			axios
				.get(`/items/limit/${this.limit}&${this.state.toDoId}`, {
					headers: {
						Authorization: 'Bearer ' + this.state.token,
					},
				})
				.then((res) => {
					if (Array.isArray(res.data)) {
						let oldState = [...this.state.toDoItems];
						oldState = res.data;
						this.setState({
							toDoItems: oldState,
						});
					}
				});
			this.limit++;
		} catch (error) {
			console.log('Nothing to paginate');
		}
	};

	paginateBckwrd = () => {
		try {
			axios
				.get(`/items/limit/${this.limit}&${this.state.toDoId}`, {
					headers: {
						Authorization: 'Bearer ' + this.state.token,
					},
				})
				.then((res) => {
					if (Array.isArray(res.data)) {
						let oldState = [...this.state.toDoItems];
						oldState = res.data;
						this.setState({
							toDoItems: oldState,
						});
					}
				});
		} catch (error) {
			console.log('nothing to paginate');
		}
		if (this.limit !== 0) {
			this.limit--;
		}
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
		await updateCompleted(`/items/update/${id}`, title, done, this.state.token);
	};

	render() {
		return (
			<div className='App'>
				<header className='App-header'>
					<BrowserRouter>
						<Switch>
							<Route
								exact
								path='/'
								render={(props) => <Login {...props} auth={this.isAuthenticated} />}
							/>

							<PrivateRouteCreate
								exact
								path='/create'
								component={CreateAccount}
								token={this.state.token}
							/>
							<ErrorBoundary>
								<PrivateRoute
									exact
									path={'/todo'}
									component={ToDoContainer}
									isAuthenticated={this.state.token}
									users={this.state.users}
									todos={this.state.todos}
									toDoTitle={this.state.toDoTitle}
									deleteToDo={this.deleteToDo}
									createBtnState={this.state.createBtnState}
									toDoItems={this.state.toDoItems}
									getToDoWithId={this.getToDoWithId}
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
								<Cookie token={this.state.token} setCookie={this.setCookie} />
							</ErrorBoundary>
							<Redirect to={{ pathname: '/' }} />
						</Switch>
					</BrowserRouter>
				</header>
			</div>
		);
	}
}

export default App;
