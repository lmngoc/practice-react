
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllUser } from '../services/UserService';
import ReactPaginate from 'react-paginate';
import ModalAddNew from './ModalAddNew.js';
import ModalEditUser from './ModalEditUser.js';
import _ from 'lodash';
import ModalConfirm from './ModalConfirm.js';
import './TableUser.scss';
const TableUsers = (props) => {
    const [listUsers, setListUser] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
    const [isShowModalEdit, setIsShowModalEdit] = useState(false);
    const [isShowModalDelete, setIsShowModalDelete] = useState(false);

    const [dataUserEdit, setDataUserEdit] = useState({});
    const [dataUserDelete, setDataUserDelete] = useState({});

    const [sortBy, setSortBy] = useState("asc");
    const [sortField, setSortField] = useState("id");
    const handleClose = () => {
        setIsShowModalAddNew(false);
        setIsShowModalEdit(false);
        setIsShowModalDelete(false);
    }

    const handleEditUserFromModal = (user) => {
        //console.log("check user:", user);
        let cloneListUser = _.cloneDeep(listUsers);
        let index = listUsers.findIndex(item => item.id === user.id);
        cloneListUser[index].first_name = user.first_name;
        setListUser(cloneListUser);
    }

    const handleDeleteUserFromModal = (user) => {
        //console.log("check user:", user);
        let cloneListUser = _.cloneDeep(listUsers);
        cloneListUser = cloneListUser.filter(item => item.id !== user.id);
        setListUser(cloneListUser);
    }

    useEffect(() => {
        //call api
        getUser(1);
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
    const handleUpdateTable = (user) => {
        setListUser([user, ...listUsers]);
    }

    const handleEditUser = (user) => {
        setDataUserEdit(user);
        setIsShowModalEdit(true);
    }

    const handleDeleteUser = (user) => {
        setIsShowModalDelete(true);
        setDataUserDelete(user);
    }

    const handleSort = (sortBy, sortField) => {
        setSortBy(sortBy);
        setSortField(sortField);
        let cloneListUser = _.cloneDeep(listUsers);
        cloneListUser = _.orderBy(cloneListUser, [sortField], [sortBy]);
        setListUser(cloneListUser);
    }

    console.log(sortBy, sortField);
    return (
        <>
            <div className='my-3 add-new'>
                <span>List users</span>
                <button className='btn btn-success' onClick={() => setIsShowModalAddNew(true)}>Add new user</button>
            </div>
            <Table striped bordered hover>

                <thead>
                    <tr>
                        <th>
                            <div className='sort-header'>
                                <span>ID</span>
                                <span>
                                    <i class="fa-solid fa-arrow-down-long" onClick={() => handleSort("desc", "id")}></i>
                                    <i class="fa-solid fa-arrow-up-long" onClick={() => handleSort("asc", "id")}></i>
                                </span>
                            </div>
                        </th>
                        <th>Email</th>
                        <th>
                            <div className='sort-header'>
                                <span>First Name</span>
                                <span>
                                    <i class="fa-solid fa-arrow-down-long" onClick={() => handleSort("desc", "first_name")}></i>
                                    <i class="fa-solid fa-arrow-up-long" onClick={() => handleSort("asc", "first_name")}></i>
                                </span>
                            </div>
                        </th>
                        <th>Last Name</th>
                        <th>Action</th>
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
                                <td>
                                    <button className='btn btn-warning mx-3' onClick={() => handleEditUser(item)}>Edit</button>
                                    <button className='btn btn-danger' onClick={() => handleDeleteUser(item)}>Delete</button>
                                </td>
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
            <ModalAddNew show={isShowModalAddNew} handleClose={handleClose} handleUpdateTable={handleUpdateTable} />
            <ModalEditUser show={isShowModalEdit} handleClose={handleClose} dataUserEdit={dataUserEdit} handleEditUserFromModal={handleEditUserFromModal} />
            <ModalConfirm show={isShowModalDelete} handleClose={handleClose} dataUserDelete={dataUserDelete} handleDeleteUserFromModal={handleDeleteUserFromModal} />
        </>
    )
}
export default TableUsers;