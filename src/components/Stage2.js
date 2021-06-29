import React, {useState, useContext} from 'react';
import {Context} from '../states/store';
import styles from '../styles/Stage2.css';

const Stage1 = () => {
    const [state, dispatch] = useContext(Context);
        
    return (
        <div className="bottom stage2">
            <div className="titles stage2">
                <h1 className="title stage2">Configuration</h1>
                {/* <h2 className="subtitle stage2">Change security and privacy settings.</h2> */}
            </div>
            <div className="options">
                <div className="options-child">
                    <p className="direction stage2">Message</p>
                    <input className="input" placeholder="Hey! This is the doc you requested."></input>
                </div>
                <hr />
                <div className="options-child check">
                    <p className="direction stage2">Long Link</p>
                    <input className="checkbox" type="checkbox"></input>
                </div>
                <div className="options-child check">
                    <p className="direction stage2">Delete On Open</p>
                    <input className="checkbox" type="checkbox"></input>
                </div>
                <div className="options-child check">
                    <p className="direction stage2">Limit Downloads</p>
                    <input className="checkbox" type="checkbox"></input>
                </div>
            </div>
        </div>

    )
}

export default Stage1;