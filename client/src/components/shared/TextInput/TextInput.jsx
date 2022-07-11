import React from 'react';
import style from "./TextInput.module.css"

function TextInput(props) {
    return (
        <div>
            <input className={style.input} style={{width: props.fullWidth === 'true' ? "100%": "inherit"}} type="text" {...props} />
        </div>
    );
}

export default TextInput;