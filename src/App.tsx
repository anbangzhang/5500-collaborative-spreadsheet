import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from './frontend/HomePage';
import SheetPage from './frontend/Components/SheetPage';

function App() {

  return (
    <Router>
      <div className="Container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:sheet_id" element={<SheetPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;