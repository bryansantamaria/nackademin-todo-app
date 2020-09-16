import React, { Component } from 'react';
import ToDoNavbar from './ToDoNavbar';
import ToDoItem from './ToDoItem';
import CreateItem from './CreateItem';
import ErrorBoundary from '../middlewares/ErrorBoundary';
import PropTypes from 'prop-types';

import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from '@material-ui/core';

class ToDoContainer extends Component {
	state = { testState: [] };

	toggleCreatedArrow = () => {
		return this.props.toggleCreateOrder ? (
			<span className='arrow'>&uarr;</span>
		) : (
			<span className='arrow'>&darr;</span>
		);
	};
	toggleUpdatedArrow = () => {
		return this.props.toggleUpdatedOrder ? (
			<span className='arrow'>&uarr;</span>
		) : (
			<span className='arrow'>&darr;</span>
		);
	};

	render() {
		return (
			<ErrorBoundary>
				<div className='ItemContainer'>
					<ToDoNavbar
						users={this.props.users}
						getToDoWithId={this.props.getToDoWithId}
						createToDo={this.props.createToDo}
						deleteToDo={this.props.deleteToDo}
						todos={this.props.todos}
						toDoTitle={this.props.toDoTitle}
						createBtnState={this.props.createBtnState}
					/>
					<Paper id='container'>
						<TableContainer component={Paper} style={{ maxHeight: '70vh' }}>
							<Table stickyHeader aria-label='sticky table'>
								<TableHead>
									<TableRow>
										<TableCell>
											<h3>Title</h3>
										</TableCell>
										<TableCell align='right'>
											<span className='orderBy' onClick={() => this.props.orderByCreated()}>
												<h3>Created {this.toggleCreatedArrow()}</h3>
											</span>
										</TableCell>
										<TableCell align='right'>
											<span className='orderBy' onClick={() => this.props.orderByUpdated()}>
												<h3>Last Updated {this.toggleUpdatedArrow()}</h3>
											</span>
										</TableCell>
										<TableCell align='right'></TableCell>
									</TableRow>
								</TableHead>
								{this.props.toDoItems.length >= 0 ? (
									<TableBody>
										{this.props.toDoItems.map((Item) => (
											<ToDoItem
												key={Item._id}
												Item={Item}
												complete={this.props.complete}
												delete={this.props.delete}
												selectItem={this.props.selectItem}
											/>
										))}
									</TableBody>
								) : null}
							</Table>
							<div className='bottomNavigator'>
								<span className='paginationSpan'>
									{this.props.toDoItems.length > 0 ? this.props.toDoItems.length : '0'} items
								</span>
								<button type='button' className='paginationBtn' onClick={this.props.paginateFwrd}>
									&rarr;
								</button>
								<button type='button' className='paginationBtn' onClick={this.props.paginateBckwrd}>
									&larr;
								</button>
							</div>
						</TableContainer>
						<CreateItem
							createItem={this.props.createItem}
							update={this.props.update}
							selectedItem={this.props.selectedItem}
							inputField={this.props.inputField}
							editBtnState={this.props.editBtnState}
							handleBtnState={this.props.handleBtnState}
						/>
					</Paper>
				</div>
			</ErrorBoundary>
		);
	}
}

ToDoContainer.propTypes = {
	todos: PropTypes.array,
	toDoItems: PropTypes.array,
};

export default ToDoContainer;
