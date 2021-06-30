import React, {useState, useContext} from 'react';
import {Context} from '../states/store';
import { FileDrop } from 'react-file-drop';

const Stage1 = () => {
    const [state, dispatch] = useContext(Context);
    const hiddenFileInput = React.useRef(null);

    const handleFile = async (files) => {
        console.log(files)
        dispatch({type: "SET_FILES", payload: files});
        dispatch({type: 'SET_STAGE', payload: 2})
    }

    const handleInputChange = async (e) => {
        await handleFile(e.target.files);
    }

    const handleCircleClick = async () => {
        hiddenFileInput.current.click();
    }
    
    return (
        <FileDrop 
        onDrop={async (files, e) => {e.preventDefault(); handleFile(files)}}
        // onDrop={(files, event) => console.log('onDrop!', files, event)} 
        className="bottom"
        >
            <div class="center">
                <div className="icongroup">
                    <div className="circle" onClick={async () => {handleCircleClick()}}>
                        <p className="plus">+</p>
                    </div>
                </div>
                <div className="textgroup">
                    <p className="direction">Drag and drop or click to select.</p>
                    <p className="direction small">Max Size: 100 MB</p>
                </div>
                <input type="file" id="file-input" style={{display: "none"}}
                    ref={hiddenFileInput}
                    onChange={async (e) => {handleInputChange(e)}}/>
            </div>
        </FileDrop>

    )
}

export default Stage1;