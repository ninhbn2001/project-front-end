import "./datatable.scss";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { fetchAllUser, deleteUser } from 'Actions/ApiCall'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ReactPaginate from "react-paginate";

const Datatable = () => {
  const [allUser, setallUser] = useState([])
  const [newUsers, setNewUsers] = useState([])
  const [pageCount, setPageCount] = useState()

  const getAllUser = async () => {
    let res = await fetchAllUser()
    setallUser(res)
    let pageCount = Math.ceil(res.length / 5);
    setPageCount(pageCount)
    getCurrentUserPage(1)
  }

  const getCurrentUserPage = (currentPage) => {
    let newUsers = [];
    for (let i = currentPage * 5 - 5; i < currentPage * 5; i++) {
      if (i >= allUser.length) {
        break;
      } else {
        let obj = allUser[i];
        newUsers.push(obj);
      }
    }
    setNewUsers(newUsers)
  };

  const handleClickPage = (data) => {
    let currentPage = data.selected + 1;
    getCurrentUserPage(currentPage);
  };

  const HandledeleteUser = async (id) => {
    let check = window.confirm("You want to delete!")
    if (check) {
      await deleteUser(id)
      console.log("OK")
      getAllUser()
    }
  }

  useEffect(() => {
    getAllUser()
  }, [])

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <div className="datatableTitle">
            <Link to="/new" className="link">
              Add New
            </Link>
          </div>
          <TableRow>
            <TableCell className="tableCell">Name</TableCell>
            <TableCell className="tableCell">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {newUsers && newUsers.length > 0 && newUsers.map((row, index) => {
            let id = row._id;
            let linkadd = `/boardcontent/${id}`
            let linkviewUser = `/accounts/${id}`
            return (
              <TableRow key={row._id}>
                <TableCell className="tableCell">{row.email}</TableCell>
                <TableCell className="tableCell">
                  <div className="cellAction">
                    <Link to={linkviewUser} style={{ textDecoration: "none" }}>
                      <div className="viewButton">View</div>
                    </Link>
                    <div
                      className="deleteButton"
                    >
                      <button onClick={() => HandledeleteUser(row._id)}>Delete</button>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      <ReactPaginate
        previousLabel="Previous"
        nextLabel="Next"
        breakLabel="..."
        pageCount={pageCount}
        marginPagesDisplayed={3}
        onPageChange={handleClickPage}
        containerClassName="pagination justify-content-center"
        pageClassName="page-item"
        previousClassName="page-item"
        nextClassName="page-item"
        pageLinkClassName="page-link"
        previousLinkClassName="page-link"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        activeClassName="active"
      />
    </TableContainer>

  );
};

export default Datatable;
