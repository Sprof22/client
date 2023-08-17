"use client"
import React, { useEffect, useState } from 'react'
import {useParams} from "next/navigation"


interface ActorDetails {
    
    objectid: number,
    actor_name: string,
    actor_rating:number,
    image_path: string,
    alternative_name: string,
    actor_id: number
    
  }


const Actor = () => {
    const [actorDetails, setActorDetails] = useState<ActorDetails|null>(null);
    const params = useParams()
    const actorId = params?.id
 
    useEffect(() => {
        async function fetchActorDetails() {
          try {
            const response = await fetch(`http://localhost:8080/actors/${actorId}`);
            const data = await response.json();
            console.log(data)
            setActorDetails(data);
          } catch (error) {
            console.error('Error fetching actor details:', error);
          }
        }
    
        if (actorId) {
          fetchActorDetails();
        }
      }, [actorId]);
    
      if (!actorDetails) {
        return <div>Loading...</div>;
      }
    
      return (
        <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-semibold mb-4">Actor Details</h1>
          <div>
            <h2 className="text-xl font-semibold mb-2">ID: {actorDetails.objectid} {actorDetails.actor_name} </h2>
            <p className="text-gray-600 mb-1">Rating: {actorDetails.actor_rating}</p>
            {/* <img
              src={actorDetails.image_path}
              alt={actorDetails.actor_name}
              className="w-full h-auto rounded-lg shadow-md mb-2"
            /> */}
            <p className="text-gray-600 mb-1">
              Alternative Name: {actorDetails.alternative_name || 'N/A'}
            </p>
            {/* <p className="text-gray-600 mb-1">Object ID: {actorDetails.objectid}</p> */}
          </div>
        </div>
      );
    }

export default Actor