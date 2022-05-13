import "./widget.scss";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import TaskIcon from '@mui/icons-material/Task';
import { fetchAllUser, getAllProject } from 'Actions/ApiCall'
import React, { useState, useEffect } from 'react';

const Widget = ({ type }) => {
  const [allUser, setallUser] = useState([])
  const [allProject, setallProject] = useState([])

  const getAllUser = async () => {
    let res = await fetchAllUser()
    setallUser(res)
    console.log(12, res)
  }

  const getTotalProject = async () => {
    let res = await getAllProject()
    setallProject(res)
    console.log(12, res)
  }

  useEffect(() => {
    getAllUser()
    getTotalProject()
  }, [])




  let data = allUser.length;



  switch (type) {
    case "user":
      data = {
        title: "USERS",
        count: data,
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "Project",
        count: allProject.length,
        link: "View all project",
        icon: (
          <TaskIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.count}
        </span>
      </div>
      <div className="right">
        {data.icon} 
      </div>
    </div>
  );
};

export default Widget;
