import { useNavigate, useLocation } from 'react-router-dom';

const WeatherNotReady = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const race = location.state?.race;

    return (
        <div style={{ 
            padding: '50px', 
            textAlign: 'center',
            maxWidth: '600px',
            margin: '0 auto'
        }}>
            <h1>⏰ Weather Forecast Not Yet Available</h1>
            
            {race && (
                <div style={{ 
                    marginTop: '30px',
                    padding: '20px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '8px'
                }}>
                    <h2>{race.race_name}</h2>
                    <p><strong>Date:</strong> {new Date(race.race_date).toLocaleDateString()}</p>
                    <p><strong>Location:</strong> {race.city}, {race.state}</p>
                </div>
            )}

            <p style={{ marginTop: '30px', fontSize: '18px', color: '#666' }}>
                Weather forecasts are only available within 5 days of the event.
            </p>
            <p style={{ fontSize: '16px', color: '#888' }}>
                Please check back closer to race day for accurate weather information.
            </p>

            <button
                onClick={() => navigate('/races')}
                style={{
                    marginTop: '30px',
                    padding: '12px 30px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '16px'
                }}
            >
                ← Back to Race Map
            </button>
        </div>
    );
};

export default WeatherNotReady;