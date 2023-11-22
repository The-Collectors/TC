
import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { TopDownDiv } from './CommonStyling';

/**
 * 
 * 
 */


function EventSchedule({
	list,
	date,
}) {
	return (
		<TopDownDiv>
			<TimeTable>
				<tr>{[...Array(14).keys()].map(col => {
					const hour = col + 7;
					return (
						<th> {hour} </th>
					)
				})}</tr>
				{[...Array(14).keys()].map(col => {
					const hour = col + 7;
					const today = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour);
					return <td> {list.map(block => {
						const StartDate = new Date(block.startDate)
						const EndDate = new Date(block.endDate)

						console.log(StartDate, EndDate, today)

						return (
							<tr validity={StartDate <= today && EndDate >= today}> </tr>
						)
					})}</td>
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
		height: 25px;
	}

	td{
		margin: 0px;
		padding: 0px;
	}

	tr{
		margin: 0px;
		padding: 0px;
		width: 100%;
		height: 25px;
		background-color: ${props => props.validity === true ? 'green' : 'red'};
	}
`;