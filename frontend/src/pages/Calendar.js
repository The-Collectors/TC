import React, { useState } from 'react';
import DayBlock from '../components/DayBlock';

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
		setDate(new Date(date.getFullYear(), date.getMonth() - 1, 0));
	};

	const nextMonth = () => {
		setDate(new Date(date.getFullYear(), date.getMonth() + 1, 0));
	};

	return (
		<div className="container" style={{
			marginTop: '90px',
		}}>
			<div className="row">
				<div className="col-md-12">
					<h1>{monthsOfYear[date.getMonth()]} {date.getFullYear()}</h1>
				</div>
			</div>
			<div className="row">
				<div className="col-md-12">
					<table className="table table-bordered">
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
										const numDate = 0;
										if (trigger && day !== currentDay){
											setTrigger(false);
											return <td key={col}></td>;
										} else if (day > 0 && day <= daysInMonth) {
											return (
												<td style={{
													margine: '0px',
													padding: '0px',
												}}>
													<DayBlock CurrentDate={numDate}/>
												</td>
											);
										} else {
											return <td key={col}></td>;
										}
									})}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
			<div className="row">
				<div className="col-md-12">
					<button className="btn btn-primary mr-2" onClick={prevMonth}>
						Previous Month
					</button>
					<button className="btn btn-primary" onClick={nextMonth}>
						Next Month
					</button>
				</div>
			</div>
		</div>
	);
}

export default Calendar;

/*

							*/