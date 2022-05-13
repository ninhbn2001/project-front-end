import React, { useEffect, useState, useRef } from 'react';
import { Container, Draggable } from 'react-smooth-dnd';
import './Column.scss';
import Card from 'components/Card/Card';
import { mapOrder } from 'utilities/sorts'
import { Dropdown, Form, Button } from 'react-bootstrap'
import ConfirmModal from 'components/Common/ConfirmModal';
import { MODAL_ACTION_CONFIRM } from 'utilities/constants'
import { saveContentAfterPressEnter, selectAllInlineText } from 'utilities/contentEditable'
import { cloneDeep } from 'lodash'
import { createNewCard, updateColumn } from 'Actions/ApiCall'

function Column(props) {
  const { column, onCardDrop, onUpdateColumnState } = props
  const cards = mapOrder(column.cards, column.cardOrder, '_id')

  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const toggleShowConfirmModal = () => setShowConfirmModal(!showConfirmModal)
  const [columnTitle, setColumnTitle] = useState('')
  const handleColumnTitleChange = (e) => setColumnTitle(e.target.value)
  const [openNewCardForm, setOpenNewCardForm] = useState(false)
  const toggleOpenNewCardForm = () => setOpenNewCardForm(!openNewCardForm)
  const newCardTextareaRef = useRef(null)
  const [newCardTitle, setNewCardTitle] = useState('')
  const onNewCardTitleChange = (e) => setNewCardTitle(e.target.value)

  useEffect(() => {
    setColumnTitle(column.title)
  }, [column.title])

  useEffect(() => {
    if (newCardTextareaRef && newCardTextareaRef.current) {
      newCardTextareaRef.current.focus()
      newCardTextareaRef.current.select()
    }
  }, [openNewCardForm])

  const onConfirmModalAction = (type) => {
    if (type === MODAL_ACTION_CONFIRM) {
      const newColumn = {
        ...column,
        _destroy: true
      }
      updateColumn(newColumn._id, newColumn).then(updatedColumn => {
        onUpdateColumnState(updatedColumn)
      })
    }
    toggleShowConfirmModal()
  }

  //update column
  const handleColumnTitleBlur = () => {

    if (columnTitle !== column.title) {
      const newColumn = {
        ...column,
        title: columnTitle
      }

      updateColumn(newColumn._id, newColumn).then(updatedColumn => {
        updatedColumn.cards = newColumn.cards
        onUpdateColumnState(updatedColumn)
      })
    }


  }

  const addNewCard = () => {
    if (!newCardTitle) {
      newCardTextareaRef.current.focus()
      return
    }
    const newCardToAdd = {
      boardId: column.boardId,
      columnId: column._id,
      title: newCardTitle.trim()
    }
    createNewCard(newCardToAdd).then(card => {
      let newColumn = cloneDeep(column)
      newColumn.cards.push(card)
      newColumn.cardOrder.push(card._id)

      onUpdateColumnState(newColumn)
      setNewCardTitle('')
      toggleOpenNewCardForm()
    })
  }

  return (
    <div className="column">
      <header className="column-drag-handle">
        <div className="column-title">
          <Form.Control size="small" type="text" className="project-management-content-editable"
            value={columnTitle}
            onChange={handleColumnTitleChange}
            onBlur={handleColumnTitleBlur}
            onKeyDown={saveContentAfterPressEnter}
            spellCheck="false"
            onClick={selectAllInlineText}
            onMouseDown={e => e.preventDefault()}
          />
        </div>
        <div className="column-dropdown-actions">
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic" size="sm" className="dropdown-btn" />
            <Dropdown.Menu>
              <Dropdown.Item onClick={toggleOpenNewCardForm} >Add card</Dropdown.Item>
              <Dropdown.Item onClick={toggleShowConfirmModal} >Remove column</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </header>


      <div className="card-list">
        <Container
          groupName="col"
          onDrop={dropResult => onCardDrop(column._id, dropResult)}
          getChildPayload={index => cards[index]}
          dragClass="card-ghost"
          dropClass="card-ghost-drop"
          onDropReady={p => console.log('Drop ready: ', p)}
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: 'card-drop-preview'
          }}
          dropPlaceholderAnimationDuration={200}
        >
          {cards.map((card, index) => (
            <Draggable className="card-customize" key={index}>
              <Card card={card} />
            </Draggable>
          ))}
        </Container>
        {openNewCardForm &&
          <div className="add-new-card">
            <Form.Control
              size="sm"
              as="textarea"
              rows="3"
              placeholder="Enter a title for this card"
              className="textarea-enter-new-card"
              ref={newCardTextareaRef}
              value={newCardTitle}
              onChange={onNewCardTitleChange}
              onKeyDown={event => (event.key === 'Enter') && addNewCard()}
            />
          </div>}
      </div>


      <footer>
        {openNewCardForm &&
          <div className="add-new-card-actions">
            <Button variant="success" size="sm" onClick={addNewCard}>Add card</Button>
            <span className="cancel-icon" onClick={toggleOpenNewCardForm}><i className="fa fa-trash icon" /></span>
          </div>}
        {!openNewCardForm &&
          <div className="footer-actions" onClick={toggleOpenNewCardForm}>
            <i className="fa fa-plus icon" />Add another card
          </div>
        }
      </footer>
      <ConfirmModal
        show={showConfirmModal}
        onAction={onConfirmModalAction}
        title="Remove column"
        content={`Are you sure! you want to remove <strong>${column.title}</strong>. <br /> All related cards will also be removed! `}
      />
    </div>
  )
}

export default Column;
