import React, { useState, useEffect, useRef } from 'react';
import './BoardMilestone.scss';
import { useParams, useNavigate } from "react-router-dom";
import { createNewBoard, getBoardByProject, updateBoard,  deleteBoard } from 'Actions/ApiCall'
import { Link } from "react-router-dom";
import moment from "moment";
import { Table } from 'react-bootstrap';

function BoardMilestone() {
  const navigate = useNavigate();
  const [allMileStone, setMileStone] = useState([])
  const [BoardId, setBoardId] = useState()
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [title, setTitle] = useState()
  const [status, setStatus] = useState(true)

  const { id } = useParams()

  useEffect(() => {
    const projectId = id
    handleGetBoardByProject(projectId)
  }, [])
  const handleGetBoardByProject = async (id) => {
    let res = await getBoardByProject(id);
    console.log("check res: ", res)
    setMileStone(res)
  }
  const onChangeInput = (e, id) => {
    let result = e.target.value
    if (id == "startDate") {
      setStartDate(result)
      console.log(startDate)
    }
    if (id == "endDate") {
      setEndDate(result)
      console.log(endDate)
    }

    if (id == "title") {
      setTitle(result)

    }

  }


  const onCreateNew = async () => {
    if (status) {
      let res = await createNewBoard({
        projectId: id,
        title: title,
        startDate: new Date(startDate).getTime(),
        endDate: new Date(endDate).getTime(),
      })
      getBoardByProject(id)
    }
    else {
      let res = await updateBoard(BoardId, {
        startDate: new Date(startDate).getTime(),
        endDate: new Date(endDate).getTime(),
        title: title
      })
      getBoardByProject(id)
    }
  }


  const handleEditMileStone = (item) => {
    console.log("check item : ", item)
    setBoardId(item._id)
    setStartDate(item.startDate);
    setEndDate(item.endDate);
    setTitle(item.title);
    setStatus(!status)
  }

  const handleDelete = async (id) => {
    if (id) {
      let check = window.confirm("You want to delete!")
      if (check) {
        await deleteBoard(id)
        getBoardByProject(id)
      }
    }
  }
  return (

    <div className="board-content">
      <div><button onClick={() => onCreateNew()}>{status ? "Create New Milestone" : "Update MileStone"}</button></div>
      <div className="row">
        <div className="col-6 form-group">
          <label>Start date</label>
          <input value={startDate} type="date" className="form-control" onChange={(e) => onChangeInput(e, "startDate")}></input>
        </div>
        <div className="col-6 form-group">
          <label>End date</label>
          <input value={endDate} type="date" className="form-control" onChange={(e) => onChangeInput(e, "endDate")}></input>
        </div>
        <div className="col-6 form-group">
          <label>title</label>
          <input value={title} type="text" className="form-control" onChange={(e) => onChangeInput(e, "title")}></input>
        </div>
        <div className="container">
          <Table bordered hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody style={{ border: '1px solid black' }}>
              {allMileStone && allMileStone.length > 0 && allMileStone.map((item, index) => {
                let linkadd = `/boardcontent/${item._id}`
                return (<tr>
                  <Link className="link-view" to={linkadd} style={{ textDecoration: "none", color: "blue" }}>
                    <td>{item.title}</td>
                  </Link>
                  <td>  {moment(item.startDate).format(
                    "DD/MM/YYYY"
                  )}</td>
                  <td>{moment(item.endDate).format(
                    "DD/MM/YYYY"
                  )}</td>
                  <td>
                    <button onClick={() => handleEditMileStone(item)}>Edit</button>
                    <button onClick={() => handleDelete(item._id)}>Delete</button>
                  </td>
                </tr>)
              })}
            </tbody>
          </Table>
        </div>
      </div>

    </div>
  )
}

export default BoardMilestone;
