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
