import React, {useState, useEffect} from 'react';

import {useParams} from "react-router-dom";

import axios from 'axios';

import styles from '../styles/Download.css';

import wave from '../wave.svg';

const Download = () => {

    const [keySalt, setKeySalt] = useState(null);
    const [metadata, setMetadata] = useState(null);

    const splat = useParams();
    useEffect(() => {
        var a = window.location.href;
        var localKeySalt = a.split('#')[1];
        setKeySalt(localKeySalt);

        const fetchData = async () => {
            const uuid = splat.uuid;
            
            const metadata = await axios.get(`${process.env.REACT_APP_API}/files/${uuid}`);
            // var dataResponse = await axios.get(`${process.env.REACT_APP_API}/files/${uuid}?data=true`);
            // dataResponse = dataResponse.data
            if (metadata.status === 200) {
                const metadataJSON = JSON.parse(metadata.request.response).data;
                console.log(metadataJSON);
                setMetadata(metadataJSON);
                // console.log(dataResponse.data)
                // console.log(dataJSON)
            } else {
                console.error("File not found.")
            }

        }

        fetchData();
    }, []);

    return (
        <>
            <div className="overlay">
                <div className="overlay-child">
                    
                </div>
            </div>
            <div className="top"></div>
            <img src={wave} className="waves" />
        </>
    )
}

export default Download;
