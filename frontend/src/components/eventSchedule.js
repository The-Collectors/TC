
import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { TopDownDiv } from './CommonStyling';

/**
 * 
 * 
 */


function EventSchedule({
	list,
}){
	return (
		<TopDownDiv>
			<TimeTable>
				{[...Array(14).keys()].map(col => {
					const hour = col + 7;
					return <th> {hour} </th>
				})}
			</TimeTable>
		</TopDownDiv>
	)
}

export default EventSchedule;

// >>styles are written here<<

const TimeTable = styled.table`
	text-align: center;
	align-items: center;
	margin: 15px;

	td, th{
		border: 1px solid;
		border-color: #cccccc;
		background-color: #ffffff;
		width: 5vw;
	}

	td{
		margin: 0px;
		padding: 0px;
	}
`;