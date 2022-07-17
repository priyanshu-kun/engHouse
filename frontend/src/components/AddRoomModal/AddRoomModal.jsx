import React from 'react'
import styles from "./AddRoomModal.module.css"
import TextInput from "../shared/TextInput/TextInput"
import { useState } from 'react'
import {createRoom as create} from "../../http/index"
import {useHistory} from "react-router-dom"

function AddRoomModal({onModalClose}) {


  const [roomType, setRoomType] = useState('open')
  const [topic, setTopic] = useState('')
  const history = useHistory()


  function setActiveRoomType(type) {
    setRoomType(type) 
  }


  async function createRoom() {
    try {
      if(!topic) {
        return;
      }
      const {data} = await create({topic, roomType});
      console.log("from AddRoom 27: ",data)
      history.push('/room/'+data.id)
      console.log(data)
    } 
    catch(e) {
      console.error(e) 
    }
  }

  
  return (
    <div className={styles.modalMask}>
        <div className={styles.modalBody}>
          <button onClick={onModalClose} className={styles.closeButton}>
            <img src='/images/close.png' alt='close' />
          </button>
           <div className={styles.modalHeader}>
              <h3 className={styles.heading}>Enter the topic to be disscussed.</h3>
              <TextInput  fullwidth="true" value={topic} onChange={(e) => {
                setTopic(e.target.value)
              }} />
              <h2 className={styles.subHeading}>Room types</h2>
              <div className={styles.roomTypes}>
                <div onClick={() => {
                    setActiveRoomType('open')
                  }} className={`${styles.typeBox} ${roomType === 'open' && styles.typeBoxActive}`}>
                  <img src='/images/globe.png' alt='globe' />
                  <span>Open</span>
                </div>
                <div onClick={() => {
                    setActiveRoomType('social')
                }} className={`${styles.typeBox} ${roomType === 'social' && styles.typeBoxActive}`}>
                  <img src='/images/social.png' alt='globe' />
                  <span>Social</span>
                </div>
                <div onClick={() => {
                    setActiveRoomType('private')
                }} className={`${styles.typeBox} ${roomType === 'private' && styles.typeBoxActive}`}>
                  <img src='/images/lock.png' alt='globe' />
                  <span>Private</span>
                </div>
              </div>
           </div>
           <div className={styles.modalFooter}>
              <h2>Start a room, open to everyone</h2>
              <button onClick={createRoom} className={styles.footerBtn}><img src='/images/celebration.png' alt="celebration" />Let's go</button>
           </div>
        </div>
    </div>
  )
}

export default AddRoomModal