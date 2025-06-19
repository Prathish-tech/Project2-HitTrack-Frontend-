import React, { useEffect, useState } from "react";
import '../App.css';
import api from '../api';

export default function Learn() {
  const [shots, setShots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShots = async () => {
      try {
        setLoading(true);
        const response = await api.get('shots/');
        console.log('Shots data:', response.data); // Debug log
        setShots(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching shots:", err);
        setError("Failed to load shots. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchShots();
  }, []);

  const handleImageError = (e) => {
    console.log('Image failed to load:', e.target.src);
    e.target.src = 'https://via.placeholder.com/300x200?text=Cricket+Shot'; // Fallback image
  };

  if (loading) return <div className="learn-container"><p>Loading shots...</p></div>;
  if (error) return <div className="learn-container"><p>{error}</p></div>;

  return (
    <div className="learn-container">
      <h1 className="learn-title">Learn Cricket Shots</h1>
      <div className="card-grid">
        {shots.length === 0 ? (
          <p>No shots available. Please add some shots from the admin panel.</p>
        ) : (
          shots.map((shot, index) => (
            <div key={shot.id || index} className="card">
              <img 
                src={shot.image || 'https://via.placeholder.com/300x200?text=Cricket+Shot'} 
                alt={shot.name}
                className="card-image" 
                onError={handleImageError}
                onLoad={() => console.log('Image loaded successfully:', shot.image)}
              />
              <h2 className="card-title">{shot.name}</h2>
              <p className="card-description">{shot.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}