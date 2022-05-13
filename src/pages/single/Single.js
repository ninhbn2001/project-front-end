import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import React, { useState, useEffect } from 'react';
import List from "../../components/table/Table";
import { useParams } from "react-router-dom";
import { fetchUserDetails, deleteUser } from "../../Actions/ApiCall"
import ModalUser from "./ModalUser";

const Single = () => {
  const [user, setUser] = useState({})
  const [OpenModal, setOpenModal] = useState(false)

  const { id } = useParams()

  useEffect(() => {


    getDetailUser(id)
  }, [])

  const getDetailUser = async (id) => {
    let res = await fetchUserDetails(id)
    setUser(res)
    console.log("Check res: ", res)
  }

  const handleOpenModal = () => {
    setOpenModal(!OpenModal)
  }

  const handleToggetModal = () => {
    setOpenModal(!OpenModal)
  }

  const updateUserNew = () => {
    getDetailUser(id)
    setOpenModal(!OpenModal)
  }

  

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton" onClick={() => handleOpenModal()}>Edit</div>
            <ModalUser user={user} isOpen={OpenModal} toggleShowCardModal={handleToggetModal} updateUserNew={updateUserNew} />
            <h1 className="title">Information</h1>
            <div className="item">
              {/* <img
                src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                alt=""
                className="itemImg"
              /> */}
              <div className="details">
                <h1 className="itemTitle">{user.name}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{user.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">{user.phonenumber}</span>
                </div>


              </div>
            </div>
          </div>
          {/* <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div> */}
        </div>
        <div className="bottom">
          <h1 className="title">Last Transactions</h1>
          <List />
        </div>
      </div>
    </div>
  );
};

export default Single;
