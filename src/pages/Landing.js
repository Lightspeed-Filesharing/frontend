import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { FileDrop } from 'react-file-drop';

// Styles
import '../styles/Landing.css';

const Landing = () => { // const [cycleIndex, setCycleIndex] = useState(0)
    const [slideText, setSlideText] = useState('secure');

    useEffect(() => {
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

    // const uploadFile = async (fileArray) => {
    //     var data = {};
    //     data.filename = 
    //     await axios.post(`${process.env.REACT_APP_API}/upload`, {
    //         data
    //     }, {
    //         headers: {
    //             "Content-Type": "application/json",
    //         }
    //     })
    // }

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
                        <FileDrop onDrop={(files, event) => console.log('onDrop!', files, event)} className="bottom">
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
