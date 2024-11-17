import React from "react";
import Modal from "react-modal";
import RequestsHandler from "./requestsHandler";

function DeleteModal({ modalIsOpen, closeModal, todo, setTodo }) {
    async function yes(e) {
        e.preventDefault();
        await RequestsHandler.delete(todo.id);
        setTodo(todo.id);
        closeModal();
    }

    const customStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
        },
    };

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
        >
            <div className="modal-title">
                <button onClick={closeModal}>close</button>
                <div>Delete todo</div>
            </div>
            <div className="modal-body">
                <div className="delete-btns-wrapper">
                    <button onClick={yes}>Yes</button>
                    <button onClick={closeModal}>No</button>
                </div>
            </div>
        </Modal>
    );
}

export default DeleteModal;
