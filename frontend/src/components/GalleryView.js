import GalleryItem from './Gallery'

function GalleryView(props) {
  return (
    <div>
      <ul>
        {props.galleryList.map(Gallery => <GalleryItem Gallery={Gallery} />)}
      </ul>
    </div>
  )
}

export default GalleryView