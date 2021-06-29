import React, {useState, useContext} from 'react';
import styles from '../styles/Stage2.css';
import moreStyles from '../styles/Stage4.css';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheck} from '@fortawesome/free-solid-svg-icons';

const Stage4 = () => {
    return (
        <div className="bottom">
            <div className="titles stage2">
                <h1 className="titles stage2">File Uploaded</h1>
                {/* <h2 className="subtitle stage2"></h2> */}
            </div>
            <div className="icongroup">
                <div className="circle stage4">
                    <FontAwesomeIcon icon={faCheck} />
                </div>
            </div>
    </div>

    )
}

export default Stage4;