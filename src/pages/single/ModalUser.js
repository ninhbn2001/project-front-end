import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap"
import { updateUser } from "../../Actions/ApiCall"
import { cloneDeep } from 'lodash'

class ModalUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            phonenumber: ""
        };
    }



    onChangeInput = (e, id) => {
        let result = e.target.value;
        let copyState = { ...this.state };
        copyState[id] = result;
        this.setState({ ...copyState });
    }

    handleUpdateUser = async () => {
        let { user } = this.props;
        await updateUser(user._id, this.state)
        this.props.updateUserNew();
    }




    componentDidMount() { }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.user !== this.props.user) {
            let { user } = this.props
            this.setState({
                name: user.name,
                email: user.email,
                phonenumber: user.phonenumber
            });
        }
    }

    toggleModal = () => {
        this.props.toggleShowCardModal();
    }

    render() {
        let { isOpen } = this.props
        let { name, email, phonenumber } = this.state
        console.log("check pro: ", this.props)
        console.log("check state: ", this.state)

        return <>
            <Modal

                isOpen={isOpen}
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
                    Create New User
                </ModalHeader>
                <ModalBody>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>Name</label>
                            <input
                                value={name}
                                type="text"
                                className="form-control"
                                onChange={(e) => this.onChangeInput(e, "name")}
                            />
                        </div>
                        <div className="input-container">
                            <label>email</label>
                            <input
                                value={email}
                                type="email"
                                className="form-control"
                                onChange={(e) => this.onChangeInput(e, "email")}
                            />
                        </div>
                        <div className="input-container">
                            <label>Phone Number</label>
                            <input
                                value={phonenumber}
                                type="email"
                                className="form-control"
                                onChange={(e) => this.onChangeInput(e, "phonenumber")}
                            />
                        </div>

                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"

                        className="px-3"
                        onClick={() => {
                            this.handleUpdateUser();
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



export default ModalUser;