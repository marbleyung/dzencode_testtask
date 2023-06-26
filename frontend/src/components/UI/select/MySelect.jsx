import React from "react";
import classes from './MySelect.module.css';

function Select({ options, defaultValue, value, onChange }) {

    return (
        <div>
            <select value={value}
            onChange={event => onChange(event.target.value)}
            className={classes.mySelect}>
                <option disabled value="">{defaultValue}</option>
                {options.map(option => 
                    <option value={option.value}>
                        {option.name}
                    </option>
                )}
            </select>
        </div>
    );
}

export default Select;


