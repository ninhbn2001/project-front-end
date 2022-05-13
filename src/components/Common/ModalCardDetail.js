import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap"
import { updateDetailCard } from "../../Actions/ApiCall"
import { fetchCardDetails } from 'Actions/ApiCall'

class ModalCardDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: "",
            userId: "",
            cardDetal: [],
        };
    }

    onChangeInput = (e, id) => {
        let result = e.target.value;
        // userId = id
        let copyState = { ...this.state };
        copyState[id] = result;
        this.setState({ ...copyState });
    }

    handleAddDetailCardByUser = () => {
        let { userId, description } = this.state
        let detail = {
            cardId: this.props.card._id,
            userId: userId,
            description: description
        }
        if (!userId || !description) {
            alert("Missing parameter!")
        } else {
            let res = updateDetailCard(detail)
            this.props.toggleShowCardEdit();
        }
    }


    async componentDidMount() {
        let res = await fetchCardDetails(this.props.card._id)
        this.setState({
            cardDetal: res,
            description: res.description,
            userId: res.userId,
        })
        console.log("check res data:", res)
    }

    componentDidUpdate(prevProps, prevState, snapshot) { }

    toggleModal = () => {
        this.props.toggleShowCardEdit();
    }

    render() {
        let { openModal, allUser, card } = this.props
        let { userId, description } = this.state
        console.log("check user: ", allUser)
        console.log("check card: ", card)
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
                    View Card detail
                </ModalHeader>

                <ModalBody>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>Description</label>
                            <input
                                type="text"
                                className="form-control"
                                value={description}
                                onChange={(e) => this.onChangeInput(e, "description")}
                            />
                        </div>
                        <div className="input-container">
                            <label>User</label>
                            <select
                                value={userId}
                                onChange={(e) => this.onChangeInput(e, "userId")}
                            >
                                {allUser && allUser.length > 0 && allUser.map((item, index) => {
                                    return (
                                        <option value={item._id}>{item.email}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                </ModalBody>

                <ModalFooter>
                    <Button
                        color="primary"

                        className="px-3"
                        onClick={() => {
                            this.handleAddDetailCardByUser();
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



export default ModalCardDetail;