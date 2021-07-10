import React, {useState, useContext, useEffect} from 'react';
import styles from '../styles/Stage2.css';
import moreStyles from '../styles/Stage4.css';
import {Context} from '../states/store';
import {CopyToClipboard} from 'react-copy-to-clipboard';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheck} from '@fortawesome/free-solid-svg-icons';

const Stage4 = () => {
    const [state, dispatch] = useContext(Context);

    const [fullURL, setFullURL] = useState(null);
    const [deleteURL, setDeleteURL] = useState(null);

    useEffect(() => {
        setFullURL(`${window.origin}/${state.response.fileUuid}#${state.password}${state.salt}`)
        setDeleteURL(`${process.env.REACT_APP_API}/delete/${state.response.deletionUuid}`);
    }, []);

    const resetStage = () => {
        dispatch({type: "SET_STAGE", payload: 1});
    }

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
                    <input className="input stage4" disabled={true} value={fullURL}/>
                    <input className="input stage4" disabled={true} value={deleteURL}/>
                    <div className="buttons stage4">
                        <CopyToClipboard text={fullURL}>
                            <button className="button create">Copy Download Link To Clipboard</button>
                        </CopyToClipboard>
                        <CopyToClipboard text={deleteURL}>
                            <button className="button create">Copy Delete Link To Clipboard</button>
                        </CopyToClipboard>
                    </div>
                    <button className="button create" onClick={resetStage}>Share New File</button>
                </div>
            </div>
        </div>

    )
}

export default Stage4;
