import React, { useEffect } from "react";
import classes from './MyModal.module.css';


function Modal({ children, visible, setVisible }) {

    const rootClasses = [classes.myModal]
    if (visible) {
        rootClasses.push(classes.active)
    }

    const handleKeyPress = (event) => {
        if (event.key === "Escape") {
            setVisible(false);
        }
    };

    useEffect(() => {
        if (visible) {
            document.addEventListener("keydown", handleKeyPress);
        }

        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, [visible, handleKeyPress]);

    return (
        < div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={classes.myModalContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </ div >
    )
}

export default Modal;
