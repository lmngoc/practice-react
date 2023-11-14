import axios from './customize- axios';

const fetchAllUser = (page) => {
    //return 1 promise, use for asyn await
    return axios.get(`/api/users?page=${page}`);
}
export { fetchAllUser };