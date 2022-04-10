import React from 'react'
import './Input.css'

function Input(props) {
   
    const element =
        props.element === "input" ? (
            <input
                id={props.id}
                type={props.type}
                placeholder={props.placeholder}
                onChange={props.onChange}
                value={props.value}
            />
        ) : (
            <textarea
                id={props.type}
                rows={props.rows || 3}
                onChange={props.onChange}
                value={props.value}
            />
        );

    return (
        <div className="form-control">
            <label htmlFor={props.id}>{props.label}</label>
            {element}
        </div>
    )
}

export default Input