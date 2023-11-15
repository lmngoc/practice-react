import axios from './customize- axios';

const fetchAllUser = (page) => {
    //return 1 promise, use for asyn await
    return axios.get(`/api/users?page=${page}`);
}
const postCreateUser = (name, job) => {
    return axios.post('api/users', { name, job })
}
export { fetchAllUser, postCreateUser };