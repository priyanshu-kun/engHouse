import React, { Children } from 'react';
import style from "./Card.module.css"

function Card({title,emoji,children}) {
    const headingText = {
        marginRight: "3px"
    }
   

    return (
        <div className={style.card}>
            <div className={style.headingWrapper}>
                <span style={headingText}>{emoji}</span>
                {title}
            </div>
            {children}
        </div>
    );
}

export default Card;