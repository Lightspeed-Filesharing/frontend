import React, {useState, useContext, useEffect} from 'react';
import styles from '../styles/Stage2.css';
import moreStyles from '../styles/Stage4.css';
import {Context} from '../states/store';
import {CopyToClipboard} from 'react-copy-to-clipboard';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheck} from '@fortawesome/free-solid-svg-icons';

import Bottom from '../Styled/Bottom';

import styled from 'styled-components';

import IconGroup from '../Styled/IconGroup';

// Styled Components

const BottomStage4 = styled(Bottom)`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

// Components

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
        <BottomStage4>
            <div className="bottom-child">
                <div className="titles stage2">
                    <h1 className="title stage4">File Uploaded</h1>
                    {/* <h2 className="subtitle stage2"></h2> */} </div>
                <IconGroup>
                    <div className="circle stage4">
                        <FontAwesomeIcon size="lg" icon={faCheck}/>
                    </div>
                </IconGroup>
                <div className="center stage4">
                    <p className="direction" style={{textAlign: 'center'}}>Your file is ready to be securely shared.</p>
                    <p className="direction small">Copy your link below.</p>
                    <input className="input stage4" disabled={true} value={fullURL}/>
                    <CopyToClipboard text={fullURL}>
                        <button className="button create">Copy Download Link To Clipboard</button>
                    </CopyToClipboard>
                    <input className="input stage4" disabled={true} value={deleteURL}/>
                    <CopyToClipboard text={deleteURL}>
                        <button className="button create">Copy Delete Link To Clipboard</button>
                    </CopyToClipboard>
                    <button className="button create" onClick={resetStage}>Share New File</button>
                </div>
            </div>
        </BottomStage4>

    )
}

export default Stage4;
