import React from 'react'
import Card from '../Card/Card'
import styles from "./Loader.module.css"

function Loader({ message }) {
    return (
        <div style={{minHeight: "calc(100vh - 10px)"}} className='cardWrapper'>
            <div className={styles.card}>
                <img className={styles.loader} src='/images/loader.png' alt='Loading image' />
                <span className={styles.message}>{message}</span>
            </div>
        </div>
    )
}

export default Loader