import React from "react";
import Comment from './Comment.jsx'
import { TransitionGroup, CSSTransition  } from "react-transition-group";


function CommentList({ comments, remove }) {
    if (!comments.length) {
        return (
            <h1 style={{ textAlign: "center" }}>There is no comments</h1>
        )
    } 
    return (
        <div className="comments-list">
            <TransitionGroup>
                {comments.map(comment =>
                    <CSSTransition key={comment.id} timeout={500} className="comment">
                        <Comment remove={remove} comment={comment} />
                    </CSSTransition>
                )}
            </TransitionGroup>

        </div>
    );
}

export default CommentList;
