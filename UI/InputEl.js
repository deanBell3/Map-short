import React from 'react'

const inputEl=props=>{
    // custom input received with props
    let element;
    switch(props.elementType){
        case('input'):
        element=<input {...props.elementConfig} value={props.value} onChange={props.changed}/>;
        break;
        default:
        element=<input {...props.elementConfig} value={props.value} onChange={props.changed}/>;
        break;
    }
    return element;
}

export default inputEl;