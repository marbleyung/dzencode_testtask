import React, { useState } from "react";
import MyButton from './UI/button/MyButton.jsx';
import MyModal from './UI/modal/MyModal.jsx';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrashCan, faPencil, faReply, faCopy, faFileLines } from "@fortawesome/free-solid-svg-icons";
import CommentForm from "./CommentForm.jsx";


function Comment(props) {
    const router = useNavigate()
    const [modal, setModal] = useState(false)
    const [modalImage, setModalImage] = useState(false)

    function formatDate(obj) {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
        }).format(obj)
    }
    async function copyText() {
        try {
            await navigator.clipboard.writeText(props.comment.body);
            const icon = document.querySelector('.icon-copy')
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    }
    const [parentValue, setParentValue] = useState('')
    function passParentText() {
        setParentValue(props.comment.parent_body)
        setModal(true)

    }

    return (
        <div className="comment">
            <div className="comment-header">
                <ul className="comment-header-author">
                    <li className="comment-header-item"><strong>{props.comment.owner}</strong></li>
                    <li className="comment-header-item">{formatDate(new Date(props.comment.created))}</li>
                </ul>
                <ul className="comment-header-options">
                    <li className="comment-header-item">
                        <MyButton onClick={passParentText}>
                            <FontAwesomeIcon className="icon icon-reply" icon={faReply} />
                        </MyButton>
                        <MyModal visible={modal} setVisible={setModal}>
                            <CommentForm parent_id={props.comment.id} parent_body={props.comment.body}/>
                        </MyModal>
                    </li>
                    <li className="comment-header-item">
                        <MyButton onClick={copyText}>
                            <FontAwesomeIcon className="icon icon-copy" icon={faCopy} />
                        </MyButton>
                    </li>
                </ul>
            </div>
            <div className="comment-content">
                <div className="comment-text">

                    {props.comment.parent
                        ? <a style={{ cursor: "pointer" }} onClick={() => router(`/comments/${props.comment.id}`)}>

                            <p className="comment-parent">{props.comment.parent_body}</p>
                        </a>
                        : null}

                    <p className="comment-main" >{props.comment.body}</p>
                </div>
            </div>
            <div className="comment-btns">

                <div className="comment-attachment">
                    {props.comment.textfile
                        ? <div>
                            <a href={props.comment.textfile} target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faFileLines} size="xl" className="icon" />
                            </a>
                        </div>
                        : null
                    }
                    {props.comment.image
                        ? <div>
                            <button className="btn btn-check-image" onClick={() => setModalImage(true)}>
                                <FontAwesomeIcon className="icon" icon={faEye} size="xl" />
                            </button>
                            <MyModal visible={modalImage} setVisible={setModalImage}>
                                <img className="modal-image" src={props.comment.image} />
                            </MyModal>
                        </div>
                        : null
                    }
                </div>
                <div className="comment-control">

                    <MyButton onClick={() => router(`/comments/${props.comment.id}`)}>
                        <FontAwesomeIcon className="icon" icon={faPencil} />
                    </MyButton>
                    <MyButton onClick={() => props.remove(props.comment)}>
                        <FontAwesomeIcon className="icon" icon={faTrashCan} />
                    </MyButton>
                </div>
            </div>
        </div>
    );
}

export default Comment;
