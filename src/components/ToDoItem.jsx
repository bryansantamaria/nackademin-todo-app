import React, { Component } from 'react';
import { Button, Checkbox, TableCell, TableRow } from '@material-ui/core';

class ToDoItem extends Component {
	state = {};

	getLineThrough = () => {
		const { done } = this.props.Item;
		return {
			textDecoration: done ? 'line-through' : 'none',
		};
	};

	render() {
		const { title, created, lastUpdated, _id } = this.props.Item;

		return (
			<TableRow key={_id} hover>
				<TableCell component='th' scope='row' style={this.getLineThrough()}>
					<Checkbox
						edge='start'
						type='checkbox'
						onChange={() => this.props.complete(_id)}
						className='checkboxes'
						checked={this.props.Item.done}
						tabIndex={-1}
						color='primary'
					/>
					{title}
				</TableCell>
				<TableCell style={this.getLineThrough()} align='right'>
					{created}
				</TableCell>
				<TableCell style={this.getLineThrough()} align='right'>
					{lastUpdated}
				</TableCell>
				<TableCell align='right'>
					<Button
						className='btn-Itemitem'
						type='button'
						onClick={() => this.props.delete(_id)}
						variant='contained'
						color='secondary'
						size='small'
					>
						<i className='fas fa-trash-alt'></i>
					</Button>
					<Button
						className='btn-Itemitem'
						type='button'
						onClick={() => this.props.selectItem(_id)}
						variant='contained'
						color='primary'
						size='small'
					>
						<i className='fas fa-edit'></i>
					</Button>
				</TableCell>
			</TableRow>
		);
	}
}

export default ToDoItem;
