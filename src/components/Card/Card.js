import React, { useEffect, useState, useRef } from 'react';
import './Card.scss';
import { Dropdown, Form, Button, DropdownButton, ButtonGroup } from 'react-bootstrap';
import ModalCard from "../Common/ModalCard"
import ModalCardDetail from 'components/Common/ModalCardDetail';
import { fetchAllUser } from '../../Actions/ApiCall'

function Card(props) {
  const [allUser, setallUser] = useState([])


  const { card } = props;
  const [showCardModal, setShowCardModal] = useState(false)
  const [showCardEdit, setShowCardEdit] = useState(false)
  // const toggleShowConfirmModal = () => setShowConfirmModal(!showConfirmModal)
  const toggleShowCardModal = () => setShowCardModal(!showCardModal)
  const toggleShowCardEdit = () => setShowCardEdit(!showCardEdit)

  const getAllUser = async () => {
    let res = await fetchAllUser()
    setallUser(res)
    console.log(12, res)
  }




  useEffect(() => {
    getAllUser()
  }, [])


  return (
    <>
      <div className="card-item">
        <span>{card.title}</span>
        <div className="column-dropdown-actions">
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic" size="sm" className="dropdown-btn" />
            <Dropdown.Menu>
              {/* <Dropdown.Item onClick={handleShow} >Remove column</Dropdown.Item> */}
              <Dropdown.Item className="drop-item" onClick={toggleShowCardModal} >Add card details</Dropdown.Item>
              <Dropdown.Item className="drop-item" onClick={toggleShowCardEdit}>Update card details</Dropdown.Item>
              <Dropdown.Item className="drop-item" onClick={toggleShowCardEdit}>Delete card</Dropdown.Item>
              {/* <CardModal openModal={showCardModal} /> */}
              <ModalCard openModal={showCardModal} toggleShowCardModal={toggleShowCardModal} allUser={allUser} card={card} />
              <ModalCardDetail openModal={showCardEdit} toggleShowCardEdit={toggleShowCardEdit} allUser={allUser} card={card} />
            </Dropdown.Menu>
          </Dropdown>
          <>
  {/* <div className="mb-2">
    {[ 'start', 'end'].map((direction) => (
      <DropdownButton
        as={ButtonGroup}
        key={direction}
        id={`dropdown-button-drop-${direction}`}
        drop={direction}
        variant="secondary"
        title={` Drop ${direction} `}
      >
        <Dropdown.Item eventKey="1">Action</Dropdown.Item>
        <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
        <Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
      </DropdownButton>
    ))}
  </div> */}
</>
        </div>
      </div>
    </>



  )
}

export default Card;
