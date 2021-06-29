import React, {useState, useContext} from 'react';
import {Context} from '../states/store';
import { FileDrop } from 'react-file-drop';

const Stage1 = () => {
    const [state, dispatch] = useContext(Context);
    
    const handleFile = async (files) => {
        console.log(files)
        dispatch({type: "SET_FILES", payload: files});
    }
    
    return (
        <FileDrop 
        onDrop={async (files, e) => {e.preventDefault(); handleFile(files)}}
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

    )
}

export default Stage1;