import React from 'react';
import styles from "./Navbar.module.css"
import { Link } from "react-router-dom";
import { logout } from '../../../http';
import {useDispatch, useSelector} from "react-redux"
import {setAuth} from "../../../store/auth.Slice"
import { setAvatar, setName, setUsername } from '../../../store/activate.Slice';

function Navbar() {

    const dispatch = useDispatch();
    const {user, isAuth} = useSelector(state => state.auth);


    async function logOutUser() {
        try {
            const {data} = await logout() 
            dispatch(setAuth(data))
            dispatch(setName(""))
            dispatch(setUsername(""))
            dispatch(setAvatar(""))
        }
        catch(e) {
            console.error(e)
        }
    }


    const brandStyle = {
        color: "#fff",
        textDecoration: "none",
        fontSize: "18px",
        
        display: "flex",
        alignItems: "center",
    }
    const logoText = {
        marginLeft: "3px"
    }
    return (
        <nav className={`container ${styles.navbar}`}>
            <Link style={brandStyle} to="/">
                <span>👋</span><span style={logoText}>Eng.House</span>
            </Link>
            <div className={styles.navRight}>
                <h3>{user.name}</h3>
                <Link to="/">
                    <img src={user.avatar} width="40" height="40" alt="avatar" />
                </Link>
            {
                isAuth && (
                    <button onClick={logOutUser}>LogOut</button>
                )
            }
            </div>
        </nav>
    );
}

export default Navbar;