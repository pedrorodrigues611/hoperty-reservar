import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Reservas from './pages/Reservas';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Bem-vindo à Hoperty</h1>} />
        <Route path="/reservas" element={<Reservas />} />
      </Routes>
    </Router>
  );
}

export default App;
