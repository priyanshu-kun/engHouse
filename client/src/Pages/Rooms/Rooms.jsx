import React from 'react';
import styles from "./Rooms.module.css"
import { FiSearch } from "react-icons/fi";
import { FaMicrophoneAlt } from "react-icons/fa";
import RoomCard from '../../components/RoomCard/RoomCard';



const rooms = [
    {
        id: 1,
        topic: 'Which framework best for frontend ?',
        speakers: [
            {
                id: 1,
                name: 'John Doe',
                avatar: '/images/nezuko.jpg',
            },
            {
                id: 2,
                name: 'Jane Doe',
                avatar: '/images/nezuko.jpg',
            },
        ],
        totalPeople: 40,
    },
    {
        id: 3,
        topic: 'What’s new in machine learning?',
        speakers: [
            {
                id: 1,
                name: 'John Doe',
                avatar: '/images/nezuko.jpg',
            },
            {
                id: 2,
                name: 'Jane Doe',
                avatar: '/images/nezuko.jpg',
            },
        ],
        totalPeople: 40,
    },
    {
        id: 4,
        topic: 'Why people use stack overflow?',
        speakers: [
            {
                id: 1,
                name: 'John Doe',
                avatar: '/images/nezuko.jpg',
            },
            {
                id: 2,
                name: 'Jane Doe',
                avatar: '/images/nezuko.jpg',
            },
        ],
        totalPeople: 40,
    },
    {
        id: 5,
        topic: 'Artificial inteligence is the future?',
        speakers: [
            {
                id: 1,
                name: 'John Doe',
                avatar: '/images/nezuko.jpg',
            },
            {
                id: 2,
                name: 'Jane Doe',
                avatar: '/images/nezuko.jpg',
            },
        ],
        totalPeople: 40,
    },
  {
        id: 5,
        topic: 'Artificial inteligence is the future?',
        speakers: [
            {
                id: 1,
                name: 'John Doe',
                avatar: '/images/nezuko.jpg',
            },
            {
                id: 2,
                name: 'Jane Doe',
                avatar: '/images/nezuko.jpg',
            },
        ],
        totalPeople: 40,
    },
  {
        id: 5,
        topic: 'Artificial inteligence is the future?',
        speakers: [
            {
                id: 1,
                name: 'John Doe',
                avatar: '/images/nezuko.jpg',
            },
            {
                id: 2,
                name: 'Jane Doe',
                avatar: '/images/nezuko.jpg',
            },
        ],
        totalPeople: 40,
    },
  {
        id: 5,
        topic: 'Artificial inteligence is the future?',
        speakers: [
            {
                id: 1,
                name: 'John Doe',
                avatar: '/images/nezuko.jpg',
            },
            {
                id: 2,
                name: 'Jane Doe',
                avatar: '/images/nezuko.jpg',
            },
        ],
        totalPeople: 40,
    },
  {
        id: 5,
        topic: 'Artificial inteligence is the future?',
        speakers: [
            {
                id: 1,
                name: 'John Doe',
                avatar: '/images/nezuko.jpg',
            },
            {
                id: 2,
                name: 'Jane Doe',
                avatar: '/images/nezuko.jpg',
            },
        ],
        totalPeople: 40,
    },
  {
        id: 5,
        topic: 'Artificial inteligence is the future?',
        speakers: [
            {
                id: 1,
                name: 'John Doe',
                avatar: '/images/nezuko.jpg',
            },
            {
                id: 2,
                name: 'Jane Doe',
                avatar: '/images/nezuko.jpg',
            },
        ],
        totalPeople: 40,
    },
  {
        id: 5,
        topic: 'Artificial inteligence is the future?',
        speakers: [
            {
                id: 1,
                name: 'John Doe',
                avatar: '/images/nezuko.jpg',
            },
            {
                id: 2,
                name: 'Jane Doe',
                avatar: '/images/nezuko.jpg',
            },
        ],
        totalPeople: 40,
    },
  {
        id: 5,
        topic: 'Artificial inteligence is the future?',
        speakers: [
            {
                id: 1,
                name: 'John Doe',
                avatar: '/images/nezuko.jpg',
            },
            {
                id: 2,
                name: 'Jane Doe',
                avatar: '/images/nezuko.jpg',
            },
        ],
        totalPeople: 40,
    },
  {
        id: 5,
        topic: 'Artificial inteligence is the future?',
        speakers: [
            {
                id: 1,
                name: 'John Doe',
                avatar: '/images/nezuko.jpg',
            },
            {
                id: 2,
                name: 'Jane Doe',
                avatar: '/images/nezuko.jpg',
            },
        ],
        totalPeople: 40,
    },
];


function Rooms() {
    return (
        <>
            <div  className={`container ${styles.customContainerStyles}`}>
                <header className={styles.roomsHeader}>
                    <div className={styles.left}>
                        <span className={styles.heading}>All voice rooms</span>
                        <div className={styles.searchBox}>
                            <FiSearch />
                            <input type="text" id="searchInput" className={styles.searchBar} />
                        </div>
                    </div>
                    <div className={styles.right}>
                        <button className={styles.startRoomButton}>
                            <FaMicrophoneAlt style={{color: "#fff", fontSize: "18px"}} />
                            <span className={styles.btnTxt}>Create a room</span>
                        </button>
                    </div>
                </header>
                <div className={styles.roomList}>
                    {
                        rooms.map(room => <RoomCard key={room.id} room={room} />)
                    }

                </div>
            </div>
        </>
    );
}

export default Rooms;
