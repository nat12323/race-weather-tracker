import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {/* Header with Logout */}
      {user && (
        <div style={{ 
          backgroundColor: 'white', 
          padding: '15px 30px', 
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <span style={{ fontSize: '14px', color: '#666' }}>
              Welcome, <strong>{user.username}</strong>
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
      )}

      {/* Hero Section */}
      <div style={{ 
        textAlign: 'center', 
        padding: '80px 20px 60px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white'
      }}>
        <h1 style={{ 
          fontSize: '48px', 
          marginBottom: '20px',
          fontWeight: 'bold'
        }}>
          🏃 Race Weather Tracker
        </h1>
        <p style={{ 
          fontSize: '20px', 
          marginBottom: '40px',
          maxWidth: '700px',
          margin: '0 auto 40px'
        }}>
          Your ultimate tool for discovering obstacle course races and running events with real-time weather forecasts
        </p>

        {user ? (
          <Link to="/races">
            <button style={{
              padding: '15px 40px',
              fontSize: '18px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
              boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              🗺️ View Race Map
            </button>
          </Link>
        ) : (
          <div>
            <Link to="/login" style={{ marginRight: '15px' }}>
              <button style={{
                padding: '15px 40px',
                fontSize: '18px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}>
                Login
              </button>
            </Link>
            
            <Link to="/register">
              <button style={{
                padding: '15px 40px',
                fontSize: '18px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}>
                Register
              </button>
            </Link>
          </div>
        )}
      </div>

      {/* About Section */}
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '60px 20px' 
      }}>
        <h2 style={{ 
          textAlign: 'center', 
          fontSize: '36px', 
          marginBottom: '20px',
          color: '#333'
        }}>
          What is Race Weather Tracker?
        </h2>
        <p style={{ 
          textAlign: 'center', 
          fontSize: '18px', 
          color: '#666',
          maxWidth: '800px',
          margin: '0 auto 50px',
          lineHeight: '1.6'
        }}>
          Race Weather Tracker combines obstacle course racing (OCR) events from a curated database 
          with multiple running events from external APIs. Plan your next race with confidence by 
          checking weather forecasts, filtering by location and date, and discovering new challenges 
          across the country.
        </p>

        {/* Features Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px',
          marginTop: '40px'
        }}>
          {/* Feature 1 */}
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '15px' }}>🗺️</div>
            <h3 style={{ fontSize: '22px', marginBottom: '10px', color: '#333' }}>
              Interactive Race Map
            </h3>
            <p style={{ color: '#666', lineHeight: '1.6' }}>
              Explore hundreds of OCR and running events on an interactive map. 
              Click any marker to view race details, dates, and locations.
            </p>
          </div>

          {/* Feature 2 */}
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '15px' }}>🌤️</div>
            <h3 style={{ fontSize: '22px', marginBottom: '10px', color: '#333' }}>
              Weather Forecasts
            </h3>
            <p style={{ color: '#666', lineHeight: '1.6' }}>
              Get 5-day weather forecasts for any race location powered by the 
              National Weather Service API. Plan your gear and strategy accordingly.
            </p>
          </div>

          {/* Feature 3 */}
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '15px' }}>🔍</div>
            <h3 style={{ fontSize: '22px', marginBottom: '10px', color: '#333' }}>
              Smart Filters
            </h3>
            <p style={{ color: '#666', lineHeight: '1.6' }}>
              Filter races by type (Spartan, Tough Mudder, Ultra, etc.), state, 
              and date range. Find exactly what you're looking for quickly.
            </p>
          </div>

          {/* Feature 4 */}
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '15px' }}>➕</div>
            <h3 style={{ fontSize: '22px', marginBottom: '10px', color: '#333' }}>
              Add Your Events
            </h3>
            <p style={{ color: '#666', lineHeight: '1.6' }}>
              Contribute to the community by adding OCR events you know about. 
              Help fellow racers discover new challenges.
            </p>
          </div>

          {/* Feature 5 */}
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '15px' }}>🏔️</div>
            <h3 style={{ fontSize: '22px', marginBottom: '10px', color: '#333' }}>
              Curated OCR Events
            </h3>
            <p style={{ color: '#666', lineHeight: '1.6' }}>
              Access our database of Spartan Races, Tough Mudders, Warrior Dash, 
              and other popular obstacle course racing events.
            </p>
          </div>

          {/* Feature 6 */}
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '15px' }}>🏃</div>
            <h3 style={{ fontSize: '22px', marginBottom: '10px', color: '#333' }}>
              Running Events API
            </h3>
            <p style={{ color: '#666', lineHeight: '1.6' }}>
              Integrated with RunReg API to show thousands of running events, 
              marathons, and ultras happening across North America.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      {user && (
        <div style={{
          backgroundColor: '#667eea',
          padding: '60px 20px',
          textAlign: 'center',
          color: 'white'
        }}>
          <h2 style={{ fontSize: '36px', marginBottom: '20px' }}>
            Ready to Find Your Next Race?
          </h2>
          <p style={{ fontSize: '18px', marginBottom: '30px' }}>
            Explore hundreds of events and check weather conditions now
          </p>
          <Link to="/races">
            <button style={{
              padding: '15px 40px',
              fontSize: '18px',
              backgroundColor: 'white',
              color: '#667eea',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
              boxShadow: '0 4px 6px rgba(0,0,0,0.2)'
            }}>
              🗺️ Go to Race Map
            </button>
          </Link>
        </div>
      )}

      {/* Footer */}
      <div style={{
        backgroundColor: '#333',
        color: 'white',
        padding: '30px 20px',
        textAlign: 'center'
      }}>
        <p style={{ margin: 0, fontSize: '14px' }}>
          © 2025 Race Weather Tracker | Built with PERN Stack
        </p>
      </div>
    </div>
  );
};

export default HomePage;



// import { Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const HomePage = () => {
//   const { user } = useAuth();

//   return (
//     <div style={{ textAlign: 'center', padding: '50px 20px' }}>
//       <h1>Race Weather Tracker</h1>
//       <p style={{ fontSize: '18px', color: '#666', marginBottom: '30px' }}>
//         Find obstacle course races and check weather forecasts
//       </p>

//       {user ? (
//         <div>
//           <p>Welcome back, {user.username}!</p>
//           <Link to="/dashboard">
//             <button style={{ 
//               padding: '12px 30px', 
//               fontSize: '16px',
//               backgroundColor: '#007bff',
//               color: 'white',
//               border: 'none',
//               borderRadius: '4px',
//               cursor: 'pointer'
//             }}>
//               Go to Dashboard
//             </button>
//           </Link>
//         </div>
//       ) : (
//         <div>
//           <Link to="/login" style={{ marginRight: '15px' }}>
//             <button style={{ 
//               padding: '12px 30px', 
//               fontSize: '16px',
//               backgroundColor: '#007bff',
//               color: 'white',
//               border: 'none',
//               borderRadius: '4px',
//               cursor: 'pointer'
//             }}>
//               Login
//             </button>
//           </Link>
          
//           <Link to="/register">
//             <button style={{ 
//               padding: '12px 30px', 
//               fontSize: '16px',
//               backgroundColor: '#28a745',
//               color: 'white',
//               border: 'none',
//               borderRadius: '4px',
//               cursor: 'pointer'
//             }}>
//               Register
//             </button>
//           </Link>
//         </div>
//       )}
//     </div>
//   );
// };

// export default HomePage;