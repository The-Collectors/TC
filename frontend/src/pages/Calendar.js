import React, { useState } from 'react';
import axios from 'axios';
import DayBlock from '../components/DayBlock';
import { BgDiv, TopDownDiv } from '../components/CommonStyling';
import styled from 'styled-components';

function Calendar() {
	const [date, setDate] = useState(new Date());
	const [trigger, setTrigger] = useState(Boolean);
	const [eventList, setEventList] = useState([]);
	const [selectedDate, setSelectedDate] = useState(new Date());

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

	const HandleClick = (Curdate) => {
		const ISODate = Curdate.toISOString();
		setSelectedDate(Curdate);

		axios.get(`http://localhost:8000/api/events/date/${ISODate}`)
			.then(res => {
				setEventList(res.data)
			})
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
											<td
												onClick = {() => HandleClick(new Date(date.getFullYear(), date.getMonth(), day))}
											>
												<DayBlock CurrentDate={day} CurrentDay={(day + firstDayOfMonth) % 7} realDate={date}/>
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
				<EventInfo>
					At {selectedDate.getFullYear()}/{selectedDate.getMonth()+1}/{selectedDate.getDate()}:<br/>
					<EventsHolder>
						{eventList.length === 0 ? 'No events here!' : eventList.length}
					</EventsHolder>
				</EventInfo>
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
	flex-direction: column;
	justify-content: unset;
`;

const CalendarDiv = styled(TopDownDiv)`
	width: 85vw;
	height: 88vh;
	position: absolute;
	bottom: 2vh;
	border-radius: 5px;
	background-color: #ffffffa0;
	margin: 0px;
	margin-top: 90px;
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
		height: 7vh;
		margin: 0px;
		padding: 0px;
	}
`;

const ButtonHolder = styled.div`
	display: flex;
	position: absolute;
	bottom: 2vh;
	width: 25vw;
	justify-content: space-evenly;
`;

const EventInfo = styled.div`
	display: flex;
	flex-direction: column;
	height: 18vh;
	width: 77vw;
	margin-top: 10px;
	justify-content: unset;
	align-items: center;

	background-color: #ffffff;
	border-radius: 10px;
	border-color: #9090ff;
	border-style: solid;
	border-width: 1px;

	-ms-overflow-style: none;
	scrollbar-width: none;
	overflow-y: scroll;

	::-webkit-scrollbar{
		display: none;
	}
`

const EventsHolder = styled.div`
	width: 100%;
`

/*

							*/