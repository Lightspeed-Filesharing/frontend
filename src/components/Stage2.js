import React, {useState, useContext} from 'react';
import {Context} from '../states/store';
import styles from '../styles/Stage2.css';

const Stage2 = () => {
    const [state, dispatch] = useContext(Context);

    const [message, setMessage] = useState('');


    const handleCreate = () => {
        dispatch({type: 'SET_STAGE', payload: 3});
        dispatch({type: "SET_MESSAGE", payload: message})
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
                    <input className="input" value={message} onChange={(e) => {setMessage(e.target.value)}} placeholder="Hey! This is the doc you requested."></input>
                </div>
                <hr />
                <div className="options-child check">
                    <input className="checkbox" type="checkbox" onChange={(e) => {
                        if (e.target.checked === true) {
                            dispatch({type: "SET_LONGLINK", payload: true})
                            return;
                        }

                        dispatch({type: "SET_LONGLINK", payload: false})
                    }}></input>
                    <p className="direction stage2">Long Link</p>
                </div>
                <div className="options-child check">
                    <input className="checkbox" type="checkbox" onChange={(e) => {
                        if (e.target.checked === true) {
                            dispatch({type: "SET_DELETEONOPEN", payload: true})
                            return;
                        }

                        dispatch({type: "SET_DELETEONOPEN", payload: false})
                    }}></input>
                    <p className="direction stage2">Delete On Open</p>
                </div>
                <div className="options-child check" style={{marginBottom: 0}}>
                    <input className="checkbox" type="checkbox" onChange={(e) => {
                        if (e.target.checked === true) {
                            dispatch({type: "SET_LIMITDOWNLOADS", payload: true})
                            return;
                        }

                        dispatch({type: "SET_LIMITDOWNLOADS", payload: null})
                    }}></input>
                    <p className="direction stage2">Limit Downloads</p>
                </div>
                <hr />
                <div className="options-child">
                    <p className="direction stage2"><b>Attached</b></p>
                    <ul>
                        <li className="direction stage2">{state.files[0].name}</li>
                    </ul>
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