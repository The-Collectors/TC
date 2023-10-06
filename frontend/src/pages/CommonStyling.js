import styled from 'styled-components';
import Bgimg from '../image/Main_page.png';
import MainLogo from '../image/Logo.png';
import {Link} from 'react-router-dom';

export const BgDiv = styled.div`
    background-image: url(${Bgimg});
    background-repeat: repeat;
    background-position: center;
	justify-content: center;
    width: 100vw;
    height: 100vh;
    text-align: center;
`;

export const Title = styled.h1`
    font-family: 'glitch';
    color: white;
    font-size: 6em;
    text-align: center;
	margin: 1px;
`;

export const TopDownDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
`;

export const TopLinkTitle = styled.div`
	font-family: 'KodeB';
	font-size: 1.5em;
	color: #ffffff;
	text-align: center;
`;

export const TClogo = styled.img.attrs((props) => ({
	src: MainLogo,
	alt: "The Collectors Logo"
}))`
	width: 50px;
	height: 50px;
`;

export const NoUlineLink = styled(Link)`
	text-decoration: none;
`;


