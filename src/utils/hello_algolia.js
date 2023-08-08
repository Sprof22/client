// hello_algolia.js
const algoliasearch = require('algoliasearch')

// Connect and authenticate with your Algolia app
const client = algoliasearch('SHITSH8101', '5e71825b63c0e3a3e6f2f1649f1fd870')

// Create a new index and add a record
const index = client.initIndex('test_index')
const record = { objectID: 1, name: 'test_record' }

// Save the object to the index and handle any errors
index
  .saveObject(record)
  .then(() => {
    // Search the index and print the results
    return index.search('test_record');
  })
  .then(({ hits }) => console.log(hits[0]))
  .catch(error => {
    console.error('An error occurred:', error);
  });
