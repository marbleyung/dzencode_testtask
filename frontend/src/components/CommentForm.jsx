import React, { useState, useEffect } from 'react';
import MyInput from './UI/input/MyInput';
import MyButton from './UI/button/MyButton';
import { resizeFile } from '../hooks/useImageResizer';
import CommentService from '../API/CommentsService';
import AuthService from '../API/AuthService';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const CommentForm = (props) => {
  const [parent, setParent] = useState('');
  const [parentBody, setParentBody] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState(null);
  const [textFile, setTextFile] = useState(null);
  const [accessToken, setAccessToken] = useState(Cookies.get('access_token'));
  const [refreshToken, setRefreshToken] = useState(Cookies.get('refresh_token'));
  const navigate = useNavigate();

  useEffect(() => {
    if (props) {
      setParent(props.parent_id);
      setParentBody(props.parent_body);
    }
  }, [props])

  const handleParentChange = (e) => {
    setParent(e.target.value);
  };

  const handleClearParent = (e) => {
    e.preventDefault();
    setParent('');
    setParentBody('');
  };

  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
    setTextFile(null); // Clear textFile if an image is selected
  };

  const handleTextFileChange = (e) => {
    const selectedTextFile = e.target.files[0];
    setTextFile(selectedTextFile);
    setImage(null); // Clear image if a text file is selected
  };

  const [textFileError, setTextFileError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (textFile && textFile.size) {
      const fileSizeInKB = textFile.size / 1024; // Convert file size to KB
      if (fileSizeInKB > 100) {
        setTextFileError("File size should be lesser than 100kb") // File size is valid
      }
    }

    if (image) {
      const blob = new Blob([image], { type: image.type });
      const resizedImage = await resizeFile(blob).then(e => setImage(e));
    }


    if (refreshToken) {
      const axiosResponse = await AuthService.refreshToken(refreshToken)
        .then((e) => {
          setAccessToken(e);
          Cookies.set('access_token', e)
          console.log('axiosResponse', axiosResponse)
        })
      const response = await CommentService.postComment(parent, body, image, textFile, accessToken)
      console.log('here is your response1', response, `image: ${image}`, `textfile: ${textFile}`)
    } else if (!(accessToken) && !(refreshToken)) {
      navigate('/login/');
    }

    setParent('');
    setBody('');
    setImage(null);
    setTextFile(null);
    window.location.reload()
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      {parent ?
        <div className="comment-form-block">
          <label htmlFor="parent">Reply to:</label>
          <MyInput type="text" id="parent" value={
            `${parent} ${parentBody}`
          } onChange={handleParentChange}
            style={{ cursor: "none", borderBottom: "0" }} disabled />
          <MyButton type="button" onClick={handleClearParent}>X</MyButton>
        </div>
        : null
      }
      <div className="comment-form-block">
        <label htmlFor="body">Body:</label>
        <textarea id="body" value={body} onChange={handleBodyChange} required />

      </div>
      <div className="comment-form-block">
        <label htmlFor="image">Image:</label>
        <MyInput type="file" id="image" accept="image/*" onChange={handleImageChange} />
      </div>
      <div className="comment-form-block">
        <label htmlFor="textFile">Text File:</label>
        <MyInput type="file" id="textFile" accept=".txt" onChange={handleTextFileChange} />
        { textFileError ? <p className="validation-error">{textFileError}</p> : null}
        <MyButton type="reset" onClick={() => setTextFile(null)}>X</MyButton>
      </div>
      <MyButton type="submit">Submit</MyButton>
    </form>
  );
};

export default CommentForm;
