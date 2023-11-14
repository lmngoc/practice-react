
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllUser } from '../services/UserService';
import ReactPaginate from 'react-paginate';
const TableUsers = (props) => {
    const [listUsers, setListUser] = useState([]);
    const [totalPages, setTotalPages] = useState([]);
    useEffect(() => {
        //call api
        getUser(2);
    }, []);
    const getUser = async (page) => {
        let res = await fetchAllUser(page);
        //console.log("check res:", res);
        if (res && res.data) {
            setListUser(res.data);
            setTotalPages(res.total_pages);
        }

    };
    const handlePageClick = (event) => {
        getUser(+event.selected + 1);
    }

    return (
        <>
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
            </Table>
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={totalPages}
                previousLabel="< previous"
                renderOnZeroPageCount={null}

                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
            />
        </>
    )
}
export default TableUsers;