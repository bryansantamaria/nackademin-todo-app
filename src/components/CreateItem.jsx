import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';

class CreateItem extends Component {
	state = { title: '' };

	//Set the state to whatever the user writes in createItem from app.js
	onSubmit = (e) => {
		e.preventDefault();

		if (this.props.selectedItem === null) {
			this.props.createItem(this.state.title);
		} else {
			this.props.update(this.state.title);
		}

		this.setState({ title: '' });
	};

	submitBtn = () => {
		return this.props.editBtnState ? 'Update' : 'Submit';
	};

	inputField = () => {
		return this.props.editBtnState ? this.props.inputField : 'Add to do...';
	};

	//Target the name attribute title and set the state value
	onChange = (e) => {
		this.setState({
			title: e.target.value,
		});
	};

	render() {
		return (
			<form onSubmit={this.onSubmit} className='form_container'>
				<TextField
					type='input'
					autoFocus
					name='title'
					id='standard-basic'
					variant='outlined'
					size='small'
					required
					value={this.state.title}
					onChange={this.onChange}
					placeholder={this.inputField()}
				/>

				<Button
					className='btn-Itemitem submitBtn'
					type='submit'
					value={this.submitBtn()}
					variant='contained'
					color='inherit'
					id='submitBtn'
					onClick={() => this.props.handleBtnState(false)}
				>
					{this.submitBtn()}
				</Button>
			</form>
		);
	}
}

export default CreateItem;
