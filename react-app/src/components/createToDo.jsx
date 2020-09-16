import React, { Component } from 'react';
import { TextField, Button, Modal } from '@material-ui/core';

class CreateToDo extends Component {
	state = { title: '', open: false };

	submit = (title) => {
		this.props.createToDo(title);
		this.setState({ open: false, title: '' });
	};
	handleOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};
	onChange = (e) => {
		this.setState({
			title: e.target.value,
		});
	};
	render() {
		return (
			<span id='AddToDo'>
				<i className='fas fa-plus' id='AddToDoBtn' onClick={this.handleOpen}></i>

				<Modal
					className='modal'
					open={this.state.open}
					onClose={this.handleClose}
					closeAfterTransition
				>
					<div className='modalBox'>
						<h2 id='modalTitle'>Add list title</h2>
						<TextField
							type='input'
							autoFocus
							name='title'
							id='modalInput'
							variant='outlined'
							size='small'
							required
							value={this.state.title}
							onChange={this.onChange}
							placeholder='Add to do list title...'
						/>

						<Button
							type='submit'
							value='Submit'
							variant='contained'
							color='inherit'
							id='submitToDo'
							onClick={() => this.submit(this.state.title)}
						>
							Submit
						</Button>
					</div>
				</Modal>
			</span>
		);
	}
}

export default CreateToDo;
