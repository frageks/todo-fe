import React from "react";
import Modal from "react-modal";
import RequestsHandler from "./requestsHandler";

Modal.setAppElement("#root");

function EditForm({ modalIsOpen, closeModal, todo, setTodo, save: saveTodo }) {
    function updateTodo(title, description) {
        if (title !== undefined) {
            setTodo({ ...todo, title });
        }
        if (description !== undefined) {
            setTodo({ ...todo, description });
        }
    }

    async function save(e) {
        e.preventDefault();
        await RequestsHandler.update(todo);
        saveTodo(todo);
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
                <div>Edit todo</div>
            </div>
            <div className="form-wrapper">
                <form>
                    <input defaultValue={todo.title} onChange={(e) => updateTodo(e.target.value)} />
                    <input defaultValue={todo.description} onChange={(e) => updateTodo(undefined, e.target.value)} />
                    <button type="submit" onClick={save}>Save</button>
                </form>
            </div>
        </Modal>
    );
}

export default EditForm;
