// Import necessary styles, libraries, and components
import '../App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import GalleryView from '../components/GalleryView';
import Bgimg from './Main_page.png';
import SearchBar from '../components/SearchBar';
import logo from '../components/Logo.png';

/**
 * This page will show the list of gallery objects by table, and support various ways of sorting, filtering.
 */

// Function to refresh the page when called
function refreshPage() {
	window.location.reload();
}

// Main functional component for the Gallery page
function Gallery() {

	// State variables for managing sorting, filtering, and data
	const [sortOrder, setSortOrder] = useState('asc');
	const [sortMethod, setSortMethod] = useState('name');
	const [galList, setGalList] = useState([]);
	const [selectedTag, setSelectedTag] = useState('');
	const [tagList, setTagList] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const [keyword, setKeyword] = useState('');
	const [filtered, setFiltered] = useState([]);

	// Update the search keyword when input changes
	const updateKey = (searchWord) => {
		setKeyword(searchWord);
	}

	// Fetch all gallery objects when the component is mounted
	useEffect(() => {
		axios.get('http://localhost:8000/api/gallery')
			.then(res => {
				// Sort the data by club name
				const sortedData = res.data.sort((a, b) => {
					return a.name.strip().localeCompare(b.name.strip());
				});
				setGalList(sortedData);
			})
	}, [refreshPage]);

	// When keyword is inputted at Searchbar, filter the data
	useEffect(() => {
		if (keyword === null || keyword === '') {
			setFiltered(galleryList);
		} else {
			// Filters data by input, including club names, descriptions, and tags
			const filteredData = galleryList.filter((gallery) =>
				`${gallery.name.toLowerCase()} ${gallery.description.toLowerCase()} ${gallery.tags.map((text) => (
					`#${text}`
				))}`.includes(keyword.toLowerCase())
			);
			setFiltered(filteredData);
		}
	}, [keyword, updateKey]);

	// Fetch all gallery objects, filter and sort them based on various criteria
	useEffect(() => {
		axios.get('http://localhost:8000/api/gallery')
			.then(res => {
				if (selectedTag !== '') {
					setFilteredData(res.data.filter(gallery => gallery.tags.includes(selectedTag)));
				} else {
					setFilteredData(res.data);
				}
				// Sort the data based on sortMethod and sortOrder
				const sortedData = filteredData.sort((a, b) => {
					// Sorting logic based on different methods
				});
				// Extract unique tags and set them in the tagList state
				const uniqueItems = [];
				const tags = res.data.flatMap((obj) => obj.tags);
				tags.map((tag) => {
					if (uniqueItems.indexOf(tag) === -1) {
						uniqueItems.push(tag);
					}
				});
				setTagList(uniqueItems);
				setGalList(sortedData);
			})
			.catch(error => console.log(error));
	}, [sortOrder, sortMethod, selectedTag, filteredData, refreshPage]);

	// Event handler for changing the sorting method
	const handleSortMethodChange = (e) => {
		setSortMethod(e.target.value);
	}

	// Event handler for changing the sorting order
	const handleSortOrderChange = (e) => {
		setSortOrder(e.target.value);
	}

	// Event handler for changing the tag filter
	const handleTagFilter = (tag) => {
		setSelectedTag(tag);
	}

	// Event handler for clearing the tag filter
	const clearTagFilter = () => {
		setSelectedTag('');
	}

	// Render the JSX content of the Gallery page
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
								<th></th>
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
								<th>Description</th>
							</tr>
						</thead>
						<tbody>
						{filtered.map((gallery) => (
							<tr
								key={gallery.name}
								style={{ cursor: "pointer" }}
							>
								<td>
								{gallery.image && <img style={{
									width: `72px`,
									height: `72px`,
								}} src={gallery.image} alt="uploaded image" /> || !gallery.image && <img style={{
									width: '72px',
									height: '72px',
								}} src={logo} />}
								</td>
								<td>{gallery.name}</td>
								<td>{gallery.description}</td>
							</tr>
							))}

						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

// Export the Gallery component
export default Gallery;
