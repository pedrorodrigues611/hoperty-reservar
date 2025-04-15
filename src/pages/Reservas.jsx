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

    // ✅ Verificar se os campos obrigatórios estão preenchidos
    if (location && guests && checkin && checkout) {
      fetchProperties(searchParams).then((result) => {
        console.log("🏨 Propriedades recebidas:", result);
        setProperties(result);
      }).catch((error) => {
        console.error("❌ Erro ao buscar propriedades:", error);
      });
    } else {
      console.warn("⛔ Faltam dados na pesquisa, não foi feita chamada à API.");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <SearchBar initialParams={params} />
        <h2 className="text-3xl font-bold mt-10 mb-6">Resultados</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.length > 0 ? (
            properties.map((property) => (
              <PropertyCard key={property.propertyId} data={property} />
            ))
          ) : (
            <p className="text-gray-600">Nenhum alojamento encontrado.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Reservas;
