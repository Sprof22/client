const algoliasearch = require('algoliasearch/lite') ;
const generateDummyData = require ('./fakeData');

const ALGOLIA_APP_ID = 'YourAppID';
const ALGOLIA_API_KEY = 'YourAPIKey';
const INDEX_NAME = 'your_index_name';

const client = algoliasearch('SHITSH8101', '5e71825b63c0e3a3e6f2f1649f1fd870')
const index = client.initIndex(dev_wdat);

(async () => {
  const dummyData = generateDummyData(10); // Generate 10 records

  try {
    const { objectIDs } = await index.saveObjects(dummyData);
    console.log(`Data pushed to Algolia with objectIDs: ${objectIDs}`);
  } catch (error) {
    console.error('Error pushing data to Algolia', error);
  }
})();