
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
