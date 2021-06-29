import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { FileDrop } from 'react-file-drop';
import { toHexString, fromHexString } from '../utils/conversion';

// Styles
import '../styles/Landing.css';
import { createKeys, encrypt } from '../utils/encryption';
const BJSON = require('buffer-json')

const {SodiumPlus} = require('sodium-plus');
const Landing = () => { // const [cycleIndex, setCycleIndex] = useState(0)
    const [sodium, setSodium] = useState(null);
    const [sodiumKey, setKey] = useState(null);

    const [slideText, setSlideText] = useState('secure');

    useEffect(() => {
        const initEncryption = async () => {
            const sodium = await SodiumPlus.auto();
            setSodium(sodium);
        }

        initEncryption();
  
        console.log("Beep")
  
        const cycle = ['secure', 'private', 'reliable', 'speedy'];
        var cycleIndex = 0;
        setInterval(function () {
            if (cycleIndex >= 3) {
                cycleIndex = 0;
            }
            setSlideText(cycle[cycleIndex]);
            cycleIndex += 1;
        }, 5000)
    }, []);

    const handleFile = async (files) => {
        console.log(sodium)
        let keys;
        if (!sodiumKey) {
            keys = await createKeys(sodium);
            setKey(keys);
        } else {
            keys = sodiumKey;
        }
        console.log(keys)
        const reader = new FileReader();
        reader.onload = async function(e) {
            var data = e.target.result;
            const output = await encrypt(sodium, data, keys);
            var formData = new FormData();
            const nameOutput = await encrypt(sodium, files[0].name, keys, output[1]);
            const hexName = await toHexString(nameOutput[0]);
            
            const encryptedData = output[0];
            console.log(encryptedData)
            const nonce = await toHexString(output[1]);
            formData.append('filename', hexName)
            formData.append('data', encryptedData);
            formData.append('nonce', nonce);
                
            const response = await fetch(`${process.env.REACT_APP_API}/upload`, {
                method: 'POST',
                body: formData,
            });

            console.log(response)
        }
        reader.readAsBinaryString(files[0])
        console.log(files[0])
    }


    return (
        <>
            <div className="wrapper">
                <div className="dropzone-parent">

                    <div className="dropzone">
                        <div class="top">
                            <div className="titles dropzone">
                                <h1 className="title dropzone">Add your file.</h1>
                                <h2 className="subtitle dropzone">Your files will be secured with<br></br>end-to-end encryption.</h2>
                            </div>
                        </div>
                        <FileDrop 
                        onDrop={async (files) => {handleFile(files)}}
                        // onDrop={(files, event) => console.log('onDrop!', files, event)} 
                        className="bottom"
                        >
                            <div class="center">
                                <div className="icongroup">
                                    <div className="circle">
                                        <p className="plus">+</p>
                                    </div>
                                </div>
                                <div className="textgroup">
                                    <p className="direction">Drag and drop or click to select.</p>
                                    <p className="direction small">Max Size: 100 MB</p>
                                </div>
                            </div>
                        </FileDrop>
                    </div>
                </div>
                <div className="emptyright">
                    <div className="titles slide">
                        <h1 className="title slide">Welcome to <span className="blue">Lightspeed</span>.</h1>
                        <h2 className="subtitle slide">Your <span className="blue">{slideText}</span> file-sharing companion.</h2>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Landing;
