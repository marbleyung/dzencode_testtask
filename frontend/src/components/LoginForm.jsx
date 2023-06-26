import React, { useState, useEffect } from 'react';
import AuthService from "../API/AuthService";
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { showPswrd } from '../utils/showPassword';
import Cookies from 'js-cookie';
import { CSSTransition } from 'react-transition-group';
import { useNavigate } from 'react-router-dom'; 



const LoginForm = () => {
  const navigate = useNavigate(); 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [responseStatus, setResponseStatus] = useState(undefined)
  const [loginResponse, setLoginResponse] = useState('')
  const [gettingResponse, setGettingResponse] = useState(false)

  const createJWT = (response) => {
    const accessToken = response.data.access;
    const refreshToken = response.data.refresh;
    setLoginResponse('Successful login')
    setResponseStatus(true)
    Cookies.set('access_token', accessToken);
    Cookies.set('refresh_token', refreshToken);
  }

  useEffect(() => {
    if (responseStatus === true) {
      const timeout = setTimeout(() => {
        navigate('/comments/');
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [responseStatus, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginResponse('') && setResponseStatus(undefined)
    setGettingResponse(true)
    const response = await AuthService.login(
      username.toLowerCase(),
      password
    )

    let errors = []
    response.status === 200
      ? createJWT(response)
      : Object.keys(response).forEach(key =>
        errors.push(response[key]),
        setLoginResponse(errors)) && setResponseStatus(false)

    setGettingResponse(false)
  }

  return (
    <div className="registration-container">
      { gettingResponse ? <div className="spinner"/> :
        loginResponse === 'Successful login' ? (

          <div>
            <CSSTransition
              in={true}
              appear={true}
              timeout={1000}
              classNames="fade"
            >
              <p className="validation-successful">{loginResponse}</p>
            </CSSTransition>
          </div>
        ) : (
          <p className="validation-error">{loginResponse}</p>
        )
      }

      <form className="registration-form">
        <MyInput
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

          <MyInput
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
          />
          <button className="btn btn-show-password" onClick={showPswrd} type="button">
            <FontAwesomeIcon id="password-eye-icon" className="icon" icon={faEye} size="xl" />
          </button>
        <MyButton onClick={handleSubmit} type="submit">Login</MyButton>
      </form>
    </div>
  );
};

export default LoginForm;
