import axios from "axios";

export const FETCH_POSTS = "FETCH_POSTS";
export const CREATE_POST = "CREATE_POST";
export const CREATE_COMMENT = "CREATE_COMMENT";
export const DELETE_POST = "DELETE_POST";
export const EDIT_POST = "EDIT_POST";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const FETCH_POST = "FETCH_POST";
export const FETCH_CATEGORIES = "FETCH_CATEGORIES";
export const FETCH_CATEGORY_POSTS = "FETCH_CATEGORY_POST";
export const FETCH_COMMENTS = "FETCH_COMMENTS";
export const UP_VOTE = "UP_VOTE";
export const DOWN_VOTE = "DOWN_VOTE";
export const UP_VOTE_COMMENT = "UP_VOTE_COMMENT";
export const DOWN_VOTE_COMMENT = "DOWN_VOTE_COMMENT";

const ROOT_URL = "http://localhost:3001";
const AUTH_HEADER = { Authorization: "robo123" };

export function fetchPosts() {
  const request = axios({
    method: "get",
    url: `${ROOT_URL}/posts`,
    headers: AUTH_HEADER
  });

  return {
    type: FETCH_POSTS,
    payload: request
  };
}

export function fetchComments(id) {
  return dispatch => {
    axios({
      method: "get",
      url: `${ROOT_URL}/posts/${id}/comments`,
      headers: AUTH_HEADER
    }).then(request => {
      dispatch({
        type: FETCH_COMMENTS,
        payload: request
      });
    });
  };
  // const request = axios({
  //   method: "get",
  //   url: `${ROOT_URL}/posts/${id}/comments`,
  //   headers: AUTH_HEADER
  // });

  // return {
  //   type: FETCH_COMMENTS,
  //   payload: request
  // };
}

export function createPost(values, callback) {
  const request = axios({
    method: "post",
    url: `${ROOT_URL}/posts`,
    headers: AUTH_HEADER,
    data: values
  }).then(() => callback());

  return {
    type: CREATE_POST,
    payload: request
  };
}

export function editPost(id, values, callback) {
  const request = axios({
    method: "put",
    url: `${ROOT_URL}/posts/${id}`,
    headers: AUTH_HEADER,
    data: values
  }).then(() => callback());

  return {
    type: EDIT_POST,
    payload: request
  };
}

export function editComment(id, values, callback) {
  const request = axios({
    method: "put",
    url: `${ROOT_URL}/comments/${id}`,
    headers: AUTH_HEADER,
    data: values
  }).then(() => callback());

  return {
    type: EDIT_COMMENT,
    payload: request
  };
}

export function upVote(id, callback) {
  const request = axios({
    method: "post",
    url: `${ROOT_URL}/posts/${id}`,
    headers: AUTH_HEADER,
    data: {
      option: "upVote"
    }
  }).then(() => callback());

  return {
    type: UP_VOTE,
    payload: request
  };
}

export function downVote(id, callback) {
  const request = axios({
    method: "post",
    url: `${ROOT_URL}/posts/${id}`,
    headers: AUTH_HEADER,
    data: {
      option: "downVote"
    }
  }).then(() => callback());

  return {
    type: DOWN_VOTE,
    payload: request
  };
}
export function upVoteComment(id, callback) {
  const request = axios({
    method: "post",
    url: `${ROOT_URL}/comments/${id}`,
    headers: AUTH_HEADER,
    data: {
      option: "upVote"
    }
  }).then(() => callback());

  return {
    type: UP_VOTE_COMMENT,
    payload: request
  };
}

export function downVoteComment(id, callback) {
  const request = axios({
    method: "post",
    url: `${ROOT_URL}/comments/${id}`,
    headers: AUTH_HEADER,
    data: {
      option: "downVote"
    }
  }).then(() => callback());

  return {
    type: DOWN_VOTE_COMMENT,
    payload: request
  };
}

export function createComment(values, callback) {
  const request = axios({
    method: "post",
    url: `${ROOT_URL}/comments`,
    headers: AUTH_HEADER,
    data: values
  }).then(() => {
    callback();
    console.log("success");
  });
  console.log(request);
  return {
    type: CREATE_COMMENT,
    payload: request
  };
}

export function deletePost(id, callback) {
  axios({
    method: "delete",
    url: `${ROOT_URL}/posts/${id}`,
    headers: AUTH_HEADER
  }).then(() => callback());

  return {
    type: DELETE_POST,
    payload: id
  };
}

export function deleteComment(id, callback) {
  axios({
    method: "delete",
    url: `${ROOT_URL}/comments/${id}`,
    headers: AUTH_HEADER
  }).then(() => callback());

  return {
    type: DELETE_COMMENT,
    payload: id
  };
}

export function fetchPost(id) {
  const request = axios({
    method: "get",
    url: `${ROOT_URL}/posts/${id}`,
    headers: AUTH_HEADER
  });

  return {
    type: FETCH_POST,
    payload: request
  };
}

export function fetchCategories() {
  const request = axios({
    method: "get",
    url: `${ROOT_URL}/categories`,
    headers: AUTH_HEADER
  });

  return {
    type: FETCH_CATEGORIES,
    payload: request
  };
}

export function fetchCategoryPosts(category) {
  const request = axios({
    method: "get",
    url: `${ROOT_URL}/${category}/posts`,
    headers: AUTH_HEADER
  });

  return {
    type: FETCH_CATEGORY_POSTS,
    payload: request
  };
}
