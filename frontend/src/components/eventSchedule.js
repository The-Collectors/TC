
import React from 'react';
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

						const daycheckS = StartDate.getDate() < today.getDate()
						const daycheckE = EndDate.getDate() > today.getDate()
						const timecheckS = StartDate.getDate() === today.getDate() && StartDate.getTime() <= today.getTime()
						const timecheckE = EndDate.getDate() === today.getDate() && EndDate.getTime() > today.getTime()

						return (
							<Box validity={(daycheckS && timecheckE) || (daycheckS && daycheckE) || (daycheckE && timecheckS) || (timecheckS && timecheckE)}></Box>
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
	}
`;

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
	color: ${props => props.validity === true ? 'green' : 'red'};
	background-color: ${props => props.validity === true ? 'green' : 'red'};
`;