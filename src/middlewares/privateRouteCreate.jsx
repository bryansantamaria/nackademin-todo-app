import React from 'react';
import { Redirect, Route } from 'react-router-dom';

function PrivateRouteCreate({ component: Component, ...rest }) {
	const isAdmin = sessionStorage.getItem('role');
	return (
		<Route
			{...rest}
			render={(props) =>
				isAdmin === 'admin' ? (
					<Component exact path='/create' {...props} {...rest} />
				) : (
					<Redirect to='/' />
				)
			}
		/>
	);
}

export default PrivateRouteCreate;
