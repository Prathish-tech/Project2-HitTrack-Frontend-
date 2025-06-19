import React, { useEffect, useState } from 'react';
import api from '../api';
import '../App.css';

export default function Practice() {
  const [shots, setShots] = useState([]);
  const [selectedShot, setSelectedShot] = useState('');
  const [practices, setPractices] = useState([]);
  const [editingPractice, setEditingPractice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [shotsRes, practicesRes] = await Promise.all([
        api.get('shots/'),
        api.get('practice/')
      ]);
      setShots(shotsRes.data);
      setPractices(practicesRes.data);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!selectedShot) {
      alert('Please select a shot');
      return;
    }

    try {
      const res = await api.post('practice/', { shot_id: selectedShot });
      setPractices(prev => [...prev, res.data]);
      setSelectedShot('');
    } catch (err) {
      console.error('Add practice error:', err);
      alert('Failed to add practice');
    }
  };

  const handleDelete = async (practiceId) => {
    if (!window.confirm('Are you sure you want to delete this practice?')) {
      return;
    }

    try {
      await api.delete(`practice/${practiceId}/`);
      setPractices(prev => prev.filter(p => p.id !== practiceId));
    } catch (err) {
      console.error('Delete practice error:', err);
      alert('Failed to delete practice');
    }
  };

  const handleEdit = (practice) => {
    setEditingPractice(practice);
    setSelectedShot(practice.shot.id);
  };

  const handleUpdate = async () => {
    if (!selectedShot || !editingPractice) return;

    try {
      const res = await api.patch(`practice/${editingPractice.id}/`, { 
        shot_id: selectedShot 
      });
      setPractices(prev => 
        prev.map(p => p.id === editingPractice.id ? res.data : p)
      );
      setEditingPractice(null);
      setSelectedShot('');
    } catch (err) {
      console.error('Update practice error:', err);
      alert('Failed to update practice');
    }
  };

  const cancelEdit = () => {
    setEditingPractice(null);
    setSelectedShot('');
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="practice-container">
      <h1>🏏 Practice Your Cricket Shots</h1>
      
      <div className="input-section">
        <select
          value={selectedShot}
          onChange={e => setSelectedShot(e.target.value)}
          className="shot-select"
        >
          <option value="">-- Select Shot --</option>
          {shots.map((shot) => (
            <option key={shot.id} value={shot.id}>{shot.name}</option>
          ))}
        </select>
        
        {editingPractice ? (
          <div className="edit-buttons">
            <button onClick={handleUpdate} className="update-btn">Update</button>
            <button onClick={cancelEdit} className="cancel-btn">Cancel</button>
          </div>
        ) : (
          <button onClick={handleAdd} className="add-btn">Add Practice</button>
        )}
      </div>

      <div className="practices-section">
        <h2>Your Practices ({practices.length})</h2>
        {practices.length === 0 ? (
          <p className="no-practices">No practices recorded yet. Start practicing!</p>
        ) : (
          <div className="practices-grid">
            {practices.map((practice) => (
              <div key={practice.id} className="practice-card">
                <div className="practice-info">
                  <h3>✅ {practice.shot.name}</h3>
                  <p>{practice.shot.description}</p>
                </div>
                <div className="practice-actions">
                  <button 
                    onClick={() => handleEdit(practice)}
                    className="edit-btn"
                    disabled={editingPractice?.id === practice.id}
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(practice.id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}