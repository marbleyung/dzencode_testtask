import React from "react";
import classes from './MyInput.module.css';


const Input = React.forwardRef((props, ref) => {

    return (
        <input {...props} className={classes.myInput}/>
    );
})

export default Input;
