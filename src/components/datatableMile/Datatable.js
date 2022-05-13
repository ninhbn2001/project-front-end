import "./datatable.scss";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { fetchAllUser } from 'Actions/ApiCall'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";


const Datatable = () => {
  const [allUser, setallUser] = useState([])


  // const handleView =  (event) => {
  //   event.preventDefault();
  //   const id = event.target.value
  //   navigate(`//${id}`, { replace: false, state: { id: id }});
  //   console.log(19999, id)
  // }


  const getAllUser = async () => {
    let res = await fetchAllUser()
    setallUser(res)
    console.log(12, res)
  }

  useEffect(() => {
    getAllUser()
  }, [])


  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <div className="datatableTitle">
            <Link to="/users/new" className="link">
              Add New
            </Link>
          </div>
          <TableRow>
            {/* <TableCell className="tableCell">Tracking ID</TableCell> */}
            <TableCell className="tableCell">Name</TableCell>
            <TableCell className="tableCell">Action</TableCell>
            {/* <TableCell className="tableCell">Customer</TableCell>
          <TableCell className="tableCell">Date</TableCell>
          <TableCell className="tableCell">Amount</TableCell>
          <TableCell className="tableCell">Payment Method</TableCell>
          <TableCell className="tableCell">Status</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {allUser && allUser.length > 0 && allUser.map((row, index) => {
            let id = row._id;
            let linkadd = `/boardcontent/${id}`
            console.log("check item: ", row)
            return (
              <TableRow key={row._id}>
                {/* <TableCell className="tableCell">{row.id}</TableCell>
            <TableCell className="tableCell">
              <div className="cellWrapper">
                <img src={row.img} alt="" className="image" />

              </div>
            </TableCell> */}
                <TableCell className="tableCell">{ }</TableCell>
                {/* <TableCell className="tableCell">{row.date}</TableCell>
            <TableCell className="tableCell">{row.amount}</TableCell>
            <TableCell className="tableCell">{row.method}</TableCell> */}
                {/* <TableCell className="tableCell">
              <span className={`status ${row.status}`}>{row.status}</span>
            </TableCell> */}
                <TableCell className="tableCell">
                  <div className="cellAction">
                    <Link to="/accounts/test" style={{ textDecoration: "none" }}>
                      <div className="viewButton">View</div>
                    </Link>
                    <div
                      className="deleteButton"
                    >
                      Delete
                    </div>
                  </div>
                </TableCell>

              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Datatable;
