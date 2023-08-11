"use client"
import React, { useState } from 'react'; // Import useState
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom'; // Import Hits component

const searchClient = algoliasearch('SHITSH8101', 'c1a6c821d09f58e251b49b035f7f8fd8');

function App() {

  return (
    <InstantSearch searchClient={searchClient} indexName="actor_index">
      <SearchBox
      className="p-3 shadow-sm relative block w-full pl-9 pr-3 py-2 bg-white border border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 rounded-md focus:ring-1 focus:outline-none"

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


