import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Bgimg from './Main_page.png';
import SearchBar from '../components/SearchBar';
import ClubCard from '../components/ClubCard';
import logo from '../components/Logo.png';

function refreshPage() {
  window.location.reload();
}

function Gallery() {
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortMethod, setSortMethod] = useState('clubName');
  const [galleryList, setGalleryList] = useState([]);
  const [selectedTag, setSelectedTag] = useState('');
  const [tagList, setTagList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [filtered, setFiltered] = useState([]);

  const updateKey = (searchWord) => {
    setKeyword(searchWord);
  };

  useEffect(() => {
    axios.get('http://localhost:8000/api/gallery').then((res) => {
      const sortedData = res.data.sort((a, b) => {
        return a.clubName.localeCompare(b.clubName);
      });
      setGalleryList(sortedData);
    });
  }, [refreshPage]);

  useEffect(() => {
    if (keyword === null || keyword === '') {
      setFiltered(galleryList);
    } else {
      const filteredData = galleryList.filter(
        (gallery) =>
          `${gallery.clubName.toLowerCase()} ${gallery.description.toLowerCase()}`.includes(
            keyword.toLowerCase()
          )
      );
      setFiltered(filteredData);
    }
  }, [keyword, updateKey]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/gallery')
      .then((res) => {
        if (selectedTag !== '') {
          setFilteredData(res.data.filter((gallery) => gallery.clubName === selectedTag));
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
        const tags = res.data.flatMap((obj) => obj.clubName);
        tags.map((tag) => {
          if (uniqueItems.indexOf(tag) === -1) {
            uniqueItems.push(tag);
          }
        });
        setTagList(uniqueItems);
        setGalleryList(sortedData);
      })
      .catch((error) => console.log(error));
  }, [sortOrder, sortMethod, selectedTag, filteredData, refreshPage]);

  const handleSortMethodChange = (e) => {
    setSortMethod(e.target.value);
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleTagFilter = (tag) => {
    setSelectedTag(tag);
  };

  const clearTagFilter = () => {
    setSelectedTag('');
  };

  return (
	<div
	  className="container-fluid"
	  style={{
		paddingTop: '80px',
		backgroundImage: `url(${Bgimg})`,
		backgroundRepeat: 'no-repeat', // Changed to no-repeat to prevent tiling
		backgroundPosition: 'center',
		backgroundSize: 'cover', // Ensures the image covers the entire container
		width: '100vw', // Adjusted to 100vw to cover full viewport width
		height: '100vh', // Ensures the container is full viewport height
		textAlign: 'center',
		position: 'fixed', // Optional: Ensures background covers the full page even on scroll
		top: 0,
		left: 0,
		zIndex: -1, // Places the background image behind all other content
	  }}
	>
	  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px', padding: '20px', zIndex: 1 }}>
		{filtered.map((gallery) => (
		  <div key={gallery.clubName} style={{ textAlign: 'center' }}>
			{gallery.image && (
			  <img
				style={{
				  width: '150px',
				  height: '150px',
				  objectFit: 'cover',
				  borderRadius: '10px',
				}}
				src={gallery.image}
				alt="uploaded image"
			  />
			)}
			{!gallery.image && (
			  <img
				style={{
				  width: '150px',
				  height: '150px',
				  objectFit: 'cover',
				  borderRadius: '10px',
				}}
				src={logo}
				alt="default logo"
			  />
			)}
			<h3>{gallery.clubName}</h3>
			<p>{gallery.description}</p>
		  </div>
		))}
	  </div>
	</div>
  );
  
}

export default Gallery;