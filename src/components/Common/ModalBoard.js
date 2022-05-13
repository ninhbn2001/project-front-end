import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap"
import { createNewProject } from "../../Actions/ApiCall"


class ModalBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
        };
    }


    check = () => {
        let { title } = this.state
        if (!title || title.length < 10) {
            alert("title must >0  and  < 10 ")
            return false
        }
        return true
    }

    onChangeInput = (e, id) => {
        let result = e.target.value;
        let copyState = { ...this.state };
        copyState[id] = result;
        this.setState({ ...copyState });
    }

    handleAddBoard = () => {
        let { title } = this.state
        let detail = {
            title: title,
        }
        let check = this.check();
        if (check) {
            let res = createNewProject(detail)
            this.toggleModal()
        }

    }


    componentDidMount() { }

    componentDidUpdate(prevProps, prevState, snapshot) { }

    toggleModal = () => {
        this.props.toggleShowBoardAdd();
    }

    render() {
        let { openModal } = this.props
        let { title } = this.state
        console.log("check state: ", this.state)
        return <>
            <Modal

                isOpen={openModal}
                toggle={() => {
                    this.toggleModal();
                }}
                size="lg"
                centered={true}
                className="modal-user-container"
            >
                <ModalHeader
                    toggle={() => {
                        this.toggleModal();
                    }}
                >
                    Create New Board
                </ModalHeader>
                <ModalBody>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>Title</label>
                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) => this.onChangeInput(e, "title")}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        className="px-3"
                        onClick={() => {
                            this.handleAddBoard();
                        }}
                    >
                        Save
                    </Button>{" "}
                    <Button
                        onClick={() => {
                            this.toggleModal();
                        }}
                        className="px-3"
                    >
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        </>;
    }
}



export default ModalBoard;