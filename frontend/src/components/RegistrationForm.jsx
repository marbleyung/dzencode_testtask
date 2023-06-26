import React, { useState } from 'react';
import AuthService from "../API/AuthService";
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { showPswrd } from '../utils/showPassword';

const RegistrationForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [responseStatus, setResponseStatus] = useState(undefined);
    const [signupResponse, setSignupResponse] = useState('');
    const [validationErrors, setValidationErros] = useState([]);


    const usernameValidator = (username) => {
        let usernameValidationErrors = []
        const isASCII = /^[A-Za-z0-9_]+$/.test(username);
        const isLengthValid = username.length > 5 && username.length < 21;
        const containsLetters = /[a-zA-Z]/.test(username);
        const neitherStartsNorEndsWithUnderscore = !(username.startsWith('_') || username.endsWith('_'));

        if (!isASCII) usernameValidationErrors.push('Username should contain A-Z, a-z, 0-9, or "_" symbols only.');
        if (!isLengthValid) usernameValidationErrors.push('Username should be between 6 and 20 characters long.');
        if (!containsLetters) usernameValidationErrors.push('Username should contain at least one letter.');
        if (!neitherStartsNorEndsWithUnderscore) usernameValidationErrors.push("Username shouldn't start or end with an underscore.");

        return usernameValidationErrors
    }

    const emailValidator = (email) => {
        let emailValidationErrors = []
        const isASCII = /^[A-Za-z0-9_@.]+$/.test(email);
        const isLengthValid = email.length > 5 && email.length < 51;
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        if (!isASCII) emailValidationErrors.push('Email should contain A-Z, a-z, 0-9, or "_" symbols only.');
        if (!isLengthValid) emailValidationErrors.push('Email should be between 6 and 50 characters long.');
        if (!isValidEmail(email)) emailValidationErrors.push('Email has invalid format')
        return emailValidationErrors
    }

    const passwordValidator = (password) => {
        let passwordValidationErrors = []
        const isUnicode = /^[\u0000-\uFFFF]+$/.test(password);
        const isLengthValid = password.length >= 8 && password.length <= 30;

        if (!isUnicode) passwordValidationErrors.push('Password should contain unicode symbols only.');
        if (!isLengthValid) passwordValidationErrors.push('Password should be between 8 and 30 characters long.');
        return passwordValidationErrors
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setValidationErros([])
        setSignupResponse('') && setResponseStatus(undefined)
        const usernameValidationErrors = usernameValidator(username);
        const emailValidationErrors = emailValidator(email);
        const passwordValidationErrors = passwordValidator(password);
        console.log(usernameValidationErrors)
        console.log(emailValidationErrors)
        console.log(passwordValidationErrors)

        if (!usernameValidationErrors.length
            && !emailValidationErrors.length
            && !passwordValidationErrors.length) {
            const response = await AuthService.createNewUser(
                username.toLowerCase(),
                email.toLowerCase(),
                password
            )
            let errors = []
            response.status === 201
                ? setSignupResponse('Successful created') && setResponseStatus(true)
                : Object.keys(response).forEach(key =>
                    errors.push(response[key]),
                    setSignupResponse(errors)) && setResponseStatus(false)
        } else {
            setValidationErros([
                usernameValidationErrors,
                emailValidationErrors,
                passwordValidationErrors,
            ])
            console.log(validationErrors)
        }
    };

    return (

        <div className="registration-container">
            {
                signupResponse === 'Successful created' ?? responseStatus
                    ? <p className="validation-successful">{signupResponse}</p>
                    : <p className="validation-error">{signupResponse}</p>
            }
            <form className="registration-form">
                <h1>Create an account</h1>
                <div className="registration-inputs">

                    <MyInput
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    {
                        validationErrors.length && validationErrors[0].length
                            ? (
                                validationErrors[0].map((error, index) =>
                                    <p className="validation-error" key={index}>{error}</p>)
                            )
                            : null
                    }
                    <MyInput
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {
                        validationErrors.length && validationErrors[1].length
                            ? (
                                validationErrors[1].map((error, index) =>
                                    <p className="validation-error" key={index}>{error}</p>)
                            )
                            : null
                    }

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
                    {
                        validationErrors.length && validationErrors[2].length
                            ? (
                                validationErrors[2].map((error, index) =>
                                    <p className="validation-error" key={index}>{error}</p>)
                            )
                            : null
                    }
                </div>

                <MyButton onClick={handleSubmit} type="submit">Sign-Up</MyButton>
            </form>
        </div>
    );
};

export default RegistrationForm;
