import {useRef, useState} from "react"
import { useStateWithCallback } from "./useStateWithCallback"
export const useWebRTC = (roomId, user) => {
  const [clients, setClients] = useStateWithCallback([
    {
      id: 1,
      name: 'jhon doe'
    },
    {
      id: 2,
      name: 'priyanhsu'
    }
  ])
  const audioElements = useRef({})
  const connections = useRef({})
  const localMediaStream = useRef(null)


  const provideRef = (instance, userId) => {
    audioElements.current[userId] = instance
  }

  return {clients, provideRef}

}