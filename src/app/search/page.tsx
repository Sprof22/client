"use client"
import React, { useState } from 'react'; // Import useState
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom'; // Import Hits component

const searchClient = algoliasearch('SHITSH8101', 'c1a6c821d09f58e251b49b035f7f8fd8');

function App() {
  const [query, setQuery] = useState(''); // State to store the search query

  return (
    <InstantSearch searchClient={searchClient} indexName="actor_index">
      <SearchBox
        onChange={(event: any) => setQuery(event.currentTarget.value)} // Update query state on input change
        // value={query}
      />
      <Hits hitComponent={HitItem} /> {/* Render the search results */}
    </InstantSearch>
  );
}

// Define a component to render each search result item
function HitItem({ hit }: any) {
  return (
    <div>
      <h2>{hit.name}</h2>
      <p>Rating: {hit.rating}</p>
      {/* <img src={imageUrl} alt={hit.name} /> */}
      <hr />
    </div>
  );
}

export default App;
