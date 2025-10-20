import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix marker icons
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const RaceMap = ({ races, loading }) => {
    const navigate = useNavigate();
    const defaultCenter = [39.8283, -98.5795];
    const mapCenter = races.length > 0 
        ? [parseFloat(races[0].latitude), parseFloat(races[0].longitude)]
        : defaultCenter;

    
    function isMoreThanXDaysAway(raceDate, days = 5) {
        const now = new Date();
        const race = new Date(raceDate);
        const diffInMs = race - now;
        const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
        
        return diffInDays > days;
    }

    const handleWeatherClick = (race) => {
    if (isMoreThanXDaysAway(race.race_date, 5)) {
        navigate('/weather-not-ready', { state: { race } });
    } else {
        window.open(`https://forecast.weather.gov/MapClick.php?lon=${race.longitude}&lat=${race.latitude}`, '_blank');
    }
};



    if (loading) {
        return <div style={{ textAlign: 'center', padding: '20px' }}>Loading map...</div>;
    }

    return (
        <div style={{ padding: '20px' }}>
            <h2>📍 Race Locations</h2>
            <MapContainer 
                center={mapCenter} 
                zoom={races.length > 0 ? 5 : 4} 
                scrollWheelZoom={true} 
                style={{ margin: '0 auto', height: '600px', width: '100%', borderRadius: '8px' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                {races.map((race) => (
                    <Marker 
                        key={race.id}
                        position={[parseFloat(race.latitude), parseFloat(race.longitude)]}
                    >
                        <Popup>
                            <div style={{ minWidth: '200px' }}>
                                <h3 style={{ margin: '0 0 10px 0' }}>{race.race_name}</h3>
                                
                                {/* Show source badge */}
                                <span style={{
                                    display: 'inline-block',
                                    padding: '2px 8px',
                                    fontSize: '12px',
                                    borderRadius: '4px',
                                    backgroundColor: race.source === 'database' ? '#007bff' : '#28a745',
                                    color: 'white',
                                    marginBottom: '10px'
                                }}>
                                    {race.source === 'database' ? 'OCR Race' : 'Running Event'}
                                </span>
                                
                                {/* {race.race_type && <p><strong>Type:</strong> {race.race_type}</p>} */}
                                {/* Update the race type display in the popup */}
                                {race.race_type && (
                                    <p>
                                        <strong>Type:</strong>{' '}
                                        {Array.isArray(race.race_type) 
                                            ? race.race_type.join(', ')  // "Ultra, Virtual"
                                            : race.race_type              // "Spartan"
                                        }
                                    </p>
                                )}
                                <p><strong>Date:</strong> {new Date(race.race_date).toLocaleDateString()}</p>
                                <p><strong>Location:</strong> {race.city}, {race.state}</p>
                                
                                {race.description && <p>{race.description}</p>}

                                
                                {race.website_url && (
                                    <a 
                                        href={race.website_url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        style={{ 
                                            display: 'inline-block',
                                            marginTop: '10px',
                                            color: '#007bff',
                                            textDecoration: 'none'
                                        }}
                                    >
                                        Event Website →
                                    </a>
                                )}

                                <p><strong>Event Weather Forecast: </strong>
                                
                                    <a 
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleWeatherClick(race);
                                        }}

                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                    Click Here
                                        </a>
                                </p>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}

export default RaceMap;
