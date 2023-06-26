import React from "react";
import classes from './MyButton.module.css';

function Button({children, ...props}) {

    return (
        <button {...props} className={classes.myBtn}>
            {children}
        </button>
    );
}

export default Button;
