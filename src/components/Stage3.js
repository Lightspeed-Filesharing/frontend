import React, {useState, useContext, useLayoutEffect} from 'react';
import {Context} from '../states/store';
import styles from '../styles/Landing.css';
import {createKeys, encrypt} from '../utils/encryption';
import { toHexString, fromHexString } from '../utils/conversion';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const Stage3 = () => {
    const [state, dispatch] = useContext(Context);

    const [loadingText, setLoadingText] = useState('End-to-end encrypting your file...');

    const [webWorker, setWebWorker] = useState(null);

    const uploadFile = async (files) => {
        let keys;
        if (!state.key) {
            console.log("No key detected. Creating one now.")
            keys = await createKeys(state.sodium);
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

            const encryptedData = output[0];
            console.log(encryptedData)
            const nonce = await toHexString(output[1]);
            dispatch({
                type: "SET_ENCRYPTEDDATA",
                payload: [hexName, encryptedData, nonce]
            });
            setLoadingText('Uploading your file...')
            formData.append('filename', hexName)
            formData.append('data', encryptedData);
            formData.append('nonce', nonce);
            // formData.append('settings', state.settings)

            const response = await fetch(`${process.env.REACT_APP_API}/upload`, {
                method: 'POST',
                body: formData,
            });

            console.log(response)
            if (response.status === 200) {
                dispatch({type: "SET_STAGE", payload: 4})
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
