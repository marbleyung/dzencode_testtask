import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetching } from "../hooks/useFetching";
import Loader from "../components/UI/loader/MyLoader";
import CommentsService from "../API/CommentsService";


const Comment = () => {
    const params = useParams()
    console.log(params)
    const [comment, setComment] = useState({})
    const [nestedComments, setNestedComments] = useState([])
    const [fetchCommentById, isLoading, error] = useFetching(async (id) => {
        const response = await CommentsService.getComment(id)
        console.log('response data', response.data)
        setComment(response.data)
    })

    const [fetchNestedComments, isNestedCommentsLoading, nestedCommentsError] =
        useFetching(async (id) => {
            const response = await CommentsService.getNestedComments(id)
            console.log('response data nested', response.data.results)
            setNestedComments(response.data.results)
        })
    useEffect(() => {
        fetchCommentById(params.id);
        fetchNestedComments(params.id);
    }, [])

    return (
        <div>
            <h1>COMMENT {params.id} PAGE</h1>
            {
                isLoading
                    ? <Loader />
                    : <div>{comment.id}{comment.owner}</div>
            }
            {
                isNestedCommentsLoading
                    ? <Loader />
                    : <div>
                        {nestedComments.map(c =>
                            <div>
                                <p>{c.body}</p>
                            </div>
                        )
                        }
                    </div>
            }
        </div>
    )
}

export default Comment;