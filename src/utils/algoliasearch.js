const algoliasearch = require('algoliasearch');
const config = require('./config'); // Load your configuration

(async () => {
  try {
    const client = algoliasearch(config.ALGOLIA_APP_ID, config.ALGOLIA_API_KEY);
    const index = client.initIndex(config.ALGOLIA_INDEX_NAME);

    // Search for records that match a specific query or criteria
    const searchResults = await index.search('your_search_query_here');

    // Extract objectID values from the hits
    const objectIDsToDelete = searchResults.hits.map(hit => hit.objectID);

    if (objectIDsToDelete.length === 0) {
      console.log('No records found to delete.');
      return;
    }

    // Delete objects by their objectIDs
    const response = await index.deleteObjects(objectIDsToDelete);

    // Wait for the deletion operation to complete
    await index.wait();

    console.log(`${response.objectIDs.length} objects deleted from the index.`);
  } catch (error) {
    console.error("Error:", error);
  }
})();
