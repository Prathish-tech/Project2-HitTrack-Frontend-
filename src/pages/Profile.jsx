import React, { useEffect, useState } from 'react';
import '../App.css';
import api from '../api';

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('userprofile/')
      .then((res) => {
        if (res.data.length > 0) {
          setProfile(res.data[0]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
        setError('Failed to load profile data');
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!profile) return <div className="no-data">No profile data found.</div>;

  const completionPercent = Math.round(
    (profile.shotsCompleted / profile.totalShots) * 100 || 0
  );

  return (
    <div className="profile-container">
      <h1 className="profile-title">👨🏻‍💼 Player Profile</h1>
      <div className="profile-card">
        <div className="profile-info">
          <div className="info-row">
            <strong>Name:</strong> {profile.name}
          </div>
          <div className="info-row">
            <strong>Email:</strong> {profile.email}
          </div>
          <div className="info-row">
            <strong>Favorite Shot:</strong> {profile.favoriteShot}
          </div>
          <div className="info-row">
            <strong>Total Available Shots:</strong> {profile.totalShots}
          </div>
          <div className="info-row">
            <strong>Unique Shots Practiced:</strong> {profile.shotsCompleted}
          </div>
          <div className="info-row">
            <strong>Total Practice Sessions:</strong> {profile.totalPractices}
          </div>
          <div className="info-row">
            <strong>Practice Streak:</strong> {profile.streak} days
          </div>
          <div className="info-row">
            <strong>Completion Rate:</strong> {completionPercent}%
          </div>
        </div>
        
        <div className="progress-section">
          <h3>Progress Overview</h3>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${completionPercent}%` }}
            ></div>
          </div>
          <p className="progress-text">
            {profile.shotsCompleted} of {profile.totalShots} shots practiced
          </p>
        </div>
        
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-value">{profile.totalPractices}</div>
            <div className="stat-label">Total Practices</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{profile.shotsCompleted}</div>
            <div className="stat-label">Shots Mastered</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{completionPercent}%</div>
            <div className="stat-label">Completion</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{profile.streak}</div>
            <div className="stat-label">Day Streak</div>
          </div>
        </div>
      </div>
    </div>
  );
}