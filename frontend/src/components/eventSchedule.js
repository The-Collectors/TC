
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from "styled-components";

/**
 * 
 * 
 */


function eventSchedule({
	today,
}){
	const [eventList, setEventList] = useState([])

	useEffect(() => {
		const fetchEvents = async () => {
			try {
				const response = await axios.get(`http://localhost:8000/api/events/date/${today}`);
				setEventList(response.data);
			} catch (error) {
			}
		};

		fetchEvents();
	}, []);

	return (
		<div></div>
	)
}

export default eventSchedule;

// >>styles are written here<<