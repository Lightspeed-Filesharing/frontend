import React, {useState, useEffect} from 'react';

import {useParams, useHistory} from "react-router-dom";

import axios from 'axios';

import styles from '../styles/Download.css';
import { toHexString, fromHexString } from '../utils/conversion';

import wave from '../wave.svg';

import {deriveKeys, decrypt} from "../utils/encryption";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimes, faFile} from '@fortawesome/free-solid-svg-icons';

import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const {SodiumPlus} = require('sodium-plus');

const Download = () => {
    const history = useHistory();

    const [globalUuid, setUuid] = useState(null);

    const [keySalt, setKeySalt] = useState(null);
    const [metadata, setMetadata] = useState(null);
    const [sodium, setSodium] = useState(null);
    const [sodiumKeys, setKeys] = useState(null);
    const [decryptedName, setName] = useState(null);
    const [decryptedType, setType] = useState(null);
    const [decryptedMessage, setMessage] = useState(null);

    const [err, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [errorMessageSub, setErrorMessageSub] = useState(null);

    const [showLoader, setShowLoader] = useState(true);

    const splat = useParams();
    useEffect(() => {
        var a = window.location.href;
        var localKeySalt = a.split('#')[1];
        setKeySalt(localKeySalt);

        if (!localKeySalt || localKeySalt.length < 1) {
            setError(true);
            setErrorMessage('Invalid decryption keys.');
            setErrorMessageSub('The encrypted file could not be decrypted.');
            return;
        }

        const fetchData = async () => {
            const uuid = splat.uuid;
            setUuid(uuid);
           
            var metadata;

            try {
                metadata = await axios.get(`${process.env.REACT_APP_API}/files/${uuid}`);
            } catch (err) {
                setError(true);
                setShowLoader(false);
                setErrorMessage("File not found.");
                setErrorMessageSub("Are you sure you typed the URL correctly?");
                return;
            }

            console.log(metadata.status)

            if (metadata.status === 200) {
                const metadataJSON = JSON.parse(metadata.request.response).data;
                console.log(metadataJSON);
                setMetadata(metadataJSON);
                var sodiumEngine;
                if (!sodium) {
                    sodiumEngine = await SodiumPlus.auto();
                    setSodium(sodiumEngine);
                }

                const password = localKeySalt.substring(0, 16);
                const plainSalt = localKeySalt.substring(localKeySalt.length - 16);
                var derivedOutput;
                try {
                    derivedOutput = await deriveKeys(sodiumEngine, password, plainSalt);
                } catch(err) {
                    setShowLoader(false);
                    setError(true);
                    setErrorMessage('Invalid decryption keys.');
                    setErrorMessageSub('The encrypted file could not be decrypted.');        
                    return;
                }
                setKeys(derivedOutput[0]);
                const bufferName = await fromHexString(metadataJSON.filename);
                const bufferNonce = await fromHexString(metadataJSON.nonce);
                const bufferType = await fromHexString(metadataJSON.type);
                const bufferMessage = await fromHexString(metadataJSON.message);
                setName(await decrypt(sodiumEngine, bufferName, bufferNonce, derivedOutput[0]));
                setType(await decrypt(sodiumEngine, bufferType, bufferNonce, derivedOutput[0]));
                const readableMessage = await decrypt(sodiumEngine, bufferMessage, bufferNonce, derivedOutput[0]);
                if (readableMessage) {
                    setMessage(readableMessage);
                } else {
                    setMessage(false);
                }
                setShowLoader(false);

            } else {
                console.error("Unknown error.");
                setError(true);
                setErrorMessage('An unknown error occured.');
                setErrorMessageSub('That\'s all we know at this time.');
                return;
            }

        } 

        fetchData();
    }, []);

    const handleDecrypt = async () => {
        const filedata = await axios.get(`${process.env.REACT_APP_API}/files/${globalUuid}?data=true`);
        const binary = filedata.data;

        const bufferNonce = await fromHexString(metadata.nonce);
        const decrypted =  await decrypt(sodium, binary, bufferNonce, sodiumKeys, true);

        const blob = new Blob([decrypted], {
            type: decryptedType
        });
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
    
        var url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = decryptedName;
        a.click();
        window.URL.revokeObjectURL(url);
    }

    return (
        <>
            <div className="overlay">
                <div className="overlay-child">
                    {showLoader === true &&
                    <div className="center">
                        <Loader
                            type="Oval"
                            color="#3737FF"
                            height={100}
                            width={100}
                        />
                    </div>
                }
                    {!err && !showLoader &&
                        <div className="center">
                                <div className="center-child">

                                    <div className="circle file">
                                        <FontAwesomeIcon icon={faFile} size="2x" color="white" />
                                    </div>
                                    <div className="titles error">
                                        <p className="direction error">{decryptedName}</p>
                                        <p className="direction small">You've been sent an encrypted file.</p>
                                    </div>

                                    <div className="buttons error">
                                        <button className="button create decrypt" 
                                        onClick={async () => {handleDecrypt()}}
                                        >Decrypt and Download</button>
                                    </div>
                                    {decryptedMessage !== false &&
                                    <div className="titles error">

                                        <p className="direction error">Message from Sender</p>
                                        <p className="direction small">{decryptedMessage}</p>
                                    </div>
                                    }
                                </div>
                            </div>
                    }

                    {err === true && !showLoader &&
                        <div className="center">
                            <div className="center-child">

                                <div className="circle error">
                                    <FontAwesomeIcon icon={faTimes} size="2x" color="white" />
                                </div>
                                <div className="titles error">
                                    <p className="direction error">{errorMessage}</p>
                                    <p className="direction small">{errorMessageSub}</p>
                                </div>
                                <div className="buttons error">
                                    <button className="button create decrypt" onClick={() => {history.push('/')}}>Go Back Home</button>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
            <div className="top"></div>
            <img src={wave} className="waves" />
        </>
    )
}

export default Download;
