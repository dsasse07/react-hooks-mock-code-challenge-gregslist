import React from "react";
import ListingCard from "./ListingCard";
// import ListingCard from "./ListingCard";

function ListingsContainer({listings, query, onToggleFav, onDeleteListing}) {

  const sortedListings = listings.sort( (listingA, listingB) => {
    return listingA[query.sortBy].localeCompare( listingB[query.sortBy] )
  })

  const filteredListings = sortedListings.filter( listing => {
    return listing.description.toLowerCase().includes(query.searchString.toLowerCase())
  })


  const listingComponents = filteredListings.map( listing => {
    return (
      <ListingCard 
        key ={listing.id} 
        listing={listing} 
        onToggleFav={onToggleFav}
        onDeleteListing={onDeleteListing}
      />
    )
  })


  return (
    <main>
      <ul className="cards">
        {listingComponents}
      </ul>
    </main>
  );
}

export default ListingsContainer;
