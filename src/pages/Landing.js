import axios from 'axios';
import React, {useEffect, useState,useContext} from 'react';
import {Context} from '../states/store';
import Stage1 from '../components/Stage1';
import Stage2 from '../components/Stage2';
import Stage3 from '../components/Stage3';
import Stage4 from '../components/Stage4';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCode, faUserCircle} from '@fortawesome/free-solid-svg-icons';


// Styles
import '../styles/Landing.css';

const {SodiumPlus} = require('sodium-plus');
const Landing = () => { // const [cycleIndex, setCycleIndex] = useState(0)
    const [state, dispatch] = useContext(Context);

    const [slideText, setSlideText] = useState('secure');

    useEffect(() => {
        const initEncryption = async () => {
            const sodium = await SodiumPlus.auto();
            dispatch({type: "SET_SODIUM", payload: sodium});
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


    return (
        <>
            <div className="wrapper">
                <div className="dropzone-parent">

                    <div className="dropzone">
                        <div class="top">
                            <div className="titles dropzone">
                                {/* <div className="logobackground" style={{backgroundColor: "#fff", borderRadius: "40px"}}>
                                    <img src="/assets/logo/lightspeed512.png" className="logo"/>
                                </div> */}
                            </div>
                        </div>
                        {state.stage === 1 && <Stage1 />}
                        {state.stage === 2 && <Stage2 />}
                        {state.stage === 3 && <Stage3 />}
                        {state.stage === 4 && <Stage4 />}
                    </div>
                </div>
                <div className="emptyright">
                    <div className="center">
                        <div className="titles slide">
                            <img src="/assets/logo/lightspeed512.png" className="logo" draggable="false" />
                            <h1 className="title slide">Welcome to <span className="blue">Lightspeed</span>.</h1>
                            <h2 className="subtitle slide">Your <span className="blue">{slideText}</span> file-sharing companion.</h2>
                        </div>
                        <div className="icongroup">
                            <a className="link" href="https://github.com/Lightspeed-Filesharing" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faCode} size="2x" /></a>
                            <a className="link" href="https://httpjames.space" target="_blank"><FontAwesomeIcon icon={faUserCircle} size="2x" /></a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Landing;
