import '../App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import GalleryView from '../components/GalleryView'; // Update to GalleryView
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment-timezone";

function Manage_Gallery() {
	const [sortOrder, setSortOrder] = useState('asc');
	const [sortMethod, setSortMethod] = useState('clubName');
	const [galleryList, setGalleryList] = useState([]); // Update to galleryList
	const [selectedTag, setSelectedTag] = useState('');
	const [tagList, setTagList] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const [clubName, setName] = useState(''); // Update to match gallery object structure
	const [description, setDescription] = useState(''); // Update to match gallery object structure
	const [image, setImage] = useState(null);

	function refreshPage() {
		window.location.reload();
	}

	// Read all galleries
	useEffect(() => {
		axios.get('http://localhost:8000/api/gallery') // Update to gallery endpoint
			.then(res => {
				if (selectedTag !== '') {
					setFilteredData(res.data.filter(gallery => gallery.tags.includes(selectedTag)));
				} else {
					setFilteredData(res.data);
				}
				const sortedData = filteredData.sort((a, b) => {
					// Handle sorting logic
				});
				const uniqueItems = [];
				const tags = res.data.flatMap((obj) => obj.tags);
				tags.map((tag) => {
					if (uniqueItems.indexOf(tag) === -1) {
						uniqueItems.push(tag);
					}
				});
				setTagList(uniqueItems);
				setGalleryList(sortedData); // Update to galleryList
			})
			.catch(error => console.log(error));
	}, [sortOrder, sortMethod, selectedTag, filteredData, refreshPage]);

	const handleImageChange = (event) => {
		const file = event.target.files[0];
		const reader = new FileReader();

		reader.onload = (event) => {
			const image = event.target.result;
			setImage(image);
		};

		reader.readAsDataURL(file);
	};

	// Post a gallery
	const addGalleryHandler = () => {
		axios.post('http://localhost:8000/api/gallery', { 'image': image, 'clubName': clubName, 'description': description })
		.then(res => {
		  console.log(res); // Log the response to the console
		})
		.catch(error => console.log(error));
	}
	return (
		<div className="App list-group-item justify-content-center align-items-center mx-auto" style={{ "width": "800px", "paddingTop": "120px" }}>
			<h1 className="card text-white bg-primary mb-1" style={{ "maxWidth": "20rem" }}>Gallery</h1>
			<div className="card-body">
				<h5 className="card text-white bg-dark mb-3">Add a Gallery Post</h5>
				<form onSubmit={addGalleryHandler}>
					<span className="card-text">
						<input type="text" className="mb-2 form-control nameIn" onChange={event => setName(event.target.value)} placeholder='Gallery Name' />
						<input type="text" className="mb-2 form-control desIn" onChange={event => setDescription(event.target.value)} placeholder='Description' />
						<input type="file" accept="image/*" onChange={handleImageChange} />
						<button type="submit" className="btn btn-outline-primary mx-2 mb-3" style={{ 'borderRadius': '50px', "font-weight": "bold" }}>Add Image</button>
					</span>
				</form>

				<h5 className="card text-white bg-dark mb-3">Gallery:</h5>
				<span>
					<select value={sortMethod} onChange={event => setSortMethod(event.target.value)}>
						<option value="nameAsc">Sort by name asc</option>
						<option value="nameDesc">Sort by name desc</option>
						<option value="sizeAsc">Sort by size asc</option>
						<option value="sizeDesc">Sort by size desc</option>
						<option value="Active">Sort by Active</option>
						<option value="Inactive">Sort by Inactive</option>
					</select>
				</span>
				<div>
					<GalleryView galleryList={galleryList} /> {/* Update to GalleryView */}
				</div>
			</div>
		</div>
	);
}

export default Manage_Gallery; // Update component export
