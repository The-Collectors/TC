import React, {useEffect, useState} from "react";
import axios from 'axios'

function GalleryItem(props) {

  const [clubName, setClubName] = useState(props.Gallery.clubName)
  const [name, setName] = useState(props.Gallery.name)
  const [desc, setDesc] = useState(props.Gallery.description)
  const [date, setDate] = useState(props.Gallery.date)
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState('');

  const handleAddTag = (name) => {
    const newTag = tag.trim();
    axios.put(`http://localhost:8000/api/club/${name}/tags/?tag=${newTag}`).then(res =>
    console.log(res.data))
  };

  const handleDeleteTag = (tag) => {
    axios.delete(`http://localhost:8000/api/club/${name}/tags/?tag=${tag}`).then(res =>
    console.log(res.data))
  };

  const deleteClubsHandler = (name) => {
    axios.delete(`http://localhost:8000/api/gallery/${name}`).then(res =>
    console.log(res.data))
  }

  //const editClubsHandler = (name) => {
    //axios.put(`http://localhost:8000/api/clubs/${name}/?desc=${desc}&size=${size}&email=${date}`).then(res =>
   // console.log(res.data))
  //}

  return (
    <div>
      <p>
        <div>
          <form onSubmit={() => handleAddTag(props.Gallery.name)}>
            <input type="text" name="tag" onChange={gallery => setTag(gallery.target.value)} placeholder="Add a tag..." />
            <button type="submit">Add</button>
          </form>
        </div>
        <span style={{ fontweight: 'bold, underline' }}>{props.Gallery.clubName} : {props.Gallery.name} : </span> {props.Gallery.description} : {props.Gallery.date} : 
          {props.Gallery.tags? (
            props.Gallery.tags.map(tag => (
              <span key={tag}> {tag} <button onClick={() => handleDeleteTag(tag)} className="btn btn-outline-danger my-2 mx-2" style={{'borderRadius':'50px',}}>X Tag</button> :</span>
            ))
          ):(<span></span>)}
        <button onClick={() => deleteClubsHandler(props.Gallery.name)} className="btn btn-outline-danger my-2 mx-2" style={{'borderRadius':'50px',}}>x</button>
        <hr></hr>
      </p>
    </div>
  )
}

export default GalleryItem