
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllUser } from '../services/UserService';
import ReactPaginate from 'react-paginate';
import ModalAddNew from './ModalAddNew.js';
import ModalEditUser from './ModalEditUser.js';
import _ from 'lodash';
import { debounce } from 'lodash';
import ModalConfirm from './ModalConfirm.js';
import './TableUser.scss';
import { CSVLink } from "react-csv";
import Papa from 'papaparse';
import { toast } from 'react-toastify';

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

    const [dataExport, setDataExport] = useState([]);

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
    const handleSearch = debounce((event) => {
        let term = event.target.value;
        console.log("run search term", term);
        if (term) {

            let cloneListUser = _.cloneDeep(listUsers);
            cloneListUser = cloneListUser.filter(item => item.email.includes(term));
            setListUser(cloneListUser);
        } else {
            getUser();
        }

    }, 300)


    const getUsersExport = (event, done) => {
        let result = []

        if (listUsers && listUsers.length > 0) {
            result.push(["Id", "Email", "First name", "Last name"]);
            listUsers.map((item, index) => {
                let arr = [];
                arr[0] = item.id;
                arr[1] = item.email;
                arr[2] = item.first_name
                arr[3] = item.last_name
                result.push(arr);
            })
            setDataExport(result);
            done();

        }
    }

    const handleImportCSV = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            let file = event.target.files[0];
            if (file.type !== "text/csv") {
                toast.error("Only accept CSV file");
                return;
            }
            Papa.parse(file, {
                complete: function (results) {
                    let rawCSV = results.data;
                    if (rawCSV.length > 0) {
                        if (rawCSV[0] && rawCSV[0].length === 3) {
                            if (rawCSV[0][0] !== "email" || rawCSV[0][1] !== "first_name" || rawCSV[0][2] !== "last_name") {
                                toast.error("Wrong format header CSV file");
                            } else {
                                let result = [];

                                rawCSV.map((item, index) => {
                                    if (index > 0 && item.length === 3) {
                                        let obj = {};
                                        obj.email = item[0];
                                        obj.first_name = item[1];
                                        obj.last_name = item[2];
                                        result.push(obj);
                                    }
                                })
                                setListUser(result);
                            }
                        } else {
                            toast.error("Wrong format CSV file");

                        }
                    } else {
                        toast.error("Not found data CSV file");

                    }
                }
            });
        }



    }
    return (
        <>
            <div className='my-3 add-new d-sm-flex'>
                <span>List users</span>
                <div className='group-btns mt-2 mt-sm-0'>
                    <label htmlFor='test' className="btn btn-warning"><i className="fa-solid fa-file-import"></i> Import</label>
                    <input type='file' id='test' hidden onChange={(event) => handleImportCSV(event)} />
                    <CSVLink data={dataExport} asyncOnClick={true} onClick={getUsersExport} filename={"users.csv"} className="btn btn-primary" ><i className="fa-solid fa-file-arrow-down"></i> Export me</CSVLink>
                    <button className='btn btn-success' onClick={() => setIsShowModalAddNew(true)}><i className="fa-solid fa-circle-plus"></i> Add new</button>
                </div>

            </div >
            <div className='col-12 col-sm-4 my-3'> <input className='form-control' placeholder='Search user by email' onChange={(event) => handleSearch(event)} /></div>
            <div className='customize-table'>
                <Table striped bordered hover>

                    <thead>
                        <tr>
                            <th>
                                <div className='sort-header'>
                                    <span>ID</span>
                                    <span>
                                        <i className="fa-solid fa-arrow-down-long" onClick={() => handleSort("desc", "id")}></i>
                                        <i className="fa-solid fa-arrow-up-long" onClick={() => handleSort("asc", "id")}></i>
                                    </span>
                                </div>
                            </th>
                            <th>Email</th>
                            <th>
                                <div className='sort-header'>
                                    <span>First Name</span>
                                    <span>
                                        <i className="fa-solid fa-arrow-down-long" onClick={() => handleSort("desc", "first_name")}></i>
                                        <i className="fa-solid fa-arrow-up-long" onClick={() => handleSort("asc", "first_name")}></i>
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
            </div>

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