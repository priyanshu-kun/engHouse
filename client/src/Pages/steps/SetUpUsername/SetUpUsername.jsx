import React from 'react';

function SetUpUsername({onNext}) {
    return (
        <div>
            setup username
            <br />
            <button onClick={onNext}>Next</button>
        </div>
    );
}

export default SetUpUsername;