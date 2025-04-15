export async function fetchProperties({ location, guests, checkin, checkout }) {
  const query = new URLSearchParams({ location, guests, checkin, checkout });
  const response = await fetch(`/api/reservas?${query.toString()}`);
  const data = await response.json();
  return data;
}
