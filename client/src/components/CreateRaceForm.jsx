import { useState } from 'react';
import api from '../utils/api';

const CreateRaceForm = ({ onClose, onRaceCreated }) => {
    const [formData, setFormData] = useState({
        race_name: '',
        race_type: 'Spartan',
        race_date: '',
        latitude: '',
        longitude: '',
        city: '',
        state: '',
        address: '',
        description: '',
        website_url: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Validation
        if (!formData.race_name || !formData.race_date || !formData.latitude || !formData.longitude) {
            setError('Please fill in all required fields');
            setLoading(false);
            return;
        }

        // Validate coordinates
        const lat = parseFloat(formData.latitude);
        const lng = parseFloat(formData.longitude);
        
        if (isNaN(lat) || lat < -90 || lat > 90) {
            setError('Latitude must be between -90 and 90');
            setLoading(false);
            return;
        }
        
        if (isNaN(lng) || lng < -180 || lng > 180) {
            setError('Longitude must be between -180 and 180');
            setLoading(false);
            return;
        }

        try {
            const response = await api.post('/race/createrace', {
                ...formData,
                latitude: lat,
                longitude: lng
            });

            console.log('Race created:', response.data);
            onRaceCreated(response.data); // Notify parent component
            onClose(); // Close the modal
        } catch (err) {
            console.error('Error creating race:', err);
            setError(err.response?.data?.error || 'Failed to create race');
            setLoading(false);
        }
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
            overflow: 'auto',
            padding: '20px'
        }}>
            <div style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                padding: '30px',
                maxWidth: '600px',
                width: '100%',
                maxHeight: '90vh',
                overflow: 'auto',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h2 style={{ margin: 0 }}>➕ Create New Race</h2>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'none',
                            border: 'none',
                            fontSize: '24px',
                            cursor: 'pointer',
                            color: '#666'
                        }}
                    >
                        ✕
                    </button>
                </div>

                {error && (
                    <div style={{
                        padding: '10px',
                        backgroundColor: '#fee',
                        color: '#c00',
                        borderRadius: '4px',
                        marginBottom: '15px'
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {/* Race Name */}
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                            Race Name: <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input
                            type="text"
                            name="race_name"
                            value={formData.race_name}
                            onChange={handleChange}
                            required
                            placeholder="e.g., Spartan Beast Vermont"
                            style={{
                                width: '100%',
                                padding: '10px',
                                fontSize: '14px',
                                borderRadius: '4px',
                                border: '1px solid #ccc'
                            }}
                        />
                    </div>

                    {/* Race Type */}
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                            Race Type: <span style={{ color: 'red' }}>*</span>
                        </label>
                        <select
                            name="race_type"
                            value={formData.race_type}
                            onChange={handleChange}
                            required
                            style={{
                                width: '100%',
                                padding: '10px',
                                fontSize: '14px',
                                borderRadius: '4px',
                                border: '1px solid #ccc'
                            }}
                        >
                            <option value="Spartan">Spartan</option>
                            <option value="Tough Mudder">Tough Mudder</option>
                            <option value="Warrior Dash">Warrior Dash</option>
                            <option value="Savage Race">Savage Race</option>
                            <option value="Rugged Maniac">Rugged Maniac</option>
                            <option value="BattleFrog">BattleFrog</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    {/* Race Date */}
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                            Race Date: <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input
                            type="date"
                            name="race_date"
                            value={formData.race_date}
                            onChange={handleChange}
                            required
                            style={{
                                width: '100%',
                                padding: '10px',
                                fontSize: '14px',
                                borderRadius: '4px',
                                border: '1px solid #ccc'
                            }}
                        />
                    </div>

                    {/* Latitude & Longitude (side by side) */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                                Latitude: <span style={{ color: 'red' }}>*</span>
                            </label>
                            <input
                                type="number"
                                name="latitude"
                                value={formData.latitude}
                                onChange={handleChange}
                                required
                                step="any"
                                placeholder="e.g., 40.7128"
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    fontSize: '14px',
                                    borderRadius: '4px',
                                    border: '1px solid #ccc'
                                }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                                Longitude: <span style={{ color: 'red' }}>*</span>
                            </label>
                            <input
                                type="number"
                                name="longitude"
                                value={formData.longitude}
                                onChange={handleChange}
                                required
                                step="any"
                                placeholder="e.g., -74.0060"
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    fontSize: '14px',
                                    borderRadius: '4px',
                                    border: '1px solid #ccc'
                                }}
                            />
                        </div>
                    </div>

                    {/* City & State (side by side) */}
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '15px', marginBottom: '15px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                                City:
                            </label>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                placeholder="e.g., New York"
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    fontSize: '14px',
                                    borderRadius: '4px',
                                    border: '1px solid #ccc'
                                }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                                State:
                            </label>
                            <input
                                type="text"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                placeholder="e.g., NY"
                                maxLength="2"
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    fontSize: '14px',
                                    borderRadius: '4px',
                                    border: '1px solid #ccc',
                                    textTransform: 'uppercase'
                                }}
                            />
                        </div>
                    </div>

                    {/* Address */}
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                            Address:
                        </label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="e.g., 123 Race Street"
                            style={{
                                width: '100%',
                                padding: '10px',
                                fontSize: '14px',
                                borderRadius: '4px',
                                border: '1px solid #ccc'
                            }}
                        />
                    </div>

                    {/* Website URL */}
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                            Website URL:
                        </label>
                        <input
                            type="url"
                            name="website_url"
                            value={formData.website_url}
                            onChange={handleChange}
                            placeholder="https://www.spartan.com"
                            style={{
                                width: '100%',
                                padding: '10px',
                                fontSize: '14px',
                                borderRadius: '4px',
                                border: '1px solid #ccc'
                            }}
                        />
                    </div>

                    {/* Description */}
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                            Description:
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="3"
                            placeholder="Brief description of the race..."
                            style={{
                                width: '100%',
                                padding: '10px',
                                fontSize: '14px',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                                resize: 'vertical'
                            }}
                        />
                    </div>

                    {/* Buttons */}
                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                        <button
                            type="button"
                            onClick={onClose}
                            style={{
                                padding: '10px 20px',
                                backgroundColor: '#6c757d',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '14px'
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                padding: '10px 20px',
                                backgroundColor: loading ? '#ccc' : '#28a745',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                fontSize: '14px',
                                fontWeight: 'bold'
                            }}
                        >
                            {loading ? 'Creating...' : 'Create Race'}
                        </button>
                    </div>
                </form>

                {/* Helper text */}
                <div style={{ 
                    marginTop: '20px', 
                    padding: '10px', 
                    backgroundColor: '#e7f3ff', 
                    borderRadius: '4px',
                    fontSize: '12px',
                    color: '#0066cc'
                }}>
                    <strong>💡 Tip:</strong> Use <a href="https://www.latlong.net/" target="_blank" rel="noopener noreferrer">latlong.net</a> to find coordinates for any location.
                </div>
            </div>
        </div>
    );
};

export default CreateRaceForm;