import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Reservas from './pages/Reservas';
import './index.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/reservas" element={<Reservas />} />
      </Routes>
    </Router>
  );
}

export default App;
