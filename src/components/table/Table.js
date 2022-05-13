import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { fetchAllBoard, deleteBoard, getAllProject, deleteProject } from 'Actions/ApiCall'
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ModalBoard from 'components/Common/ModalBoard';


const List = () => {
  const navigate = useNavigate();
  const [showBoardAdd, setShowBoardAdd] = useState(false)
  const toggleShowBoardAdd = () => {
    getAll()
    setShowBoardAdd(!showBoardAdd)
  }

  // const [allBoard, setallBoard] = useState([])
  const [allProject, setallProject] = useState([])



  const getAll = async () => {
    let res = await getAllProject()
    setallProject(res)
    console.log(12, res)
  }

  useEffect(() => {
    // getAllBoard()
    getAll()
  }, [])

  const handleDeleteProject = async (id) => {
    let check = window.confirm("You want to delete!")
    if (check) {
      await deleteProject(id)
      getAll()
    }
  }

  return (
    <TableContainer component={Paper} className="table">
      <div className="datatableTitle">
        <button className="link" onClick={toggleShowBoardAdd} >
          Add New
        </button>
        <ModalBoard openModal={showBoardAdd} toggleShowBoardAdd={toggleShowBoardAdd} getallBoard={getAll} />
      </div>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Name</TableCell>
            <TableCell className="tableCell">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allProject && allProject.length > 0 && allProject.map((row, index) => {
            let id = row._id;
            let linkadd = "/milestone/" + id
            return (
              <TableRow key={row._id}>
                <TableCell className="tableCell">{row.title}</TableCell>
                <TableCell className="tableCell">
                  <div className="cellAction">
                    <Link to={linkadd} style={{ textDecoration: "none" }}>
                      View
                    </Link>
                    <div
                      className="deleteButton"
                      onClick={() => handleDeleteProject(row._id)}
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

export default List;
