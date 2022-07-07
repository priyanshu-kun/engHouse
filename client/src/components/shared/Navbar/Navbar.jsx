import React from 'react';
import style from "./Navbar.module.css"
import { Link } from "react-router-dom";
import { logout } from '../../../http';
import {useDispatch, useSelector} from "react-redux"
import {setAuth} from "../../../store/auth.Slice"
import { setAvatar, setName, setUsername } from '../../../store/activate.Slice';

function Navbar() {

    const dispatch = useDispatch();
    const {isAuth} = useSelector(state => state.auth);


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
        <nav  className={`container ${style.navbar}`}>
            <Link style={brandStyle} to="/">
                <span>👋</span><span style={logoText}>Eng.House</span>
            </Link>
            {
                isAuth && (
                    <button onClick={logOutUser}>LogOut</button>
                )
            }
        </nav>
    );
}

export default Navbar;