import React, {useState, useContext} from 'react';
import styles from '../styles/Stage2.css';
import moreStyles from '../styles/Stage4.css';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheck} from '@fortawesome/free-solid-svg-icons';

const Stage4 = () => {
    return (
        <div className="bottom stage4">
            <div className="bottom-child">
                <div className="titles stage2">
                    <h1 className="title stage4">File Uploaded</h1>
                    {/* <h2 className="subtitle stage2"></h2> */} </div>
                <div className="icongroup">
                    <div className="circle stage4">
                        <FontAwesomeIcon size="lg" icon={faCheck}/>
                    </div>
                </div>
                <div className="center stage4">
                    <p className="direction" style={{textAlign: 'center'}}>Your file is ready to be securely shared.</p>
                    <p className="direction small">Copy your link below.</p>
                </div>
            </div>
        </div>

    )
}

export default Stage4;
