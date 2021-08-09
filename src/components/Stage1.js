import {useContext, useRef} from 'react';
import {Context} from '../states/store';
import { FileDrop } from 'react-file-drop';

import styled from 'styled-components';

import IconGroup from '../Styled/IconGroup';

import {
    Direction,
    DirectionSmall,
} from '../Styled/Direction';

// Styled Components

const Bottom = styled(FileDrop)`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

`

const Circle = styled.div`
    height: 5rem;
    width: 5rem;
    border-radius: 50%;
    background: #3737FF;
    display: flex;
    justify-content: center;
    align-items: center;
    transition-duration: 0.3s;
    user-select: none;

    &:hover {
        cursor: pointer;
        background: #5555ff;
    }

    &:active {
        background-color: rgb(7, 7, 126);
    }
`

const Plus = styled.p`
    color: white;
    font-size: 3rem;
`

// Component

const Stage1 = () => {
    const [state, dispatch] = useContext(Context);
    const hiddenFileInput = useRef(null);

    const handleFile = async (files) => {
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
        <Bottom 
            onDrop={async (files, e) => {e.preventDefault(); handleFile(files)}}
        >
            <div class="center">
                <IconGroup>
                    <Circle onClick={async () => {handleCircleClick()}}>
                        <Plus>+</Plus>
                    </Circle>
                </IconGroup>
                <div className="textgroup">
                    <Direction>Drag and drop or click to select.</Direction>
                    <DirectionSmall>Max Size: 100 MB</DirectionSmall>
                </div>
                <input 
                    type="file" 
                    id="file-input" 
                    style={{display: "none"}}
                    ref={hiddenFileInput}
                    onChange={async (e) => {handleInputChange(e)}} />
            </div>
        </Bottom>

    )
}

export default Stage1;