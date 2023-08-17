"use client"
import React, { useState, useEffect } from "react";

const ActorsList: React.FC = () => {
  const [actors, setActors] = useState<Actor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  interface Actor {
    actor_id: number;
    actor_name: string;
    actor_rating: number;
    image_path: string;
    alternative_name: string | null;
    actor_objectid: string;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/actors");
        const data = await response.json();
        console.log(data)
        setActors(data);
        setLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);
  

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Actors List</h2>
      <ul>
        {actors.map((actor) => (
          <li key={actor.actor_id}>{actor.actor_name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ActorsList;
