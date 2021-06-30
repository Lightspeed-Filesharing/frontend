import React, {useState, useContext, useLayoutEffect} from 'react';
import {Context} from '../states/store';
import styles from '../styles/Landing.css';
import {createKeys, decrypt, encrypt} from '../utils/encryption';
import { toHexString, fromHexString } from '../utils/conversion';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import axios from 'axios';

const Stage3 = () => {
    const [state, dispatch] = useContext(Context);

    const [loadingText, setLoadingText] = useState('End-to-end encrypting your file...');

    // const [webWorker, setWebWorker] = useState(null);

    const uploadFile = async (files) => {
        let keys;
        if (!state.key) {
            console.log("No key detected. Creating one now.")
            keys = await createKeys(state.sodium);
            console.log(keys)
            dispatch({type: "SET_PASSWORD", payload: keys[1]});
            dispatch({type: "SET_SALT", payload: keys[2]})
            keys = keys[0];
            dispatch({type: "SET_KEY", payload: keys});
        } else {
            keys = state.key;
        }
        console.log(keys)
        const reader = new FileReader();
        reader.onload = async function (e) {
            var data = e.target.result;
            console.log("Encrypted file.")
            const output = await encrypt(state.sodium, data, keys);
            var formData = new FormData();
            const nameOutput = await encrypt(state.sodium, files[0].name, keys, output[1]);
            const hexName = await toHexString(nameOutput[0]);

            const msgOutput = await encrypt(state.sodium, state.message, keys, output[1]);
            const encryptedMsg = msgOutput[0];

            const encryptedData = output[0];
            console.log(encryptedData)
            // Decryption using Buffer.from() works.
            // await decrypt(state.sodium, encryptedData, output[1], keys)
            const nonce = await toHexString(output[1]);
            dispatch({
                type: "SET_ENCRYPTEDDATA",
                payload: [hexName, encryptedData, nonce]
            });
            setLoadingText('Uploading your file...')
            console.log(typeof encryptedData)
            formData.append('filename', hexName)
            formData.append('data', new Blob([encryptedData], { type: "application/octet-stream"}));
            formData.append('nonce', nonce);
            formData.append('message', encryptedMsg)
            formData.append('longLink', state.settings.longLink)
            formData.append('deleteOnOpen', state.settings.deleteOnOpen)
            formData.append('limitDownloads', state.settings.limitDownloads)
            // console.log(formData.entries())
            for(var pair of formData.entries()) {
                console.log(typeof pair[1]);
             }             
            const response = await fetch(`${process.env.REACT_APP_API}/upload`, {
                method: 'POST',
                body: formData,
                // headers: { "Content-Type": "multipart/form-data" },
            });

            console.log(response)
            if (response.status === 200) {
                const responseJSON = await response.json();
                dispatch({type: "SET_RESPONSE", payload: responseJSON.data});
                dispatch({type: "SET_STAGE", payload: 4});
            } else {
                console.error(response);
                return;
            }

        }
        reader.readAsBinaryString(files[0])
        console.log(files[0])
    }
    
    useLayoutEffect(() => {
        const init = async () => {
            await uploadFile(state.files);
        }
        // setWebWorker(new Worker(init))
        init()
    }, [])

    return (
        <div className="bottom">
            <div class="center">
                <div className="icongroup">
                    <Loader
                        type="Oval"
                        color="#3737FF"
                        height={100}
                        width={100}
                    />
                </div>
                <div className="textgroup">
                    <p className="direction" style={{textAlign: "center"}}>{loadingText}</p>
                    <p className="direction small">Please wait.</p>
                </div>
            </div>
        </div>
    )


}

export default Stage3;
