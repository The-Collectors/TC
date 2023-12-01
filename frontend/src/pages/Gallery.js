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
  // State variables using useState hook
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortMethod, setSortMethod] = useState('clubName');
  const [galleryList, setGalleryList] = useState([]);
  const [selectedTag, setSelectedTag] = useState('');
  const [tagList, setTagList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [filtered, setFiltered] = useState([]);

  // Update keyword for filtering
  const updateKey = (searchWord) => {
    setKeyword(searchWord);
  };

  // Fetch gallery data on component mount and sort alphabetically by clubName
  useEffect(() => {
    axios.get('http://localhost:8000/api/gallery').then((res) => {
      const sortedData = res.data.sort((a, b) => {
        return a.clubName.localeCompare(b.clubName);
      });
      setGalleryList(sortedData);
    });
  }, [refreshPage]); // Refreshing the page as a dependency might cause issues

  // Filter galleryList based on keyword changes
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

  // Fetch gallery data based on sort order, method, and selected tag
  useEffect(() => {
    axios.get('http://localhost:8000/api/gallery')
      .then((res) => {
        if (selectedTag !== '') {
          setFilteredData(res.data.filter((gallery) => gallery.clubName === selectedTag));
        } else {
          setFilteredData(res.data);
        }
        // Sorting the data based on sortMethod and sortOrder
        const sortedData = filteredData.sort((a, b) => {
        });
        // Extracting unique tags and updating state variables
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

  // Event handlers for sorting and tag filtering
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

  // Rendering the gallery with club information
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
      <div
        className="grid-container"
        style={{
          maxWidth: '1200px', // Set a specific width for the grid container
          margin: '0 auto', // Center the grid container horizontally
          padding: '20px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '20px',
          }}
        >
          {/* Mapping through filtered data to display club information */}
          {filtered.map((gallery) => (
            <div key={gallery.clubName} style={{ textAlign: 'center' }}>
            {/* Displaying club image or default logo */}
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
            {/* Displaying club name and description */}
            <h3>{gallery.clubName}</h3>
            <p>{gallery.description}</p>
            </div>
        ))}
      </div>
    </div>
  </div>
);
}

export default Gallery;
