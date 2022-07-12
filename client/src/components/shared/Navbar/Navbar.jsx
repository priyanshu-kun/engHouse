import React from 'react';
import styles from "./Navbar.module.css"
import { Link } from "react-router-dom";
import { logout } from '../../../http';
import {useDispatch, useSelector} from "react-redux"
import {setAuth} from "../../../store/auth.Slice"
import { FaLongArrowAltRight } from "react-icons/fa";
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
    const iconStyle = {
        fontSize: "16px",
    }



    return (
        <nav className={`container ${styles.navbar}`}>
            <Link style={brandStyle} to="/">
                <span>👋</span><span style={logoText}>Eng.House</span>
            </Link>
            {
                isAuth && user.activated && (
                    <div className={styles.navRight}>
                        <h3 className={styles.name}>{user?.name}</h3>
                        <Link className={styles.avatarLink} to="/">
                            <img className={styles.avatar} src={user?.avatar} width="40" height="40" alt="avatar" />
                        </Link>
                    {
                        isAuth && (
                            <button className={styles.logout} onClick={logOutUser}><FaLongArrowAltRight style={iconStyle}/></button>
                        )
                    }
                    </div>
                )
            }
        </nav>
    );
}

export default Navbar;