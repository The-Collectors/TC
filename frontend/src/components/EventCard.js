
/**
 * @param eventName The name of the events
 * @param eventDate Date or duaration of the events 
 * 
 */

function EventCard({
	eventName,
	eventDate,
	shadow = true,
	...props
}){
	return (
		<div
			className="card-business"
			style={{
				background: "#fff",
				width: "65vw",
				borderRadius: "5px",
				margin: "5px",
				boxShadow: shadow !== false ? "#9E9E9E 0px 0px 10px" : "",
				...style
			}}
			{...props}
		>
			<div
				style={{
					background: headerBg,
					height: "35px",
					paddingTop: "5px",
					paddingBottom: "5px",
					position: "relative",
					borderTopRightRadius: "5px",
					borderTopLeftRadius: "5px",
					...headerStyle
				}}
			>
				{/*https://pbs.twimg.com/profile_images/1215572708336865280/_8lVTX2z_400x400.jpg*/}
				<h1
					style={{
						fontSize: "16pt",
						margin: 0,
						marginLeft: 80,
						color: headerColor,
						textAlign: 'left',
					}}
				>
					{clubname.name}
				</h1>
			</div>
			<table className="table table-striped table-hover" style={{
				fontSize: '12pt',
				listStyle: 'none',
				lineHeight: '15pt',
				marginLeft: '5px',
				marginTop: '5px',
				textAlign: 'left',
				width: '87%',
			}}>
				<tr>
					<td rowSpan="5" style={{
						verticalAlign: 'top',
						height: '100px',
					}}>
						{clubname.image && <img style={{
							width: `72px`,
							height: `72px`,
						}} src={clubname.image} alt="uploaded image" /> || !clubname.image && <img style={{
							width: '72px',
							height: '72px',
						}} src={logo} />}
					</td>
				</tr>
				<tr style={{
					paddingTop: "5px",
				}}>
					<th style={{
						width: '80pt',
					}}> Members: </th>
					<td style={{
						width: '40pt',
						height: '17pt',
					}}> {clubname.size} </td>
					<td rowSpan="2" style={{
						borderLeft: "1px solid #aaaaaa",
						paddingLeft: "10px"
					}}> {clubname.description} </td>
				</tr>
				<tr style={{
					paddingBottom: "5px",
				}}>
					<th style={{
						verticalAlign: "top",
					}}> Activated: </th>
					<td style={
						clubname.status ? { verticalAlign: "top", color: 'green' } : { verticalAlign: "top", color: 'red' }
					}> ● </td>
				</tr>
				<tr style={{
					borderTop: "1px solid #aaaaaa",
					paddingTop: "5px",
					paddingBottom: "5px",
				}}>
					<th style={{
						height: '17pt',
					}}> Contact: </th>
					<td colSpan="2"> {clubname.email && clubname.email}</td>
				</tr>
				<tr style={{
					borderTop: "1px solid #aaaaaa",
					paddingTop: "5px",
					paddingBottom: "15px",
				}}>
					<th style={{
						height: '17pt',
					}}> tags: </th>
					<td colSpan="2"> {clubname.tags && clubname.tags.length > 0 && (
						<li style={{
							padding: 0,
							margin: 0,
						}}>
							{clubname.tags.map((text) => (
								<span style={{ marginRight: 5 }}> #{text.toUpperCase()} </span>
							))}
						</li>
					)}
					</td>
				</tr>
			</table>
		</div>
	)
}

export default EventCard;

