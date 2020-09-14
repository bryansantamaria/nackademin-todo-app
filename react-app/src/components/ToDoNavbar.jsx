import React, { Component } from 'react';
import CreateToDo from './CreateTodo';
import { NativeSelect, Button } from '@material-ui/core';

class ToDoNavbar extends Component {
	state = { value: '', toDoId: '' };
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
		this.props.getToDoWithId(id);
		this.setState({
			value: e.target.value,
			toDoId: id,
		});
		return id;
	};

	deleteToDo = (id) => {
		try {
			console.log('WHYYY BRUH');
			console.log(this.props.todos);

			if (this.props.todos !== undefined) {
				console.log('WHY WOULD U ENTER?');
				id ? this.props.deleteToDo(id) : this.props.deleteToDo(this.props.todos[0]._id);
			}
		} catch (error) {
			console.log('ERR');
		}
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
					<label htmlFor='select' id='selectLabel'>
						Select Todo-list
						<NativeSelect
							id='select'
							value={this.state.title}
							onChange={this.handleSelectedToDo}
							selected='selected'
						>
							{' '}
							{this.props.todos.map((todo) => (
								<option key={todo._id} value={todo.title} id={todo._id}>
									{todo.title}
								</option>
							))}
						</NativeSelect>
					</label>
				</div>
				<Button
					id='btn-deleteToDo'
					type='button'
					onClick={() => this.deleteToDo(this.state.toDoId)}
					variant='contained'
					color='secondary'
					size='small'
				>
					<i className='fas fa-trash-alt'></i>
				</Button>
				<div id='userGrid'>
					{this.addUserIfAdmin()}
					<a id='logoutBtn' href='/auth'>
						<i className='fas fa-sign-out-alt'></i>
					</a>
					<span id='logout'>Logout</span>
				</div>
			</div>
		);
	}
}

export default ToDoNavbar;
