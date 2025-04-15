
export async function fetchProperties(params) {
  const res = await fetch("/api/reservas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });
  const json = await res.json();
  return json.properties || [];
}
