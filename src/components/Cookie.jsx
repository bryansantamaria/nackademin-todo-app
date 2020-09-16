import React, { Component } from 'react';
import { Modal } from '@material-ui/core';
import axios from 'axios';
class Cookie extends Component {
	state = { open: false, userData: [], userRemoved: false };

	async componentDidMount() {
		await axios
			.get(`http://localhost:8080/users/getData`, {
				headers: {
					Authorization: 'Bearer ' + this.props.token,
				},
			})
			.then((res) => {
				this.setState({ userData: res.data });
			});

		if (sessionStorage.getItem('name')) {
			document.getElementById('cookieContainer').style.display = 'none';
		}
	}

	submitCookie = () => {
		document.getElementById('cookieContainer').style.display = 'none';
		this.props.setCookie(this.state.userData.user);
		this.setState({ open: false });
	};

	getUserData = () => {
		console.log(this.state.userData);
	};

	userForgotten = async () => {
		const doubleCheck = window.confirm(
			`You are about to be forgotten. All your data will be erased, are you sure about this?`
		);
		if (doubleCheck === true) {
			sessionStorage.removeItem('token');
			sessionStorage.removeItem('name');
			sessionStorage.removeItem('role');
			await axios
				.get(`http://localhost:8080/users/delete`, {
					headers: {
						Authorization: 'Bearer ' + this.props.token,
					},
				})
				.then((res) => {
					this.setState({ open: false, userRemoved: true });
				});
		} else {
			this.setState({ open: false });
		}
	};

	handleClose = () => {
		this.setState({ open: false });
	};
	handleOpen = () => {
		this.setState({ open: true });
	};

	render() {
		return (
			<div id='cookieContainer'>
				{' '}
				<div>
					<p> We use cookies to make the website work and personalize your content.</p>
					<button className='acceptCookies' type='button' onClick={this.submitCookie}>
						Accept
					</button>
					<button id='manageCookies' type='button' onClick={this.handleOpen}>
						Manage Details
					</button>
				</div>
				<Modal
					className='modal'
					open={this.state.open}
					onClose={this.handleClose}
					closeAfterTransition
				>
					<div className='cookieModal'>
						<h1 id='cookieTitle'>Your Privacy</h1>
						<p id='modalText'>
							{' '}
							When you visit any website, it may store or retrieve information on your browser,
							mostly in the form of cookies. This information might be about you, your preferences
							or your device, and is mostly used to make the site work as you expect it to. The
							information doesn't usually directly identify you, but it can give you a more
							personalized experience. Because we respect your right to privacy, you can choose not
							to allow cookies. You may also choose to get the all the information we have stored
							about you. If this is your choice, click on "HELL NO, give me my data!"
						</p>{' '}
						<br />
						<button className='acceptCookies' type='button' onClick={this.submitCookie}>
							Accept
						</button>
						<div id='cookieModalBottom'>
							<button id='userDataBtn' type='button' onClick={this.getUserData}>
								Give me my data
							</button>
							<button id='removeUserBtn' type='button' onClick={this.userForgotten}>
								Remove my data
							</button>
						</div>
					</div>
				</Modal>
			</div>
		);
	}
}

export default Cookie;
