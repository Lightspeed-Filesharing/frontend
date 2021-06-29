import axios from 'axios';
import React, {useEffect, useState,useContext} from 'react';
import {Context} from '../states/store';
import Stage1 from '../components/Stage1';
import Stage2 from '../components/Stage2';
import Stage3 from '../components/Stage3';

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
                                <h1 className="title dropzone">Add your file.</h1>
                                <h2 className="subtitle dropzone">Your files will be secured with<br></br>end-to-end encryption.</h2>
                            </div>
                        </div>
                        {state.stage === 1 && <Stage1 />}
                        {state.stage === 2 && <Stage2 />}
                        {state.stage === 3 && <Stage3 />}
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
