import React from 'react';
import styles from "./Button.module.css"

function Button({text,icon,onClick,width, isInActiveState}) {
    
    return (
        <>
            <button style={width} onClick={onClick} className={`${styles.btn} ${isInActiveState && styles.isInActive}`}>
                <span>{text}</span>
                {icon}
            </button>
        </>
    );
}

export default Button;