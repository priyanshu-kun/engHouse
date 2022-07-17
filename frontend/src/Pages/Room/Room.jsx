import React, { useState } from 'react'
import { useWebRTC } from '../../hooks/useWebRTC'
import styles from "./Room.module.css"
import {useHistory, useParams} from "react-router-dom"
import {useSelector} from "react-redux"
import { useEffect } from 'react'
import { getRoom } from '../../http'

function Room() {


  const {id: roomId} = useParams()
  const user = useSelector(state => state.auth.user)
  const {clients, provideRef, handleMute} = useWebRTC(roomId, user)
  const history = useHistory()
  const [room, setRoom] = useState(null)
  const [isMute, setMute] = useState(true)


  const handleManualLeave = () => {
    history.push("/rooms")
  }


  useEffect(() => {
    const fetchRoom = async () => {
      try {

        const {data} = await getRoom(roomId)
        if(!data) {
          throw new Error()
        }
        setRoom((prev) => data)
      }
      catch(e) {
        console.log(e) 
      }
    }
    fetchRoom()
  },[roomId])


  useEffect(() => {
    handleMute(isMute, user.id)
  },[isMute])


  const handleMuteClick = (clientId) => {
    if(clientId !== user.id) return;
    setMute((isMute) => !isMute)
  }


  return (
    <div className={styles.mt32}>
      <div className='container'>
        <button onClick={handleManualLeave} className={styles.goBack}>
          <img src='/images/arrow-back.png' alt="arrow back"/>
          <span>All voice rooms</span>
        </button>
      </div>
      <div className={styles.clientsWrap}>
        <div className={styles.header}>
          <h2 className={styles.topic}>{room ? room.topic : "Room not found."}</h2>
          <div className={styles.actions}>
              <button className=''><span>✋</span></button>
              <button onClick={handleManualLeave} ><span>✌️</span> <span>Leave quietly</span></button>
          </div>
        </div>
        <div className={styles.clientsList}>
          {
            clients.map(client => {
              return (
                <div className={styles.client} key={client.id}>
                  <div className={styles.userHead} >
                    <audio ref={(instance) => provideRef(instance, client.id)} src=""  autoPlay></audio>
                    <img className={styles.userAvatar} src={client.avatar} alt='avatar' />
                    <button onClick={() => {
                      handleMuteClick(client.id)
                    }} className={styles.micBtn}>
                      {
                          client.muted ?  (
                            <img src='/images/mic-mute.png' alt="mic icon" />
                          ):
                          (
                            <img src='/images/mic.png' alt="mic mute icon" />
                          )
                      }
                    </button>
                  </div>
                  <h4 className={styles.userName}>{client.name}</h4>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}


export default Room