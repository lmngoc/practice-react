import axios from './customize- axios';

const fetchAllUser = () => {
    //return 1 promise, use for asyn await
    return axios.get("/api/users?page=1");
}
export { fetchAllUser };