// Estrutura base do projeto React com Vite + Tailwind

// 1. App.jsx - Componente raiz
// 2. pages/Reservas.jsx - Página principal
// 3. components/SearchBar.jsx - Barra de pesquisa reutilizável
// 4. components/PropertyCard.jsx - Card para alojamento
// 5. api/beds24.js - Conexão à API

// ------------------------
// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Reservas from './pages/Reservas';

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

// ------------------------
// src/pages/Reservas.jsx
import { useEffect, useState } from 'react';
import { fetchProperties } from '../api/beds24';
import SearchBar from '../components/SearchBar';
import PropertyCard from '../components/PropertyCard';

function Reservas() {
  const [properties, setProperties] = useState([]);
  const [params, setParams] = useState({
    location: '',
    guests: '2',
    checkin: '',
    checkout: ''
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const location = urlParams.get('location') || '';
    const guests = urlParams.get('guests') || '2';
    const checkin = urlParams.get('checkin') || '';
    const checkout = urlParams.get('checkout') || '';

    const searchParams = { location, guests, checkin, checkout };
    setParams(searchParams);

    fetchProperties(searchParams).then(setProperties);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <SearchBar initialParams={params} />

        <h2 className="text-3xl font-bold mt-10 mb-6">Resultados</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.propertyId} data={property} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Reservas;

// ------------------------
// src/components/SearchBar.jsx
function SearchBar({ initialParams }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 flex flex-wrap gap-4">
      <input
        type="text"
        placeholder="Localização"
        defaultValue={initialParams.location}
        className="border px-4 py-2 rounded-md w-full sm:w-auto"
      />
      <input
        type="date"
        defaultValue={initialParams.checkin}
        className="border px-4 py-2 rounded-md"
      />
      <input
        type="date"
        defaultValue={initialParams.checkout}
        className="border px-4 py-2 rounded-md"
      />
      <input
        type="number"
        min="1"
        defaultValue={initialParams.guests}
        className="border px-4 py-2 rounded-md w-24"
      />
      <button className="bg-blue-800 text-white px-6 py-2 rounded-md">Procurar</button>
    </div>
  );
}

export default SearchBar;

// ------------------------
// src/components/PropertyCard.jsx
function PropertyCard({ data }) {
  const { name, city, price, rating, images } = data;
  const image = images?.[0]?.url || 'https://via.placeholder.com/400x300';

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-gray-600">{city}</p>
        <p className="text-blue-800 font-bold mt-2">{price || '---'} €/noite</p>
        <p className="text-yellow-500">{rating ? `${rating} ★` : '- ★'}</p>
      </div>
    </div>
  );
}

export default PropertyCard;

// ------------------------
// src/api/beds24.js
const API_KEY = import.meta.env.VITE_BEDS24_API_KEY;

export async function fetchProperties({ location, guests, checkin, checkout }) {
  const res = await fetch("https://api.beds24.com/json/getProperties", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      authentication: {
        apiKey: API_KEY,
      },
      parameters: {
        location,
        guests,
        checkin,
        checkout,
        includeRooms: true,
      },
    }),
  });
  const json = await res.json();
  return json.properties || [];
}

