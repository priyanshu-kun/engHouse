import React, { useState } from 'react';
import SetUpName from "../steps/SetUpName/SetUpName"
import SetUpAvatar from "../steps/SetUpAvatar/SetUpAvatar"
import "../../App.css"



const steps = {
    1: SetUpName,
    2: SetUpAvatar
}

function Activate(props) {


    const [step, setStep] = useState(1);
    const Step = steps[step];


    function onNext() {
        setStep(step + 1)
    }


    return (
        <div className="cardWrapper">
            <Step onNext={onNext}></Step> 
        </div>
    );
}

export default Activate;