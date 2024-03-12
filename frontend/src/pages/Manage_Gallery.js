import '../App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import GalleryView from '../components/GalleryView'; // Importing GalleryView component
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment-timezone";

function Manage_Gallery() {
    // State variables using useState hook
    const [sortOrder, setSortOrder] = useState('asc');
    const [sortMethod, setSortMethod] = useState('clubName');
    const [galleryList, setGalleryList] = useState([]); // State variable for galleryList
    const [selectedTag, setSelectedTag] = useState('');
    const [tagList, setTagList] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [clubName, setName] = useState(''); // State variable for clubName
    const [description, setDescription] = useState(''); // State variable for description
    const [image, setImage] = useState(null);

    function refreshPage() {
        window.location.reload();
    }

    // Read all galleries
    useEffect(() => {
        axios.get('http://localhost:8000/api/gallery') // Fetching gallery data
            .then(res => {
                if (selectedTag !== '') {
                    setFilteredData(res.data.filter(gallery => gallery.tags.includes(selectedTag)));
                } else {
                    setFilteredData(res.data);
                }
                // Sorting the data based on sortMethod and sortOrder
                const sortedData = filteredData.sort((a, b) => {
                });
                // Extracting unique tags and updating state variables
                const uniqueItems = [];
                const tags = res.data.flatMap((obj) => obj.tags);
                tags.map((tag) => {
                    if (uniqueItems.indexOf(tag) === -1) {
                        uniqueItems.push(tag);
                    }
                });
                setTagList(uniqueItems);
                setGalleryList(sortedData); // Updating galleryList state
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
        axios.post('http://localhost:8000/api/Gallery', { 'image': image, 'clubName': clubName, 'description': description })
            .then(res => {
                console.log(res); // Log the response to the console
            })
            .catch(error => console.log(error));
    }

    // Rendering the form to add a gallery
    return (
        <div className="App list-group-item justify-content-center align-items-center mx-auto" style={{ "width": "800px", "paddingTop": "120px"}}>
            <h1 className="card text-white bg-primary mb-1" styleName="max-width: 20rem;">Post to Gallery</h1>
            <div className="card-body">
                <h5 className="card text-white bg-dark mb-3">Add a Gallery Post</h5>
                <form onSubmit={addGalleryHandler}>
                    <span className="card-text">
                        <input type="text" className="mb-2 form-control nameIn" onChange={event => setName(event.target.value)} placeholder='Club Name' />
                        <input type="text" className="mb-2 form-control desIn" onChange={event => setDescription(event.target.value)} placeholder='Description' />
                        <input type="file" accept="image/*" onChange={handleImageChange} />
                        <button className="btn btn-outline-primary mx-2 mb-3" style={{ 'borderRadius': '50px', "font-weight": "bold" }}>Add Image</button>
                    </span>
                </form>
            </div>
        </div>
    );
}

export default Manage_Gallery; // Exporting the Manage_Gallery component
