import React, { useState } from 'react';
import DayBlock from '../components/DayBlock';
import { BgDiv, TopDownDiv } from '../components/CommonStyling';
import styled from 'styled-components';

function Calendar() {
	const [date, setDate] = useState(new Date());
	const [trigger, setTrigger] = useState(Boolean);

	const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	const monthsOfYear = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

	const today = new Date();
	const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
	const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
	const currentDay = today.getDay();

	const days = [];
	for (let i = 1; i <= daysInMonth; i++) {
		days.push(i);
	}

	const prevMonth = () => {
		setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
	};

	const nextMonth = () => {
		setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
	};

	return (
		<Container>
			<CalendarDiv>
				<TitleB>{monthsOfYear[date.getMonth()]} {date.getFullYear()}</TitleB>
				<CalendarTable>
					<thead>
						<tr>
							{daysOfWeek.map(day => <th key={day}>{day}</th>)}
						</tr>
					</thead>
					<tbody>
						{[...Array(Math.ceil((firstDayOfMonth + daysInMonth) / 7)).keys()].map(row => (
							<tr key={row}>
								{[...Array(7).keys()].map(col => {
									const day = row * 7 + col - firstDayOfMonth + 1;
									if (trigger && day !== currentDay) {
										setTrigger(false);
										return <td></td>;
									} else if (day > 0 && day <= daysInMonth) {
										return (
											<td>
												<DayBlock CurrentDate={day} CurrentDay={(day + firstDayOfMonth) % 7}/>
											</td>
										);
									} else {
										return <td></td>;
									}
								})}
							</tr>
						))}
					</tbody>
				</CalendarTable>
				<ButtonHolder>
					<button className="btn btn-primary mr-2" onClick={prevMonth}>
						Previous Month
					</button>
					<button className="btn btn-primary" onClick={nextMonth}>
						Next Month
					</button>
				</ButtonHolder>
			</CalendarDiv>
		</Container>
	);
}

export default Calendar;

const Container = styled(BgDiv)`
	justify-content: space-evenly;
	flex-direction: column;
`;

const CalendarDiv = styled(TopDownDiv)`
	width: 85vw;
	height: 80vh;
	background-color: #ffffffa0;
	margin-top: 50px;
	align-items: center;
	justify-content: normal;
`;

const TitleB = styled.h1`
	color: black;
	font-size: 80px;
	font-family: 'Boulevard';
	height: 100px;
	margin: 0px;
	margin-top: 5vh;
`;

const CalendarTable = styled.table`
	text-align: center;
	margin: 25px;

	td, th{
		border: 1px solid;
		border-color: #cccccc;
		background-color: #ffffff;
		width: 11vw;
	}

	td{
		height: 6vh;
		margin: 0px;
		padding: 0px;
	}
`;

const ButtonHolder = styled.div`
	display: flex;
	position: absolute;
	bottom: 10vh;
	width: 25vw;
	justify-content: space-evenly;
`;

/*

							*/