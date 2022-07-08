import React, { useState } from 'react';
import Card from "../../../components/shared/Card/Card"
import TextInput from "../../../components/shared/TextInput/TextInput"
import Button from "../../../components/shared/Button/Button"
import { FaLongArrowAltRight } from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux"
import {setName} from "../../../store/activate.Slice"
import styles from "./SetUpName.module.css"

function SetUpName({ onNext }) {

    const {name} = useSelector((state) => state.activate)
    const dispatch = useDispatch()
    const [fullName,setfullName] = useState(name)
    const [isInActiveState, setIsInActiveState] = useState(true);


    const iconStyle = {
        fontSize: "20px",
    }

    const customBtnWidth = {
        width: "150px"
    }


    function nextStep() {
        if(!fullName) {
            return;
        }
        dispatch(setName(fullName))
        onNext()
    }


    return (
        <>
            <Card title="What's your full name?&nbsp;" emoji="😎">
                <TextInput value={fullName} onChange={(e) => {
                    if(e.target.value) {
                        setIsInActiveState(false);
                    }
                    else {
                        setIsInActiveState(true);
                    }
                    setfullName(e.target.value)
                }} />

                <p className={styles.paragraph}>People use real names at codershouse :)</p>

                <div>
                    <Button onClick={nextStep} width={customBtnWidth} isInActiveState={isInActiveState} text="Next" icon={<FaLongArrowAltRight style={iconStyle} />}></Button>
                </div>
            </Card>
        </>
    );
}

export default SetUpName;