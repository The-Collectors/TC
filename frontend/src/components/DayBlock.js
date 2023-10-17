
import React, { useState } from 'react';
import styled from "styled-components";

/**
 * 
 * @param CurrentDay The 'day' of the current date as a number.
 * ex) Monday = 0, Tuesday = 1...
 * @param CurrentDate The actual number of the current date.
 * ex) 1st, 2nd, 3rd...
 */


function DayBlock({
	CurrentDay = 0,
	CurrentDate = 0,
	
}) {
	return (
		<Box day={CurrentDay}> {CurrentDate === 0 ? '' : CurrentDate} </Box>
	)
}

export default DayBlock;

// >>styles are written here<<

const Box = styled.div`
	display: flex;
	border: none;
	margin: 0px;
	padding: 0px;
	height: 100%;
	width: 100%;
	align-items: center;
	justify-content: center;
	background-color: #ffffff;
	color: ${props => props.day === 1 ? 'red' : props.day === 0 ? 'blue' : 'black'};

	&:hover{
		background-color: #9f9fff;
		color: ${props => props.day === 1 ? 'red' : props.day === 0 ? 'blue' : 'white'};
	}
`;