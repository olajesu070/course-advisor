import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation,
} from 'react-router-dom';

import EnterResult from './pages/enterResult';
import ViewCourseRequirement from './pages/viewCourseRequirements';

function App() {
  const location = useLocation();
  const hideGlassEffect =
    location.pathname === '/enter-result' ||
    location.pathname === '/view-course-requirement';

  return (
    <div className="App">
      {!hideGlassEffect && (
        <header className="App-header">
          <div className="glass-effect d-none d-sm-block">
            <h1>Welcome to Our Platform</h1>
            <div className="buttons">
              <Link to="/enter-result" className="button">
                Enter O'Level result to see available Course
              </Link>
              <Link to="/view-course-requirement" className="button">
                View Subject Requirement for a particular course
              </Link>
            </div>
          </div>
        </header>
      )}

      <Routes>
        <Route path="/enter-result" element={<EnterResult />} />
        <Route
          path="/view-course-requirement"
          element={<ViewCourseRequirement />}
        />
      </Routes>
    </div>
  );
}

export default function AppRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}
