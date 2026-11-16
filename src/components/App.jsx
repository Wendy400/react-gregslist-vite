import { useState, useEffect } from 'react'
import Header from "./Header";
import ListingForm from "./ListingForm";
import ListingsContainer from "./ListingsContainer";

function App() {
  const [listings, setListings] = useState([])
  function listItems() {
    fetch("http://localhost:6001/listings")
      .then(r => {
        if (!r.ok) {
          throw new Error("Sorry can not display items")
        }
        return r.json()
      })
      .then((data) => setListings(data))
      .catch((error) => { console.error(`A problem occured:`, error) })
  }

  useEffect(() => {
    listItems()
  }, [])

  function addListing (newListings){
    setListings(previousListings=>
    [...previousListings, newListings]
    )
  }


  return (
    <div className="app">
      <Header />
      <ListingForm addListing={addListing} />
      <ListingsContainer listings={listings} />
    </div>
  );
}

export default App;
