import React, { useState } from 'react';
import Card from "../../../../components/shared/Card/Card"
import Button from "../../../../components/shared/Button/Button"
import { FaLongArrowAltRight } from "react-icons/fa";
import TextInput from "../../../../components/shared/TextInput/TextInput"
import style from "./Email.module.css"

function Email({onNext}) {

    const [email, setEmail] = useState("")
    const [isInActiveState, setIsInActiveState] = useState(true);

    const iconStyle = {
        fontSize: "20px",
    }

    const customBtnWidth = {
        width: "150px"
    }

    return (
        <>
            <Card title="Enter a email address" emoji="✉️">
                <TextInput value={email} onChange={(e) => {
                    if(e.target.value) {
                        setIsInActiveState(false);
                    }
                    else {
                        setIsInActiveState(true);
                    }
                    setEmail(e.target.value)
                }} />
                <div>
                    <Button width={customBtnWidth} isInActiveState={isInActiveState} onClick={onNext} text="Next" icon={<FaLongArrowAltRight style={iconStyle} />}></Button>
                </div>
                <p className={style.bottomParagraph}>By entering your number, you’re agreeing to our Terms of Service and Privacy Policy. Thanks!</p>

            </Card>
        </>
    );
}

export default Email;