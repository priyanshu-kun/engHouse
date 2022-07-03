import React, { useState } from 'react';
import Card from "../../../components/shared/Card/Card"
import TextInput from "../../../components/shared/TextInput/TextInput"
import Button from "../../../components/shared/Button/Button"
import { FaLongArrowAltRight } from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux"
import {setUsername} from "../../../store/activate.Slice"
import styles from "./SetUpUsername.module.css"

function SetUpUsername({ onNext }) {

    const {username,name} = useSelector((state) => state.activate)
    const dispatch = useDispatch()
    const [usernameLocal,setUsernameLocal] = useState(username)


    const iconStyle = {
        fontSize: "20px",
    }

    const customBtnWidth = {
        width: "150px"
    }


    function nextStep() {
        if(!usernameLocal) {
            return;
        }
        dispatch(setUsername(usernameLocal))
        onNext()
    }


    return (
        <>
            <Card title={`Okay, ${name}! `} emoji="🤯">
                <TextInput value={usernameLocal} onChange={(e) => {
                    setUsernameLocal(e.target.value)
                }} />
                <p className={styles.paragraph}>Give yourself a unique username :)</p>
                <div>
                    <Button onClick={nextStep} width={customBtnWidth} text="Next" icon={<FaLongArrowAltRight style={iconStyle} />}></Button>
              </div>
            </Card>
        </>
    );
}

export default SetUpUsername;