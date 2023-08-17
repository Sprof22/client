"use client"
import React, { useState } from 'react'; // Import useState
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom'; // Import Hits component
import Link from 'next/link';

const searchClient = algoliasearch('SHITSH8101', '5e71825b63c0e3a3e6f2f1649f1fd870');

function App() {

  return (
    <InstantSearch searchClient={searchClient} indexName="actors">
      <SearchBox
      className="p-3 shadow-sm relative block w-full pl-9 pr-3 py-2 bg-white border border-slate-300 placeholder-slate-400 focus:border-sky-500 focus:ring-sky-500 rounded-md focus:ring-1 focus:outline-none"

      />
      <Hits hitComponent={HitItem} /> {/* Render the search results */}
    </InstantSearch>
  );
}

// Define a component to render each search result item
function HitItem({ hit }: any) {
  console.log(hit)
  return (
    <div>
       <Link href={`/actors/${hit.objectID}`}>
      <h2>{hit.actor_name}</h2>
      <p>Rating: {hit.actor_rating}</p>
      {/* <img src={imageUrl} alt={hit.name} /> */}
      <hr />
      </Link>
    </div>
  );
}

export default App;


