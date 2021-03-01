import React, {useState} from "react";
import Search from "./Search";

function Header({query, onSubmitQuery, onNewListing}) {

  const [formData, setFormData] = useState({
    description: "",
    image: "",
    location: ""
  })

  const { description, image, location } = formData

  function handleChangeSort(e){
    onSubmitQuery({sortBy: e.target.value})
  }

  function handleSubmitListing(e){
    e.preventDefault()
    onNewListing(formData)
    setFormData({
      description: "",
      image: "",
      location: ""
    })
  }

  function handleFormChange(event){
    const key = event.target.name
    const value = event.target.value
    setFormData({...formData, [key]:value })
  }

  return (
    <header>
      <h1>
        <span className="logo" role="img">
          ☮
        </span>
        gregslist
      </h1>
      <Search onSubmitQuery={onSubmitQuery}/>

      <select value={query.sortBy} onChange={handleChangeSort} >
        <option value="description">Description</option>
        <option value="location">Location</option>
      </select>
      
      <form onSubmit={handleSubmitListing}>
        <input type="text" name="description" placeholder="Description" value={description} onChange={handleFormChange}/>
        <input type="text" name="image" placeholder="Image Url" value={image} onChange={handleFormChange}/>
        <input type="text" name="location" placeholder="Location" value={location} onChange={handleFormChange}/>
        <input type="submit" value="Add Listing"/>
      </form>
    </header>
  );
}

export default Header;
