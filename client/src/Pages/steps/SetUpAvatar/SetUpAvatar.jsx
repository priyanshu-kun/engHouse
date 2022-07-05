import React, { useState } from 'react';
import Card from "../../../components/shared/Card/Card"

import { FaLongArrowAltRight } from "react-icons/fa";
import Button from "../../../components/shared/Button/Button"
import sytles from "./SetUpAvatar.module.css"
import {useSelector,useDispatch} from "react-redux"
import {setAvatar} from "../../../store/activate.Slice"
import {activate} from "../../../http/index"
import { setAuth } from '../../../store/auth.Slice';


function SetUpAvatar({onNext}) {

   const {name,avatar,username} = useSelector((state) => state.activate)
   const [image,setImage] = useState("/images/avatar.png")
   const dispatch = useDispatch()

    const iconStyle = {
        fontSize: "20px",
    }

    const customBtnWidth = {
        width: "150px"
    }

    async function submit() {
       try {
            if(!avatar) {
                return console.log("Upload a avatar plezz!");
            }
            const {data} = await activate({name,avatar,username})
            if(data.auth) {
                dispatch(setAuth(data));
            }
            console.log(data)
       } 
       catch(e) {
           console.log(e)
       }
    }

    function captureImage(e) {
        const file = e.target.files[0];
        const reader  = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function() {
            setImage(reader.result)
            dispatch(setAvatar(reader.result))
        }
    }

    return (
        <>
             <Card title={`Okay, ${name}!`} emoji="&nbsp;🐵">
                 <p className={sytles.subHeading}>How's this photo?</p>
               <div className={sytles.avatarWrapper}>
                   <img src={image} alt="avatar" />
               </div>
               <div>
                   <input onChange={captureImage} id="avatarInput" type="file" className={sytles.avatarInput} />
                   <label className={sytles.inputLabel} htmlFor="avatarInput">choose a different photo</label>
               </div>

                <div>
                    <Button onClick={submit} width={customBtnWidth} text="Next" icon={<FaLongArrowAltRight style={iconStyle} />}></Button>
                </div>
            </Card>
        </>
    );
}

export default SetUpAvatar;