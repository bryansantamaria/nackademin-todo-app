import React from 'react';
import { Redirect, Route } from 'react-router-dom';

function PrivateRouteCreate({ component: Component, ...rest }) {
	const isAdmin = localStorage.getItem('role');
	return (
		<Route
			{...rest}
			render={(props) =>
				isAdmin === 'admin' ? (
					<Component exact path='/items' {...props} {...rest} />
				) : (
					<Redirect to='/login' />
				)
			}
		/>
	);
}

export default PrivateRouteCreate;
