import React,{useState} from 'react';
import Card from "../../../../components/shared/Card/Card"
import Button from "../../../../components/shared/Button/Button"
import { FaLongArrowAltRight } from "react-icons/fa";
import TextInput from "../../../../components/shared/TextInput/TextInput"
import style from "./Phone.module.css"
import {sendOtp} from "../../../../http/index"
import {useDispatch} from "react-redux"
import {setOTP} from "../../../../store/auth.Slice"

function Phone({onNext}) {

    const [phoneNumber,setPhoneNumber] = useState("")
    const [isInActiveState, setIsInActiveState] = useState(true);
    const dispatch = useDispatch()

    const iconStyle = {
        fontSize: "20px",
    }

    const customBtnWidth = {
        width: "150px"
    }

    async function submit() {
        // server request
        if(!phoneNumber) return;
        const {data} = await sendOtp({phone: phoneNumber});
        console.log(data);
        dispatch(setOTP({phone: data.phone,hash: data.hash}));
        onNext()
    }

    
    return (
        <>
            <Card title="Enter a phone number" emoji="☎️">
                <TextInput value={phoneNumber} onChange={(e) => {
                    if(e.target.value) {
                        setIsInActiveState(false);
                    }
                    else {
                        setIsInActiveState(true);
                    }
                    setPhoneNumber(e.target.value)
                }} />
                <div>
                    <Button width={customBtnWidth} isInActiveState={isInActiveState} onClick={submit} text="Next" icon={<FaLongArrowAltRight style={iconStyle} />}></Button>
                </div>
                <p className={style.bottomParagraph}>By entering your number, you’re agreeing to our Terms of Service and Privacy Policy. Thanks!</p>
            </Card>
        </>
    );
}

export default Phone;