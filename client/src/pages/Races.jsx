import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import RaceMap from "../components/RaceMap";
import RaceFilters from "../components/RaceFilters";
import CreateRaceForm from "../components/CreateRaceForm";
import api from '../utils/api';
import { getUpcomingEvents } from '../services/runRegService';

const Races = () => {
    const [allRaces, setAllRaces] = useState([]);
    const [filteredRaces, setFilteredRaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showCreateForm, setShowCreateForm] = useState(false);
    
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        fetchAllRaces();
    }, []);

    const fetchAllRaces = async () => {
        try {
            const [dbRacesResponse, apiRaces] = await Promise.all([
                api.get('/race/allraces'),
                getUpcomingEvents()
            ]);

            const dbRaces = dbRacesResponse.data.map(race => ({
                ...race,
                source: 'database'
            }));

            const combinedRaces = [...dbRaces, ...apiRaces];

            console.log(`Loaded ${dbRaces.length} races from database`);
            console.log(`Loaded ${apiRaces.length} races from RunReg API`);
            console.log(`Total: ${combinedRaces.length} races`);

            setAllRaces(combinedRaces);
            setFilteredRaces(combinedRaces);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching races:', err);
            setError(err.response?.data?.error || 'Failed to fetch races');
            setLoading(false);
        }
    };

    const handleFilterChange = (filters) => {
        let filtered = [...allRaces];

        if (filters.raceType !== 'all') {
            filtered = filtered.filter(race => {
                if (!race.race_type) return false;
                if (Array.isArray(race.race_type)) {
                    return race.race_type.includes(filters.raceType);
                }
                return race.race_type === filters.raceType;
            });
        }

        if (filters.state !== 'all') {
            filtered = filtered.filter(race => race.state === filters.state);
        }

        if (filters.dateRange !== 'all') {
            const now = new Date();
            
            filtered = filtered.filter(race => {
                const raceDate = new Date(race.race_date);
                const diffInMs = raceDate - now;
                const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

                switch (filters.dateRange) {
                    case 'next7':
                        return diffInDays >= 0 && diffInDays <= 7;
                    case 'next30':
                        return diffInDays >= 0 && diffInDays <= 30;
                    case 'next60':
                        return diffInDays >= 0 && diffInDays <= 60;
                    case 'next90':
                        return diffInDays >= 0 && diffInDays <= 90;
                    case 'thisYear':
                        const endOfYear = new Date(now.getFullYear(), 11, 31);
                        return raceDate >= now && raceDate <= endOfYear;
                    default:
                        return true;
                }
            });
        }

        console.log(`Filtered from ${allRaces.length} to ${filtered.length} races`);
        setFilteredRaces(filtered);
    };

    const handleRaceCreated = (newRace) => {
        const raceWithSource = { ...newRace, source: 'database' };
        setAllRaces(prev => [...prev, raceWithSource]);
        setFilteredRaces(prev => [...prev, raceWithSource]);
        fetchAllRaces();
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '50px' }}>
                <h2>Loading races...</h2>
                <p>Fetching from database and external API...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ padding: '20px', color: 'red' }}>
                <h2>Error</h2>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
            {/* Top Navigation Bar */}
            <div style={{
                backgroundColor: 'white',
                padding: '15px 30px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                marginBottom: '20px'
            }}>
                <div style={{
                    maxWidth: '1400px',
                    margin: '0 auto',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <button
                            onClick={() => navigate('/')}
                            style={{
                                padding: '8px 16px',
                                backgroundColor: '#007bff',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '14px'
                            }}
                        >
                            🏠 Home
                        </button>
                        <span style={{ fontSize: '14px', color: '#666' }}>
                            Welcome, <strong>{user?.username}</strong>
                        </span>
                    </div>
                    <button
                        onClick={handleLogout}
                        style={{
                            padding: '8px 16px',
                            backgroundColor: '#dc3545',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '14px'
                        }}
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div style={{ padding: '0 20px 20px', maxWidth: '1400px', margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <div>
                        <h1 style={{ margin: 0 }}>🏃 Race Weather Tracker</h1>
                        <p style={{ color: '#666', marginTop: '5px', marginBottom: 0 }}>
                            Explore obstacle course races and running events with weather forecasts
                        </p>
                    </div>
                    
                    <button
                        onClick={() => setShowCreateForm(true)}
                        style={{
                            padding: '12px 24px',
                            backgroundColor: '#28a745',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}
                    >
                        ➕ Add New Race
                    </button>
                </div>
                
                <RaceFilters races={allRaces} onFilterChange={handleFilterChange} />
                
                <div style={{ 
                    marginBottom: '20px', 
                    padding: '15px', 
                    backgroundColor: '#e3f2fd', 
                    borderRadius: '8px',
                    border: '1px solid #90caf9'
                }}>
                    <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '10px'
                    }}>
                        <div>
                            <strong style={{ fontSize: '18px' }}>
                                Showing {filteredRaces.length} of {allRaces.length} races
                            </strong>
                        </div>
                        <div style={{ display: 'flex', gap: '20px', fontSize: '14px' }}>
                            <span>
                                🏔️ <strong>{filteredRaces.filter(r => r.source === 'database').length}</strong> OCR Races
                            </span>
                            <span>
                                🏃 <strong>{filteredRaces.filter(r => r.source === 'runreg').length}</strong> Running Events
                            </span>
                        </div>
                    </div>
                </div>

                {filteredRaces.length > 0 ? (
                    <RaceMap races={filteredRaces} loading={loading} />
                ) : (
                    <div style={{
                        padding: '50px',
                        textAlign: 'center',
                        backgroundColor: '#fff3cd',
                        borderRadius: '8px',
                        border: '1px solid #ffc107'
                    }}>
                        <h3>No races found matching your filters</h3>
                        <p>Try adjusting your filter settings or reset to see all races.</p>
                    </div>
                )}

                {showCreateForm && (
                    <CreateRaceForm
                        onClose={() => setShowCreateForm(false)}
                        onRaceCreated={handleRaceCreated}
                    />
                )}
            </div>
        </div>
    );
}

export default Races;


// import { useState, useEffect } from 'react';
// import RaceMap from "../components/RaceMap";
// import RaceFilters from "../components/RaceFilters";
// import CreateRaceForm from "../components/CreateRaceForm";
// import api from '../utils/api';
// import { getUpcomingEvents } from '../services/runRegService';

// const Races = () => {
//     const [allRaces, setAllRaces] = useState([]);
//     const [filteredRaces, setFilteredRaces] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [showCreateForm, setShowCreateForm] = useState(false);

//     useEffect(() => {
//         fetchAllRaces();
//     }, []);

//     const fetchAllRaces = async () => {
//         try {
//             const [dbRacesResponse, apiRaces] = await Promise.all([
//                 api.get('/race/allraces'),
//                 getUpcomingEvents()
//             ]);

//             const dbRaces = dbRacesResponse.data.map(race => ({
//                 ...race,
//                 source: 'database'
//             }));

//             const combinedRaces = [...dbRaces, ...apiRaces];

//             console.log(`Loaded ${dbRaces.length} races from database`);
//             console.log(`Loaded ${apiRaces.length} races from RunReg API`);
//             console.log(`Total: ${combinedRaces.length} races`);

//             setAllRaces(combinedRaces);
//             setFilteredRaces(combinedRaces);
//             setLoading(false);
//         } catch (err) {
//             console.error('Error fetching races:', err);
//             setError(err.response?.data?.error || 'Failed to fetch races');
//             setLoading(false);
//         }
//     };

//     const handleFilterChange = (filters) => {
//         let filtered = [...allRaces];

//         if (filters.raceType !== 'all') {
//             filtered = filtered.filter(race => {
//                 if (!race.race_type) return false;
//                 if (Array.isArray(race.race_type)) {
//                     return race.race_type.includes(filters.raceType);
//                 }
//                 return race.race_type === filters.raceType;
//             });
//         }

//         if (filters.state !== 'all') {
//             filtered = filtered.filter(race => race.state === filters.state);
//         }

//         if (filters.dateRange !== 'all') {
//             const now = new Date();
            
//             filtered = filtered.filter(race => {
//                 const raceDate = new Date(race.race_date);
//                 const diffInMs = raceDate - now;
//                 const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

//                 switch (filters.dateRange) {
//                     case 'next7':
//                         return diffInDays >= 0 && diffInDays <= 7;
//                     case 'next30':
//                         return diffInDays >= 0 && diffInDays <= 30;
//                     case 'next60':
//                         return diffInDays >= 0 && diffInDays <= 60;
//                     case 'next90':
//                         return diffInDays >= 0 && diffInDays <= 90;
//                     case 'thisYear':
//                         const endOfYear = new Date(now.getFullYear(), 11, 31);
//                         return raceDate >= now && raceDate <= endOfYear;
//                     default:
//                         return true;
//                 }
//             });
//         }

//         console.log(`Filtered from ${allRaces.length} to ${filtered.length} races`);
//         setFilteredRaces(filtered);
//     };

//     const handleRaceCreated = (newRace) => {
//         // Add the new race to the state
//         const raceWithSource = { ...newRace, source: 'database' };
//         setAllRaces(prev => [...prev, raceWithSource]);
//         setFilteredRaces(prev => [...prev, raceWithSource]);
        
//         // Re-fetch to ensure everything is in sync
//         fetchAllRaces();
//     };

//     if (loading) {
//         return (
//             <div style={{ textAlign: 'center', padding: '50px' }}>
//                 <h2>Loading races...</h2>
//                 <p>Fetching from database and external API...</p>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div style={{ padding: '20px', color: 'red' }}>
//                 <h2>Error</h2>
//                 <p>{error}</p>
//             </div>
//         );
//     }

//     return (
//         <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
//                 <div>
//                     <h1 style={{ margin: 0 }}>🏃 Race Weather Tracker</h1>
//                     <p style={{ color: '#666', marginTop: '5px', marginBottom: 0 }}>
//                         Explore obstacle course races and running events with weather forecasts
//                     </p>
//                 </div>
                
//                 {/* Create New Race Button */}
//                 <button
//                     onClick={() => setShowCreateForm(true)}
//                     style={{
//                         padding: '12px 24px',
//                         backgroundColor: '#28a745',
//                         color: 'white',
//                         border: 'none',
//                         borderRadius: '4px',
//                         cursor: 'pointer',
//                         fontSize: '16px',
//                         fontWeight: 'bold',
//                         display: 'flex',
//                         alignItems: 'center',
//                         gap: '8px',
//                         boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
//                         transition: 'background-color 0.2s'
//                     }}
//                     onMouseEnter={(e) => e.target.style.backgroundColor = '#218838'}
//                     onMouseLeave={(e) => e.target.style.backgroundColor = '#28a745'}
//                 >
//                     ➕ Add New Race
//                 </button>
//             </div>
            
//             <RaceFilters races={allRaces} onFilterChange={handleFilterChange} />
            
//             <div style={{ 
//                 marginBottom: '20px', 
//                 padding: '15px', 
//                 backgroundColor: '#e3f2fd', 
//                 borderRadius: '8px',
//                 border: '1px solid #90caf9'
//             }}>
//                 <div style={{ 
//                     display: 'flex', 
//                     justifyContent: 'space-between',
//                     alignItems: 'center',
//                     flexWrap: 'wrap',
//                     gap: '10px'
//                 }}>
//                     <div>
//                         <strong style={{ fontSize: '18px' }}>
//                             Showing {filteredRaces.length} of {allRaces.length} races
//                         </strong>
//                     </div>
//                     <div style={{ display: 'flex', gap: '20px', fontSize: '14px' }}>
//                         <span>
//                             🏔️ <strong>{filteredRaces.filter(r => r.source === 'database').length}</strong> OCR Races
//                         </span>
//                         <span>
//                             🏃 <strong>{filteredRaces.filter(r => r.source === 'runreg').length}</strong> Running Events
//                         </span>
//                     </div>
//                 </div>
//             </div>

//             {filteredRaces.length > 0 ? (
//                 <RaceMap races={filteredRaces} loading={loading} />
//             ) : (
//                 <div style={{
//                     padding: '50px',
//                     textAlign: 'center',
//                     backgroundColor: '#fff3cd',
//                     borderRadius: '8px',
//                     border: '1px solid #ffc107'
//                 }}>
//                     <h3>No races found matching your filters</h3>
//                     <p>Try adjusting your filter settings or reset to see all races.</p>
//                 </div>
//             )}

//             {/* Create Race Form Modal */}
//             {showCreateForm && (
//                 <CreateRaceForm
//                     onClose={() => setShowCreateForm(false)}
//                     onRaceCreated={handleRaceCreated}
//                 />
//             )}
//         </div>
//     );
// }

// export default Races;
