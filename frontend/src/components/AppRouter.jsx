import React from "react";
import { Routes, Route, Navigate} from "react-router-dom";
import Comment from "../pages/Comment.jsx";
import Comments from "../pages/Comments.jsx";
import Error404 from "../pages/Error404.jsx";
import Login from "../pages/Login.jsx";
import Signup from "../pages/Signup.jsx";
import Cookies from 'js-cookie';


const AppRouter = () => {

    const accessToken = Cookies.get('access_token');
    const refreshToken= Cookies.get('refresh_token');

    let isUserAuth = null
    if (accessToken) {
        isUserAuth = true
    } else if (refreshToken) {
        isUserAuth = true
    } else {
        isUserAuth = false
    }
    return (
        <div>
            {isUserAuth
                ? <Routes>
                    <Route exact="true" path='/comments/' element={<Comments />}></Route>
                    <Route exact="true" path='/comments/:id/' element={<Comment />}></Route>
                    <Route path="/login/" element={<Navigate to='/comments/' replace />}></Route>
                    <Route path="/signup/" element={<Navigate to='/comments/' replace />}></Route>
                    <Route path='*' element={<Error404 />}></Route>
                </Routes>
                : <Routes>
                    <Route path='/login/' element={<Login />}></Route>
                    <Route path='/signup/' element={<Signup />}></Route>
                    <Route exact="true" path='/comments/' element={<Comments />}></Route>
                    <Route exact="true" path='/comments/:id/' element={<Comment />}></Route>
                    <Route path='/bad-request/' element={<Error404 />}></Route>
                </Routes>
            }
        </div>
    )
}

export default AppRouter;