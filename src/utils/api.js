import axios from 'axios';

export const getUser = async (url, token) => {
	const data = await axios
		.get(url, {
			headers: {
				Authorization: 'Bearer ' + token,
			},
		})
		.then((res) => {
			return res;
		});
	return data;
};

export const getToDo = async (url, token) => {
	const data = await axios
		.get(url, {
			headers: {
				Authorization: 'Bearer ' + token,
			},
		})
		.then((res) => {
			return res;
		});
	return data;
};
export const postToDo = async (url, title, token) => {
	const data = await axios
		.post(
			url,
			{
				title,
			},
			{
				headers: {
					Authorization: 'Bearer ' + token,
				},
			}
		)
		.then((res) => {
			return res;
		});
	return data;
};

export const getToDoWithItems = async (url, token) => {
	const data = await axios
		.get(url, {
			headers: {
				Authorization: 'Bearer ' + token,
			},
		})
		.then((res) => {
			return res;
		});
	return data;
};

export const delToDo = async (url, token) => {
	const data = await axios
		.delete(url, {
			headers: {
				Authorization: 'Bearer ' + token,
			},
		})
		.then((res) => {
			return res;
		});
	return data;
};

export const postItem = async (url, title, toDoId, token) => {
	const data = await axios
		.post(
			url,
			{
				title,
				done: false,
				toDoId,
			},
			{
				headers: {
					Authorization: 'Bearer ' + token,
				},
			}
		)
		.then((res) => {
			return res;
		});
	return data;
};

export const getItems = async (url, token) => {
	const data = await axios
		.get(url, {
			headers: {
				Authorization: 'Bearer ' + token,
			},
		})
		.then((res) => {
			return res;
		});
	return data;
};

export const delItem = async (url, token) => {
	const data = await axios
		.delete(url, {
			headers: {
				Authorization: 'Bearer ' + token,
			},
		})
		.then((res) => {
			return res;
		});
	return data;
};

export const patchItem = async (url, title, token) => {
	const data = await axios
		.patch(
			url,
			{
				title,
				done: false,
			},
			{
				headers: {
					Authorization: 'Bearer ' + token,
				},
			}
		)
		.then((res) => {
			return res;
		});
	return data;
};

export const updateCompleted = async (url, title, done, token) => {
	const data = await axios
		.patch(
			url,
			{
				title,
				done,
			},
			{
				headers: {
					Authorization: 'Bearer ' + token,
				},
			}
		)
		.then((res) => {
			return res;
		});
	return data;
};

export const getOrderBy = async (url, token) => {
	const data = await await axios
		.get(url, {
			headers: {
				Authorization: 'Bearer ' + token,
			},
		})
		.then((res) => {
			return res;
		});
	return data;
};

export const postAccount = async (firstName, lastName, email, password, token) => {
	const data = await axios
		.post(
			'/users/create',
			{
				firstName,
				lastName,
				email,
				password,
			},
			{
				headers: {
					Authorization: 'Bearer ' + token,
				},
			}
		)
		.then((res) => {
			return res;
		});
	return data;
};

export const postLogin = async (email, password) => {
	const data = await axios
		.post('/users/auth', {
			email,
			password,
		})
		.then((res) => {
			return res;
		});
	return data;
};
