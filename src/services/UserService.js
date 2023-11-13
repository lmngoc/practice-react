import axios from 'axios';

const fetchAllUser = () => {
    //return 1 promise, use for asyn await
    return axios.get("https://reqres.in/api/users?page=1");
}
export { fetchAllUser };