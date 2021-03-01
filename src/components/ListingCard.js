import React from "react";

function ListingCard({listing, onToggleFav, onDeleteListing}) {
  const {id, description, image, location, favorite} = listing

  function handleFavorite() {
    onToggleFav(id)
  }

  function handleDelete(){
    onDeleteListing(id)
  }
  

  return (
    <li className="card">
      <div className="image">
        <span className="price">$0</span>
        <img src={image ? image : "https://via.placeholder.com/300x300"} alt={description} />
      </div>
      <div className="details">
        {favorite ? (
          <button className="emoji-button favorite active" onClick={handleFavorite}>★</button>
        ) : (
          <button className="emoji-button favorite" onClick={handleFavorite} >☆</button>
        )}
        <strong>{description}</strong>
        <span> · {location}</span>
        <button className="emoji-button delete" onClick={handleDelete}>🗑</button>
      </div>
    </li>
  );
}

export default ListingCard;
