import { useState } from 'react';

const RaceFilters = ({ races, onFilterChange }) => {
    const [filters, setFilters] = useState({
        raceType: 'all',
        state: 'all',
        dateRange: 'all'
    });

    // Flatten race types from arrays and get unique values
    const getAllRaceTypes = () => {
        const typesSet = new Set();
        
        races.forEach(race => {
            if (race.race_type) {
                // If it's an array (from API), add each type
                if (Array.isArray(race.race_type)) {
                    race.race_type.forEach(type => typesSet.add(type));
                } else {
                    // If it's a string (from database), add it directly
                    typesSet.add(race.race_type);
                }
            }
        });
        
        return ['all', ...Array.from(typesSet).sort()];
    };

    const raceTypes = getAllRaceTypes();
    
    // Get unique states
    const states = ['all', ...new Set(races.map(r => r.state).filter(Boolean).sort())];

    // Count races for each type (including array values)
    const getRaceTypeCount = (type) => {
        if (type === 'all') return races.length;
        
        return races.filter(race => {
            if (!race.race_type) return false;
            
            if (Array.isArray(race.race_type)) {
                return race.race_type.includes(type);
            }
            return race.race_type === type;
        }).length;
    };

    const handleFilterChange = (filterName, value) => {
        const newFilters = { ...filters, [filterName]: value };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    const resetFilters = () => {
        const defaultFilters = {
            raceType: 'all',
            state: 'all',
            dateRange: 'all'
        };
        setFilters(defaultFilters);
        onFilterChange(defaultFilters);
    };

    return (
        <div style={{
            padding: '20px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            marginBottom: '20px',
            border: '1px solid #dee2e6'
        }}>
            <h3 style={{ marginTop: 0, marginBottom: '20px' }}>🔍 Filter Races</h3>
            
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '15px',
                marginBottom: '15px'
            }}>
                {/* Race Type Filter */}
                <div>
                    <label style={{ 
                        display: 'block', 
                        marginBottom: '5px', 
                        fontWeight: 'bold',
                        fontSize: '14px'
                    }}>
                        Race Type:
                    </label>
                    <select
                        value={filters.raceType}
                        onChange={(e) => handleFilterChange('raceType', e.target.value)}
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '4px',
                            border: '1px solid #ced4da',
                            fontSize: '14px',
                            cursor: 'pointer'
                        }}
                    >
                        <option value="all">All Types ({races.length})</option>
                        {raceTypes.filter(type => type !== 'all').map(type => (
                            <option key={type} value={type}>
                                {type} ({getRaceTypeCount(type)})
                            </option>
                        ))}
                    </select>
                </div>

                {/* State Filter */}
                <div>
                    <label style={{ 
                        display: 'block', 
                        marginBottom: '5px', 
                        fontWeight: 'bold',
                        fontSize: '14px'
                    }}>
                        State:
                    </label>
                    <select
                        value={filters.state}
                        onChange={(e) => handleFilterChange('state', e.target.value)}
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '4px',
                            border: '1px solid #ced4da',
                            fontSize: '14px',
                            cursor: 'pointer'
                        }}
                    >
                        <option value="all">All States ({states.length - 1})</option>
                        {states.filter(state => state !== 'all').map(state => {
                            const count = races.filter(r => r.state === state).length;
                            return (
                                <option key={state} value={state}>
                                    {state} ({count})
                                </option>
                            );
                        })}
                    </select>
                </div>

                {/* Date Range Filter */}
                <div>
                    <label style={{ 
                        display: 'block', 
                        marginBottom: '5px', 
                        fontWeight: 'bold',
                        fontSize: '14px'
                    }}>
                        Date Range:
                    </label>
                    <select
                        value={filters.dateRange}
                        onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '4px',
                            border: '1px solid #ced4da',
                            fontSize: '14px',
                            cursor: 'pointer'
                        }}
                    >
                        <option value="all">All Dates</option>
                        <option value="next7">Next 7 Days</option>
                        <option value="next30">Next 30 Days</option>
                        <option value="next60">Next 60 Days</option>
                        <option value="next90">Next 90 Days</option>
                        <option value="thisYear">Rest of This Year</option>
                    </select>
                </div>
            </div>

            <button
                onClick={resetFilters}
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#6c757d',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#5a6268'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#6c757d'}
            >
                🔄 Reset All Filters
            </button>
        </div>
    );
};

export default RaceFilters;







// import { useState } from 'react';

// const RaceFilters = ({ races, onFilterChange }) => {
//     const [filters, setFilters] = useState({
//         raceType: 'all',
//         state: 'all',
//         dateRange: 'all'
//     });

//     // Get unique race types (filter out null/undefined)
//     const raceTypes = ['all', ...new Set(races.map(r => r.race_type).filter(Boolean))];
    
//     // Get unique states (filter out null/undefined and sort alphabetically)
//     const states = ['all', ...new Set(races.map(r => r.state).filter(Boolean).sort())];

//     const handleFilterChange = (filterName, value) => {
//         const newFilters = { ...filters, [filterName]: value };
//         setFilters(newFilters);
//         onFilterChange(newFilters);
//     };

//     const resetFilters = () => {
//         const defaultFilters = {
//             raceType: 'all',
//             state: 'all',
//             dateRange: 'all'
//         };
//         setFilters(defaultFilters);
//         onFilterChange(defaultFilters);
//     };

//     return (
//         <div style={{
//             padding: '20px',
//             backgroundColor: '#f8f9fa',
//             borderRadius: '8px',
//             marginBottom: '20px',
//             border: '1px solid #dee2e6'
//         }}>
//             <h3 style={{ marginTop: 0, marginBottom: '20px' }}>🔍 Filter Races</h3>
            
//             <div style={{
//                 display: 'grid',
//                 gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
//                 gap: '15px',
//                 marginBottom: '15px'
//             }}>
//                 {/* Race Type Filter */}
//                 <div>
//                     <label style={{ 
//                         display: 'block', 
//                         marginBottom: '5px', 
//                         fontWeight: 'bold',
//                         fontSize: '14px'
//                     }}>
//                         Race Type:
//                     </label>
//                     <select
//                         value={filters.raceType}
//                         onChange={(e) => handleFilterChange('raceType', e.target.value)}
//                         style={{
//                             width: '100%',
//                             padding: '10px',
//                             borderRadius: '4px',
//                             border: '1px solid #ced4da',
//                             fontSize: '14px',
//                             cursor: 'pointer'
//                         }}
//                     >
//                         <option value="all">All Types ({races.length})</option>
//                         {raceTypes.filter(type => type !== 'all').map(type => {
//                             const count = races.filter(r => r.race_type === type).length;
//                             return (
//                                 <option key={type} value={type}>
//                                     {type} ({count})
//                                 </option>
//                             );
//                         })}
//                     </select>
//                 </div>

//                 {/* State Filter */}
//                 <div>
//                     <label style={{ 
//                         display: 'block', 
//                         marginBottom: '5px', 
//                         fontWeight: 'bold',
//                         fontSize: '14px'
//                     }}>
//                         State:
//                     </label>
//                     <select
//                         value={filters.state}
//                         onChange={(e) => handleFilterChange('state', e.target.value)}
//                         style={{
//                             width: '100%',
//                             padding: '10px',
//                             borderRadius: '4px',
//                             border: '1px solid #ced4da',
//                             fontSize: '14px',
//                             cursor: 'pointer'
//                         }}
//                     >
//                         <option value="all">All States ({states.length - 1})</option>
//                         {states.filter(state => state !== 'all').map(state => {
//                             const count = races.filter(r => r.state === state).length;
//                             return (
//                                 <option key={state} value={state}>
//                                     {state} ({count})
//                                 </option>
//                             );
//                         })}
//                     </select>
//                 </div>

//                 {/* Date Range Filter */}
//                 <div>
//                     <label style={{ 
//                         display: 'block', 
//                         marginBottom: '5px', 
//                         fontWeight: 'bold',
//                         fontSize: '14px'
//                     }}>
//                         Date Range:
//                     </label>
//                     <select
//                         value={filters.dateRange}
//                         onChange={(e) => handleFilterChange('dateRange', e.target.value)}
//                         style={{
//                             width: '100%',
//                             padding: '10px',
//                             borderRadius: '4px',
//                             border: '1px solid #ced4da',
//                             fontSize: '14px',
//                             cursor: 'pointer'
//                         }}
//                     >
//                         <option value="all">All Dates</option>
//                         <option value="next5">Next 5 Days (Weather Available!)</option>
//                         <option value="next7">Next 7 Days</option>
//                         <option value="next30">Next 30 Days</option>
//                         <option value="next60">Next 60 Days</option>
//                         <option value="next90">Next 90 Days</option>
//                         <option value="thisYear">Rest of This Year</option>
//                     </select>
//                 </div>
//             </div>

//             <button
//                 onClick={resetFilters}
//                 style={{
//                     padding: '10px 20px',
//                     backgroundColor: '#6c757d',
//                     color: 'white',
//                     border: 'none',
//                     borderRadius: '4px',
//                     cursor: 'pointer',
//                     fontSize: '14px',
//                     fontWeight: 'bold',
//                     transition: 'background-color 0.2s'
//                 }}
//                 onMouseEnter={(e) => e.target.style.backgroundColor = '#5a6268'}
//                 onMouseLeave={(e) => e.target.style.backgroundColor = '#6c757d'}
//             >
//                 🔄 Reset All Filters
//             </button>
//         </div>
//     );
// };

// export default RaceFilters;