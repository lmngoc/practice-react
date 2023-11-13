
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllUser } from '../services/UserService';
const TableUsers = (props) => {
    const [listUsers, setListUser] = useState([]);
    useEffect(() => {
        //call api
        getUser();
    }, []);
    const getUser = async () => {
        let res = await fetchAllUser();
        if (res && res.data && res.data.data) {
            setListUser(res.data.data);
        }

    };

    console.log("check list user", listUsers);
    return (
        <Table striped bordered hover>

            <thead>
                <tr>
                    <th>ID</th>
                    <th>Email</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                </tr>
            </thead>
            <tbody>
                {listUsers && listUsers.length && listUsers.map((item, index) => {
                    return (
                        <tr key={`index-${index}`}>
                            <td>{item.id}</td>
                            <td>{item.email}</td>
                            <td>{item.first_name}</td>
                            <td>{item.last_name}</td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>)
}
export default TableUsers;