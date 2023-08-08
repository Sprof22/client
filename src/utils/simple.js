const algoliasearch = require('algoliasearch');

// Connect and authenticate with your Algolia app
const client = algoliasearch('SHITSH8101', '5e71825b63c0e3a3e6f2f1649f1fd870');

// Create a new index and add a record
const index = client.initIndex('actor_index');
const newObjects = require("../app/data/actors.json");

(async () => {
  try {
    // Save new objects to the index and wait for the operation to complete
    await index.saveObjects(newObjects).wait();
    console.log("Objects added to index and indexing completed.");

    // Search the index and print the results
    const searchResults = await index.search('Tony');
    console.log(searchResults.hits[0]);
  } catch (error) {
    console.error("Error:", error);
  }
})();
