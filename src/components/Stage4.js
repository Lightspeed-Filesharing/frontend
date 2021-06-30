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

    useEffect(() => {
        console.log(state.response)
        setFullURL(`${window.origin}/${state.response.fileUuid}#${state.password}${state.salt}`)
    }, [])

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
                    <div className="buttons stage4">
                        <CopyToClipboard text={fullURL}>
                            <button className="button create">Copy To Clipboard</button>
                        </CopyToClipboard>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Stage4;
