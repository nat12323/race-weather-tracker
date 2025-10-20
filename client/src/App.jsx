import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import HomePage from './pages/HomePage';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Races from './pages/Races';
import WeatherNotReady from './pages/WeatherNotReady';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          
          {/* Protected Routes */}
          <Route 
            path="/races" 
            element={
              <ProtectedRoute>
                <Races />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/weather-not-ready" 
            element={
              <ProtectedRoute>
                <WeatherNotReady />
              </ProtectedRoute>
            } 
          />
          
          {/* Catch all - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;


// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext';
// import ProtectedRoute from './components/ProtectedRoute';

// import HomePage from './pages/HomePage';
// import Races from './pages/Races';
// import LoginForm from './components/LoginForm';
// import RegisterForm from './components/RegisterForm';
// import Dashboard from './pages/Dashboard';
// import WeatherNotReady from './pages/WeatherNotReady';

// function App() {
//   return (
//     <Router>
//       <AuthProvider>
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/login" element={<LoginForm />} />
//           <Route path="/register" element={<RegisterForm />} />

          
//           {/* Protected Routes */}
//           <Route 
//             path="/dashboard" 
//             element={
//               <ProtectedRoute>
//                 <Dashboard />
//               </ProtectedRoute>
//             } 
//           />
//           <Route
//             path="/races"
//             element={
//               <ProtectedRoute>
//                 <Races />
//               </ProtectedRoute>
//             }
//           />

//           <Route 
//             path="/weather-not-ready" 
//             element={
//               <ProtectedRoute>
//                   <WeatherNotReady />
//               </ProtectedRoute>
//             }
//           />
          
//           {/* Catch all - redirect to home */}
//           <Route path="*" element={<Navigate to="/" replace />} />
//         </Routes>
//       </AuthProvider>
//     </Router>
//   );
// }

// export default App;