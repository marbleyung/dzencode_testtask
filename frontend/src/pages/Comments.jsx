import React, { useEffect, useState } from "react";
import '../styles/App.css';
import CommentList from '../components/CommentList'
import CommentForm from '../components/CommentForm.jsx';
import CommentsFilter from '../components/CommentsFilter.jsx';
import MyModal from '../components/UI/modal/MyModal.jsx';
import MyButton from '../components/UI/button/MyButton.jsx';
import MyLoader from '../components/UI/loader/MyLoader.jsx';
import MyPage from '../components/UI/pagination/MyPage.jsx';
import { useSortedComments } from "../hooks/useComments";
import { useFetching } from "../hooks/useFetching";
import CommentsService from "../API/CommentsService";
import { getPagesCount } from "../utils/paginator";


function Comments() {
  const limit = 5
  const [filter, setFilter] = useState({
    sort: '',
  })
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(false)
  const [comments, setComments] = useState([])

  const sortedCommentsAfterSearch = useSortedComments(comments, filter.sort)
  const [totalPages, setTotalPages] = useState(0)


  const [fetchComments, isPageLoading, error] = useFetching(async (limit, offset) => {
    const response = await CommentsService.getAllComments(offset);
    setComments(response.data.results)
    const totalCount = response.data.count
    setTotalPages(getPagesCount(totalCount, limit))
  })

  useEffect(() => {
    fetchComments(limit, offset)
  }, [offset])

  const changePage = (p) => {
    setPage(p)
    setOffset(p * limit - limit)
    fetchComments(limit, offset)
  }

  const createComment = (newComment) => {
    setComments([...comments, newComment])
    setModal(false);
  }

  const removeComment = (commentToRemove) => {
    setComments(comments.filter(comment => comment.id !== commentToRemove.id))
  }


  return (
    <div className="App">
      <div className="filter">
        <CommentsFilter filter={filter} setFilter={setFilter} />
        {error && <h1>Some error has occured: ${error}</h1>}
      </div>
      <MyButton style={{ marginTop: '15px' }} onClick={() => setModal(true)}>
          New Comment
        </MyButton>
        <MyModal visible={modal} setVisible={setModal}>
          <CommentForm create={createComment} />
        </MyModal>
      <div className="main">

        <CommentList remove={removeComment} comments={sortedCommentsAfterSearch} />

        {isPageLoading &&
          <div style={{ display: "flex", justifyContent: "center", marginTop: '150px' }}>
            <MyLoader />
          </div>
        }

      </div>
      {totalPages > 1
        ?
        <MyPage page={page} totalPages={totalPages} changePage={changePage} />
        : null}
    </div >
  );
}

export default Comments;
