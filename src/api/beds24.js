const API_KEY = import.meta.env.VITE_BEDS24_API_KEY;

export async function fetchProperties({ location, guests, checkin, checkout }) {
  const res = await fetch("/api/reservas", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ location, guests, checkin, checkout }),
  });

  if (!res.ok) throw new Error("API error");

  const json = await res.json();
  return json.properties || [];
}