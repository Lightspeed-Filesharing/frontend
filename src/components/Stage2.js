import React, {useState, useContext} from 'react';
import {Context} from '../states/store';
import styles from '../styles/Stage2.css';

const Stage2 = () => {
    const [state, dispatch] = useContext(Context);
    const localOptions = {
        longLink: false,
        deleteOnOpen: false,
        limitDownloads: null
    };

    const handleCreate = () => {
        dispatch({type: "SET_OPTIONS", payload: localOptions});
        dispatch({type: 'SET_STAGE', payload: 3})
    }


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
                    <input className="checkbox" type="checkbox" onChange={(e) => {
                        if (e.target.checked === true) {
                            localOptions.longLink = true;
                            return;
                        }

                        localOptions.longLink = false;
                    }}></input>
                    <p className="direction stage2">Long Link</p>
                </div>
                <div className="options-child check">
                    <input className="checkbox" type="checkbox" onChange={(e) => {
                        if (e.target.checked === true) {
                            localOptions.deleteOnOpen = true;
                            return;
                        }

                        localOptions.deleteOnOpen = false;
                    }}></input>
                    <p className="direction stage2">Delete On Open</p>
                </div>
                <div className="options-child check">
                    <input className="checkbox" type="checkbox" onChange={(e) => {
                        if (e.target.checked === true) {
                            localOptions.limitDownloads = true;
                            return;
                        }

                        localOptions.limitDownloads = null;
                    }}></input>
                    <p className="direction stage2">Limit Downloads</p>
                </div>
            </div>
            <div className="bottom stage2">
                <div className="buttons bottom stage2">
                    <button className="button cancel" onClick={() => {dispatch({type: "SET_STAGE", payload: 1}); dispatch({type: "SET_FILES", payload: null})}}>Cancel</button>
                    <button className="button create" onClick={handleCreate}>Create Lightspeed Link</button>
                </div>
            </div>
        </div>

    )
}

export default Stage2;