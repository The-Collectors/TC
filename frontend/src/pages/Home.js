import '../App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBar from '../components/SearchBar';
import ClubCard from '../components/ClubCard';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { BgDiv } from './CommonStyling';

//function refreshPage() {
//	window.location.reload();
//} << not used, but when needed, just un-comment it.

function Home() {

	const [List, setList] = useState([])
	const [keyword, setKeyword] = useState('')
	const [filtered, setFiltered] = useState([])
	const navigate = useNavigate();

	// set the keyword as the word we got from searchbar
	const updateKey = (searchWord) => {
		setKeyword(searchWord)
	}

	const handleClubClick = (name) => {
		axios.get(`http://localhost:8000/api/clubs/${name}`)
			.then(res => {
				// navigate to club page if the name is found in the club API
				navigate(`/clubpage/${name}`);
			})
			.catch(() => {
				axios.get(`http://localhost:8000/api/orgs/${name}`)
					.then(res => {
						// navigate to organization page if the name is found in the organization API
						navigate(`/orgspage/${name}`);
					})
					.catch(() => {
						// display an error message or handle the case where the name is not found in either API
					})
			})
	};


	// Read all clubss
	useEffect(() => {
		axios.get('http://localhost:8000/api/clubsorgs')
			.then(res => {
				const sortedData = res.data.sort((a, b) => {
					return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
				});
				setList(sortedData);
			})
	}, []);

	// When keyword is inputted at Searchbar
	useEffect(() => {
		if (keyword === null || keyword === '') {
			setFiltered(List)
		} else { /**Filters data by input, for tags, add '#' infront of each tags so users can find only tags by '#' */
			const filteredData = List.filter((club) =>
				`${club.name.toLowerCase()} ${club.description.toLowerCase()} ${club.tags.map((text) => (
					`#${text.toLowerCase()}`
				))}`.includes(keyword.toLowerCase()))
			setFiltered(filteredData)
		}
	}, [List, keyword]);


	return (
		<BgDiv>
			<div className="App list-group-item justify-content-center align-items-center mx-auto" style={{
				width: "70vw",
				paddingTop: "100px",
				justifyContent: 'center',
			}}>
				<Welcome> HELLO AND WELCOME </Welcome>
				<Subscript>FIND ALL RPI CLUBS AND ORGANIZATIONS HERE</Subscript>
				<div style={{
					paddingTop: '1.5vh',
					justifyContent: 'center',
					alignContent: 'center',
				}}>
					<SearchBar onChange={(e) => updateKey(e)} /> {/** When searchbar's input has changed, call updateKey */}
					<div style={{
						height: '10px',
					}} />
					<div style={{
						padding: '20px',
						backgroundColor: '#ffffffa0',
						borderRadius: '10px',
						width: '100%',
						height: '60vh',
						alignContent: 'top',
						overflowY: 'auto',
					}}>
						{filtered.map(it => (
							<tr
								key={it.name}
								onClick={() => handleClubClick(it.name)}
								style={{ cursor: "pointer" }}
							>
								<td>
									<ul style={{
										margin: 20,
										listStyle: "none",
									}}>
										<ClubCard clubname={it} />
									</ul>
								</td>
							</tr>
						))}
						<style>
							{`
            @import url('https://fonts.googleapis.com/css?family=Quicksand&display=swap');
            .card-business * {
              font-family:  'Quicksand',sans-serif;
            }
            `}
						</style>
					</div>
				</div>
			</div>
		</BgDiv>
	);
}

export default Home;

// >>styles are written here<<

const Welcome = styled.h1`
	font-family: 'wordclock';
	padding: 0px;
	margin: 5px;
	color: #9fafff;
	font-size: 72px;
`;

const Subscript = styled.h6`
	font-family: 'wordclock';
	padding: 0px;
	margin: 5px;
	color: #000000;
	font-size: 24px;
`;
