import React, { Component } from 'react';
import CreateToDo from './CreateToDo';
import { NativeSelect } from '@material-ui/core';

class ToDoNavbar extends Component {
	state = { value: '', toDoId: '', title: '' };
	addUserIfAdmin = () => {
		return this.props.users.role === 'admin' ? (
			<span>
				<a className='addUserIcon' href='/create'>
					<i className='fas fa-user-plus userIcons' href='/create'></i>
				</a>{' '}
				<span id='add'>Add</span>
			</span>
		) : (
			<span></span>
		);
	};
	handleSelectedToDo = (e) => {
		let select = document.getElementById('select');
		var options = select.options;
		var id = options[options.selectedIndex].id;
		this.props.getToDoWithId(id, e.target.value);
		this.setState({
			value: e.target.value,
			toDoId: id,
		});
		return id;
	};

	deleteToDo = (id) => {
		const [lastTodo] = this.props.todos.slice(-1);
		const index = this.props.todos.findIndex((todo) => todo._id === lastTodo._id);
		console.log(index);
		try {
			if (this.props.todos.length >= 0 && this.props.createBtnState) {
				id
					? this.props.deleteToDo(id, lastTodo.title)
					: this.props.deleteToDo(this.props.todos[index]._id);
			} else {
				id
					? this.props.deleteToDo(id, lastTodo.title)
					: this.props.deleteToDo(this.props.todos[0]._id);
			}
			this.setState({
				toDoId: null,
			});
		} catch (error) {
			console.log('ERR');
		}
	};

	logout = () => {
		sessionStorage.removeItem('token');
		sessionStorage.removeItem('name');
		sessionStorage.removeItem('role');
	};

	render() {
		return (
			<div id='ItemHeader'>
				<i className='fas fa-user userIcons' id='user'>
					{' '}
				</i>
				<span id='userOnline'>
					{' '}
					Hi {this.props.users.name} ({this.props.users.role})
				</span>
				<CreateToDo createToDo={this.props.createToDo} />
				<div id='selectContainer'>
					<NativeSelect
						id='select'
						value={this.props.toDoTitle}
						onChange={this.handleSelectedToDo}
						selected='selected'
					>
						{this.props.todos < 0
							? null
							: this.props.todos.map((todo) => (
									<option className='listOption' key={todo._id} value={todo.title} id={todo._id}>
										{todo.title}
									</option>
							  ))}
					</NativeSelect>

					<i
						className='fas fa-trash-alt'
						id='btn-deleteToDo'
						type='button'
						onClick={() => this.deleteToDo(this.state.toDoId)}
						variant='contained'
						color='secondary'
						size='small'
					></i>
				</div>

				<div id='userGrid'>
					{this.addUserIfAdmin()}
					<a id='logoutBtn' href='/auth' onClick={this.logout}>
						<i className='fas fa-sign-out-alt'></i>
					</a>
					<span id='logout'>Logout</span>
				</div>
			</div>
		);
	}
}

export default ToDoNavbar;
