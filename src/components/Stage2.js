import React, { useState, useContext } from "react";
import { Context } from "../states/store";
import "../styles/Stage2.css";

import Bottom from "../Styled/Bottom";

import styled from "styled-components";

import { Direction } from "../Styled/Direction";

// Styled Components

const BottomStage2 = styled(Bottom)`
    display: inline-block;
`;

const DirectionList = styled.li`
    margin-bottom: 0;
    margin-top: 0.25rem;
    font-family: Rubik;
`;

const ButtonsStage2 = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const DirectionStage2 = styled(Direction)`
    margin-bottom: 0.5rem;
    word-break: break-all;
`;

// Component

const Stage2 = () => {
    const [state, dispatch] = useContext(Context);

    const [message, setMessage] = useState("");

    const handleCreate = () => {
        dispatch({ type: "SET_STAGE", payload: 3 });
        dispatch({ type: "SET_MESSAGE", payload: message });
    };

    return (
        <BottomStage2>
            <div className="titles stage2">
                <h1 className="title stage2">Configuration</h1>
                {/* <h2 className="subtitle stage2">Change security and privacy settings.</h2> */}
            </div>
            <div className="options">
                <div className="options-child">
                    <DirectionStage2>Message</DirectionStage2>
                    <input
                        className="input"
                        value={message}
                        onChange={(e) => {
                            setMessage(e.target.value);
                        }}
                        placeholder="Hey! This is the doc you requested."
                    ></input>
                </div>
                <hr />
                <div className="options-child check">
                    <input
                        className="checkbox"
                        type="checkbox"
                        onChange={(e) => {
                            if (e.target.checked === true) {
                                dispatch({
                                    type: "SET_LONGLINK",
                                    payload: true,
                                });
                                return;
                            }

                            dispatch({ type: "SET_LONGLINK", payload: false });
                        }}
                    ></input>
                    <Direction>Long Link</Direction>
                </div>
                <div className="options-child check">
                    <input
                        className="checkbox"
                        type="checkbox"
                        onChange={(e) => {
                            if (e.target.checked === true) {
                                dispatch({
                                    type: "SET_DELETEONOPEN",
                                    payload: true,
                                });
                                return;
                            }

                            dispatch({
                                type: "SET_DELETEONOPEN",
                                payload: false,
                            });
                        }}
                    ></input>
                    <Direction>Delete On Open</Direction>
                </div>
                <div
                    className="options-child check"
                    style={{ marginBottom: 0 }}
                >
                    <input
                        className="checkbox"
                        type="checkbox"
                        onChange={(e) => {
                            if (e.target.checked === true) {
                                dispatch({
                                    type: "SET_LIMITDOWNLOADS",
                                    payload: true,
                                });
                                return;
                            }

                            dispatch({
                                type: "SET_LIMITDOWNLOADS",
                                payload: null,
                            });
                        }}
                    ></input>
                    <Direction>Limit Downloads</Direction>
                </div>
                <hr />
                <div className="options-child">
                    <Direction>
                        <b>Attached</b>
                    </Direction>
                    <ul>
                        <DirectionList>{state.files[0].name}</DirectionList>
                    </ul>
                </div>
            </div>
            <div className="bottom stage2">
                <ButtonsStage2>
                    <button
                        className="button cancel"
                        onClick={() => {
                            dispatch({ type: "SET_STAGE", payload: 1 });
                            dispatch({ type: "SET_FILES", payload: null });
                        }}
                    >
                        Cancel
                    </button>
                    <button className="button create" onClick={handleCreate}>
                        Create Lightspeed Link
                    </button>
                </ButtonsStage2>
            </div>
        </BottomStage2>
    );
};

export default Stage2;
