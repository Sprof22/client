import React, { useState } from 'react';
import axios from 'axios'; // You'll need to install axios: npm install axios

interface AlgoliaCrudProps {}

const AlgoliaCrud: React.FC<AlgoliaCrudProps> = () => {
  const [createName, setCreateName] = useState<string>('');
  const [createDescription, setCreateDescription] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [updateObjectID, setUpdateObjectID] = useState<string>('');
  const [updateName, setUpdateName] = useState<string>('');
  const [updateDescription, setUpdateDescription] = useState<string>('');
  const [deleteObjectID, setDeleteObjectID] = useState<string>('');

  const ALGOLIA_APP_ID = 'YOUR_APP_ID';
  const ALGOLIA_API_KEY = 'YOUR_API_KEY';
  const ALGOLIA_INDEX_NAME = 'your_index_name';

  const createRecord = async () => {
    try {
      const object = {
        name: createName,
        description: createDescription,
      };

      await axios.post(`https://${ALGOLIA_APP_ID}-dsn.algolia.net/1/indexes/${ALGOLIA_INDEX_NAME}`, object, {
        headers: {
          'Content-Type': 'application/json',
          'X-Algolia-API-Key': ALGOLIA_API_KEY,
          'X-Algolia-Application-Id': ALGOLIA_APP_ID,
        },
      });

      console.log('Record created:', object);
    } catch (error) {
      console.error('Error creating record:', error);
    }
  };

  const searchRecords = async () => {
    try {
      const response = await axios.get(`https://${ALGOLIA_APP_ID}-dsn.algolia.net/1/indexes/${ALGOLIA_INDEX_NAME}/query`, {
        headers: {
          'X-Algolia-API-Key': ALGOLIA_API_KEY,
          'X-Algolia-Application-Id': ALGOLIA_APP_ID,
        },
        params: {
          query: searchQuery,
        },
      });

      setSearchResults(response.data.hits);
    } catch (error) {
      console.error('Error searching records:', error);
    }
  };

  const updateRecord = async () => {
    try {
      const object = {
        objectID: updateObjectID,
        name: updateName,
        description: updateDescription,
      };

      await axios.put(`https://${ALGOLIA_APP_ID}-dsn.algolia.net/1/indexes/${ALGOLIA_INDEX_NAME}/${object.objectID}`, object, {
        headers: {
          'Content-Type': 'application/json',
          'X-Algolia-API-Key': ALGOLIA_API_KEY,
          'X-Algolia-Application-Id': ALGOLIA_APP_ID,
        },
      });

      console.log('Record updated:', object);
    } catch (error) {
      console.error('Error updating record:', error);
    }
  };

  const deleteRecord = async () => {
    try {
      await axios.delete(`https://${ALGOLIA_APP_ID}-dsn.algolia.net/1/indexes/${ALGOLIA_INDEX_NAME}/${deleteObjectID}`, {
        headers: {
          'X-Algolia-API-Key': ALGOLIA_API_KEY,
          'X-Algolia-Application-Id': ALGOLIA_APP_ID,
        },
      });

      console.log('Record deleted:', deleteObjectID);
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  return (
    <div>
      <h2>Create</h2>
      <input type="text" value={createName} onChange={(e) => setCreateName(e.target.value)} placeholder="Name" />
      <input type="text" value={createDescription} onChange={(e) => setCreateDescription(e.target.value)} placeholder="Description" />
      <button onClick={createRecord}>Create</button>

      <h2>Read</h2>
      <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search Query" />
      <button onClick={searchRecords}>Search</button>
      <div className="results">
        {searchResults.map((hit) => (
          <div key={hit.objectID}>Name: {hit.name}, Description: {hit.description}</div>
        ))}
      </div>

      <h2>Update</h2>
      <input type="text" value={updateObjectID} onChange={(e) => setUpdateObjectID(e.target.value)} placeholder="Object ID" />
      <input type="text" value={updateName} onChange={(e) => setUpdateName(e.target.value)} placeholder="Updated Name" />
      <input type="text" value={updateDescription} onChange={(e) => setUpdateDescription(e.target.value)} placeholder="Updated Description" />
      <button onClick={updateRecord}>Update</button>

      <h2>Delete</h2>
      <input type="text" value={deleteObjectID} onChange={(e) => setDeleteObjectID(e.target.value)} placeholder="Object ID" />
      <button onClick={deleteRecord}>Delete</button>
    </div>
  );
};

export default AlgoliaCrud;
