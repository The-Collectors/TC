
import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
	realDate = new Date(),
	
}){
	const [eventList, setEventList] = useState([])

	const today = new Date(realDate.getFullYear(),realDate.getMonth(),CurrentDate).toISOString();

	useEffect(() => {
		const fetchEvents = async () => {
			try {
				const response = await axios.get(`http://localhost:8000/api/events/date/${today}`);
				setEventList(response.data);
			} catch (error) {
			}
		};

		fetchEvents();
	}, [today]);

	return (
		<Box day={CurrentDay}>
			{CurrentDate === 0 ? '' : CurrentDate}
			<EventsHolder>
				{eventList.length === 0 ? '' : `${eventList.length} events here!`}
			</EventsHolder>
		</Box>
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
	text-align: left;
	justify-content: unset;
	flex-direction: column;
	background-color: #ffffff;
	color: ${props => props.day === 1 ? 'red' : props.day === 0 ? 'blue' : 'black'};

	&:hover{
		background-color: #9f9fff;
		color: ${props => props.day === 1 ? 'red' : props.day === 0 ? 'blue' : 'white'};
	}
`;

const EventsHolder = styled.div`
	text-align: center;
	color: 'black';
`;