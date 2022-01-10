import React, { useEffect, useState, useContext } from "react";

import { Context } from "../states/store";

import Stage1 from "../components/Stage1";

import Stage2 from "../components/Stage2";

import Stage3 from "../components/Stage3";

import Stage4 from "../components/Stage4";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faCode, faUserCircle } from "@fortawesome/free-solid-svg-icons";

import styled from "styled-components";

import IconGroup from "../Styled/IconGroup";

// Styled Components

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    background-size: cover;
    position: absolute;
    background: #e0e0e0;
    display: flex;
    flex-direction: row;

    @media only screen and (max-width: 800px) {
        flex-direction: column-reverse;
    }
`;

const DropZoneParent = styled.div`
    height: 75%;
    width: 30rem;
    margin-left: 10rem;
    margin-top: 10rem;
    border-radius: 50px;
    background: #e0e0e0;
    box-shadow: 20px 20px 60px #bebebe, -20px -20px 60px #ffffff;

    @media only screen and (max-width: 800px) {
        margin: 0;
        width: 100%;
        height: 100%;
        border-radius: 0;
        box-shadow: none;
    }
`;

const DropZone = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;

    @media only screen and (max-width: 800px) {
        width: 100%;
        height: 100%;
    }
`;

const Top = styled.div`
    height: 30%;
    background-color: rgb(55, 55, 255);
    border-top-left-radius: 50px;
    border-bottom-right-radius: 50px;

    @media only screen and (max-width: 800px) {
        border-radius: 0;
    }
`;

const EmptyRight = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    @media only screen and (max-width: 800px) {
        height: 10%;
        margin: 0;
        display: none;
    }
`;

// Component
const { SodiumPlus } = require("sodium-plus");

const Landing = () => {
    // const [cycleIndex, setCycleIndex] = useState(0)
    const [state, dispatch] = useContext(Context);

    const [slideText, setSlideText] = useState("secure");

    useEffect(() => {
        const initEncryption = async () => {
            const sodium = await SodiumPlus.auto();
            dispatch({ type: "SET_SODIUM", payload: sodium });
        };

        initEncryption();

        console.log("Beep");

        const cycle = ["secure", "private", "reliable", "speedy"];
        var cycleIndex = 0;
        setInterval(function () {
            if (cycleIndex >= 3) {
                cycleIndex = 0;
            }
            setSlideText(cycle[cycleIndex]);
            cycleIndex += 1;
        }, 5000);
    }, []);

    return (
        <>
            <Wrapper>
                <DropZoneParent>
                    <DropZone>
                        <Top>
                            <div className="titles dropzone"></div>
                        </Top>
                        {state.stage === 1 && <Stage1 />}
                        {state.stage === 2 && <Stage2 />}
                        {state.stage === 3 && <Stage3 />}
                        {state.stage === 4 && <Stage4 />}
                    </DropZone>
                </DropZoneParent>
                <EmptyRight>
                    <div className="center">
                        <div className="titles slide">
                            <img
                                src="/assets/logo/lightspeed512.png"
                                className="logo"
                                draggable="false"
                            />
                            <h1 className="title slide">
                                Welcome to{" "}
                                <span className="blue">Lightspeed</span>.
                            </h1>
                            <h2 className="subtitle slide">
                                Your <span className="blue">{slideText}</span>{" "}
                                file-sharing companion.
                            </h2>
                        </div>
                        <IconGroup>
                            <a
                                className="link"
                                href="https://github.com/Lightspeed-Filesharing"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FontAwesomeIcon icon={faCode} size="2x" />
                            </a>
                            <a
                                className="link"
                                href="https://httpjames.space"
                                target="_blank"
                            >
                                <FontAwesomeIcon
                                    icon={faUserCircle}
                                    size="2x"
                                />
                            </a>
                        </IconGroup>
                    </div>
                </EmptyRight>
            </Wrapper>
        </>
    );
};

export default Landing;
