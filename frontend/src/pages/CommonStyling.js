import React from 'react';
import styled from 'styled-components';
import Bgimg from '../image/Main_page.png';

export const BgDiv = styled.div`
    background-image: url(${Bgimg});
    background-repeat: repeat;
    background-position: center;
    width: 100vw;
    height: 100vh;
    text-align: center;
`;

export const GlitchHeader = styled.h1`
    font-family: 'glitch';
    color: white;
    font-size: 6em;
    text-align: center;
    position: 50vw;
	margin: 0;
`;

export const TopDownDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
`;

