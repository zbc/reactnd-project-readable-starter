import axios from 'axios';

export const FETCH_POSTS = 'FETCH_POSTS';
export const CREATE_POST = 'CREATE_POST';
export const DELETE_POST = 'DELETE_POST';
export const FETCH_POST = 'FETCH_POST';
export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const FETCH_CATEGORY_POSTS = 'FETCH_CATEGORY_POST';

const ROOT_URL = "http://localhost:3001";
const AUTH_HEADER = { 'Authorization': 'robo123' };

export function fetchPosts() {
    const request = axios({
        method: 'get',
        url: `${ROOT_URL}/posts`,
        headers: AUTH_HEADER
    });
    
    return {
        type: FETCH_POSTS,
        payload: request
    }
}

export function createPost(values, callback) {
    const config = Object.assign(AUTH_HEADER, values);
    console.log(config)    

    const request = axios({
        method: 'post',
        url: `${ROOT_URL}/posts`,
        headers: AUTH_HEADER,
        data: values
    })
    .then(() => callback());
   
    return {
        type: CREATE_POST,
        payload: request
    }
}

export function deletePost(id, callback) {
    axios({
        method: 'delete',
        url: `${ROOT_URL}/posts/${id}`,
        headers: AUTH_HEADER
    })
    .then(()=>callback());

    return {
        type: DELETE_POST,
        payload: id 
    }
}

export function fetchPost(id) {
    const request = axios({
        method: 'get',
        url: `${ROOT_URL}/posts/${id}`,
        headers: AUTH_HEADER
    });
    
    return {
        type: FETCH_POST,
        payload: request 
    }
}

export function fetchCategories() {
    const request = axios({
        method: 'get',
        url: `${ROOT_URL}/categories`,
        headers: AUTH_HEADER
    });
    
    return {
        type: FETCH_CATEGORIES,
        payload: request 
    }
}

export function fetchCategoryPosts(category) {
    const request = axios({
        method: 'get',
        url: `${ROOT_URL}/${category}/posts`,
        headers: AUTH_HEADER
    });
    
    return {
        type: FETCH_CATEGORY_POSTS,
        payload: request 
    } 
}