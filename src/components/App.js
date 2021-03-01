import React, {useState, useEffect} from "react";
import Header from "./Header";
import ListingsContainer from "./ListingsContainer";

function App() {
  const [listings, setListings] = useState([])
  const [query, setQuery] = useState({
    searchString: "",
    sortBy: "description"
  })


  useEffect(()=>{

    fetch('http://localhost:6001/listings')
      .then( response => response.json() )
      .then( listings => {
        const listingsWithFavorites = listings.map( listing => {
          return {...listing, favorite: false}
        })
        setListings(listingsWithFavorites)
      })
  },[])

  function handleToggleFavorite(id){
    const updatedListings = listings.map( listing => {
      if (listing.id !== id) return listing
      return {...listing, favorite: !listing.favorite}
    })
    setListings(updatedListings)
  }

  function handleDeleteListing(id){
    fetch(`http://localhost:6001/listings/${id}`, {method:"DELETE"})
    
    const updatedListings = listings.filter( listing => {
      return listing.id !== id
    })
    setListings(updatedListings)
  }

  function handleSubmitQuery(queryChange){
    setQuery({...query, ...queryChange})
  }

  function handleNewListing(listingData){

    const postConfig = {
      method:"POST",
      headers: {
        "Content-type":"application/json"
      },
      body: JSON.stringify( listingData )
    }

    fetch(`http://localhost:6001/listings`, postConfig)
      .then( response => response.json() )
      .then( newListingData => {
        setListings([...listings, newListingData])
      })
  }
  
  return (
    <div className="app">
      <Header onSubmitQuery={handleSubmitQuery} query={query} onNewListing={handleNewListing} />
      <ListingsContainer 
        listings={listings}
        query={query}  
        onToggleFav = {handleToggleFavorite}
        onDeleteListing = {handleDeleteListing}
      />
    </div>
  );
}

export default App;
