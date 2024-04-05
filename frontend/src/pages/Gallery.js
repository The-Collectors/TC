import '../App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Bgimg from './Main_page.png';
import SearchBar from '../components/SearchBar';
import logo from '../components/Logo.png';

/**
 * This page will show the list of clubs by table, and support various ways of sorting, filtering.
 */

function refreshPage() {
	window.location.reload();
}


function Gallery() {

	const [sortOrder, setSortOrder] = useState('asc');
	const [sortMethod, setSortMethod] = useState('clubName');
	const [clubList, setClubList] = useState([])
	const [selectedTag, setSelectedTag] = useState('');
	const [tagList, setTagList] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const [keyword, setKeyword] = useState('')
	const [filtered, setFiltered] = useState([])

	// set the keyword as the word we got from searchbar
	const updateKey = (searchWord) => {
		setKeyword(searchWord);
	}

	// Read all clubs
	useEffect(() => {
		axios.get('http://localhost:8000/api/Gallery')
			.then(res => {
				const sortedData = res.data.sort((a, b) => {
					return a.clubName.trim().localeCompare(b.clubName.trim());
				});
				setClubList(sortedData);
			})
	}, []);

	// When keyword is inputted at Searchbar
	/**Filters data by input, for tags, add '#' infront of each tags so users can find only tags by '#' */
	useEffect(() => {
		if (keyword === null || keyword === '') {
			setFiltered(clubList)
		} else {
			const filteredData = clubList.filter((club) =>
				`${club.clubName.toLowerCase()} ${club.description.toLowerCase()} ${club.tags.map((text) => (
					`#${text}`
				))}`.includes(keyword.toLowerCase()))
			setFiltered(filteredData)
		}
	}, [keyword, updateKey]);


	// Read all clubs, filter it, then sort it.
	useEffect(() => {
		axios.get('http://localhost:8000/api/Gallery')
			.then(res => {
				if (selectedTag !== '') {
					setFilteredData(res.data.filter(club => club.tags.includes(selectedTag)));
				} else {
					setFilteredData(res.data);
				}
				const sortedData = filteredData.sort((a, b) => {
					if (sortMethod === 'nameAsc') {
						if (sortOrder === 'asc') {
							return a.clubName.localeCompare(b.clubName);
						} else {
							return b.clubName.localeCompare(a.clubName);
						}
					} else if (sortMethod === 'nameDesc') {
						if (sortOrder === 'asc') {
							return b.clubName.localeCompare(a.clubName);
						} else {
							return a.clubName.localeCompare(b.clubName);
						}
					} else {
						return a.clubName.localeCompare(b.clubName);
					}
				});
				const uniqueItems = [];
				const tags = res.data.flatMap((obj) => obj.tags);
				tags.map((tag) => {
					if (uniqueItems.indexOf(tag) === -1) {
						uniqueItems.push(tag);
					}
				});
				setTagList(uniqueItems);
				setClubList(sortedData);
			})
			.catch(error => console.log(error));
	}, [sortOrder, sortMethod, selectedTag, filteredData]);

	// When sorting method has changed
	const handleSortMethodChange = (e) => {
		setSortMethod(e.target.value);
	}

	// When sorting order (ascending or descending) has changed
	const handleSortOrderChange = (e) => {
		setSortOrder(e.target.value);
	}

	// When tag filter has changed
	const handleTagFilter = (tag) => {
		setSelectedTag(tag);
	}

	// When tag is set as 'default' or 'none'
	const clearTagFilter = () => {
		setSelectedTag('');
	}

	return (
		<div
			className="container-fluid"
			style={{
				paddingTop: '80px',
				backgroundImage: `url(${Bgimg})`,
				backgroundRepeat: 'repeat',
				backgroundPosition: 'center',
				width: '100vw',
				height: '100vh',
				textAlign: 'center',
			}}
		>
			<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
				<SearchBar onChange={(e) => updateKey(e)} />
				<div className="form-group" style={{ marginLeft: '20px' }}>
					<label htmlFor="tag-select">Filter by Tag:</label>
					<select
						className="form-control"
						id="tag-select"
						value={selectedTag}
						onChange={(e) => setSelectedTag(e.target.value)}
					>
						<option value="">All</option>
						{tagList.map((tag, index) => (
							<option key={index} value={tag}>
								{tag}
							</option>
						))}
					</select>
				</div>
			</div>
			<div style={{
				height: '10px',
			}} />
			<div
				className="list-group-item justify-content-center align-items-center mx-auto"
				style={{
					width: '90vw',
					backgroundColor: '#ffffffa0',
					borderRadius: '10px',
					padding: '20px',
					overflowY: 'auto',
					alignContent: 'top',
					height: '75vh',
				}}
			>
				<div className="table-responsive">
					<table className="table table-striped table-hover">
						<thead>
							<tr>
								<th>

								</th>
								<th>
									<button
										type="button"
										className="btn btn-link"
										onClick={() =>
											setSortMethod(sortMethod === "nameAsc" ? "nameDesc" : "nameAsc")
										}
									>
										Name
										{sortMethod === "nameAsc" && sortOrder === "asc" && (
											<i className="fas fa-caret-up ml-2"></i>
										)}
										{sortMethod === "nameAsc" && sortOrder === "desc" && (
											<i className="fas fa-caret-down ml-2"></i>
										)}
									</button>
								</th>
								<th>
									<button
										type="button"
										className="btn btn-link"
										onClick={() =>
											setSortMethod(sortMethod === "sizeAsc" ? "sizeDesc" : "sizeAsc")
										}
									>
									</button>
								</th>
								<th>Description</th>
								<th>
									<button
										type="button"
										className="btn btn-link"
										onClick={() =>
											setSortMethod(sortMethod === "Active" ? "Inactive" : "Active")
										}
									>
									</button>
								</th>
							</tr>
						</thead>
						<tbody>
							{filtered.map((club) => (
								<tr
									key={club.name}
									style={{ cursor: "pointer" }}
								>
									<td>{club.image && <img style={{
										width: `72px`,
										height: `72px`,
									}} src={club.image} alt="uploaded image" /> || !club.image && <img style={{
										width: '72px',
										height: '72px',
									}} src={logo} />}</td>
									<td>{club.name}</td>
									<td>{club.size}</td>
									<td>{club.description}</td>
									<td>{club.email}</td>
									<td>{club.status ? "Yes" : "No"}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);

}

export default Gallery;