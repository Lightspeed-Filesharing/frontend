import React, { useState, useContext, useLayoutEffect } from "react";
import { Context } from "../states/store";
import "../styles/Landing.css";
import { createKeys, decrypt, encrypt } from "../utils/encryption";
import { toHexString, fromHexString } from "../utils/conversion";

import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import Bottom from "../Styled/Bottom";

import IconGroup from "../Styled/IconGroup";

import { Direction, DirectionSmall } from "../Styled/Direction";

const Stage3 = () => {
    const [state, dispatch] = useContext(Context);

    const [loadingText, setLoadingText] = useState(
        "End-to-end encrypting your file..."
    );

    const [err, setError] = useState(false);
    const [errmsg, setErrorMessage] = useState(null);

    // const [webWorker, setWebWorker] = useState(null);

    const uploadFile = async (files) => {
        let keys;
        if (!state.key) {
            console.log("No key detected. Creating one now.");
            keys = await createKeys(state.sodium);
            console.log(keys);
            dispatch({ type: "SET_PASSWORD", payload: keys[1] });
            dispatch({ type: "SET_SALT", payload: keys[2] });
            keys = keys[0];
            dispatch({ type: "SET_KEY", payload: keys });
        } else {
            keys = state.key;
        }
        const reader = new FileReader();
        reader.onload = async function (e) {
            var data = e.target.result;
            console.log("Encrypted file.");
            const output = await encrypt(state.sodium, data, keys);
            var formData = new FormData();
            const nameOutput = await encrypt(
                state.sodium,
                files[0].name,
                keys,
                output[1]
            );
            const hexName = await toHexString(nameOutput[0]);

            const msgOutput = await encrypt(
                state.sodium,
                state.message,
                keys,
                output[1]
            );
            const hexMsg = await toHexString(msgOutput[0]);

            const typeOutput = await encrypt(
                state.sodium,
                files[0].type,
                keys,
                output[1]
            );
            const hexType = await toHexString(typeOutput[0]);

            const encryptedData = output[0];
            console.log(encryptedData);

            const nonce = await toHexString(output[1]);
            dispatch({
                type: "SET_ENCRYPTEDDATA",
                payload: [hexName, encryptedData, nonce],
            });
            setLoadingText("Uploading your file...");
            console.log(typeof encryptedData);
            formData.append("filename", hexName);
            formData.append(
                "data",
                new Blob([encryptedData], { type: "application/octet-stream" })
            );
            formData.append("nonce", nonce);
            formData.append("message", hexMsg);
            formData.append("type", hexType);
            formData.append("longLink", state.longLink);
            formData.append("deleteOnOpen", state.deleteOnOpen);
            formData.append("limitDownloads", state.limitDownloads);

            var response;

            try {
                response = await fetch(`${process.env.REACT_APP_API}/upload`, {
                    method: "POST",
                    body: formData,
                });
            } catch (err) {
                setError(true);
                return;
            }

            const responseJSON = await response.json();
            if (response.status === 200) {
                dispatch({ type: "SET_RESPONSE", payload: responseJSON.data });
                dispatch({ type: "SET_STAGE", payload: 4 });
            } else {
                setError(true);
                setErrorMessage(responseJSON.message);
                console.error(response);
                return;
            }
        };
        reader.readAsBinaryString(files[0]);
        console.log(files[0]);
    };

    useLayoutEffect(() => {
        const init = async () => {
            await uploadFile(state.files);
        };

        init();
    }, []);

    return (
        <Bottom>
            <div class="center">
                <IconGroup>
                    <Loader
                        type="Oval"
                        color="#3737FF"
                        height={100}
                        width={100}
                    />
                </IconGroup>
                <div className="textgroup">
                    <Direction style={{ textAlign: "center" }}>
                        {loadingText}
                    </Direction>
                    <DirectionSmall>Please wait.</DirectionSmall>
                </div>
            </div>
        </Bottom>
    );
};

export default Stage3;
