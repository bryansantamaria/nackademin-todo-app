import axios from "axios";

export const getTodos = async (url, token) => {
  console.log(token);
  const data = await axios
    .get(url, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      return res;
    });
  return data;
};

export const getUser = async (url, token) => {
  const data = await axios
    .get(url, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      return res;
    });
  return data;
};

export const postToDo = async (url, title, token) => {
  console.log(token);
  const data = await axios
    .post(
      url,
      {
        title,
        done: false,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    )
    .then((res) => {
      console.log(res);
      return res;
    });
  return data;
};

export const delToDo = async (url, token) => {
  const data = await axios
    .delete(url, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      return res;
    });
  return data;
};

export const patchToDo = async (url, title, token) => {
  const data = await axios
    .patch(
      url,
      {
        title,
        done: false,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    )
    .then((res) => {
      return res;
    });
  console.log(data);
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
          Authorization: "Bearer " + token,
        },
      }
    )
    .then((res) => {
      return res;
    });
  console.log(data);
  return data;
};

export const getOrderBy = async (url, token) => {
  const data = await await axios
    .get(url, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      return res;
    });
  return data;
};

export const postAccount = async (
  firstName,
  lastName,
  email,
  password,
  token
) => {
  const data = await axios
    .post(
      "http://localhost:8080/create",
      {
        firstName,
        lastName,
        email,
        password,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    )
    .then((res) => {
      console.log(res);
      return res;
    });
  return data;
};

export const postLogin = async (email, password) => {
  const data = await axios
    .post("http://localhost:8080/login", {
      email,
      password,
    })
    .then((res) => {
      return res;
    });
  return data;
};
