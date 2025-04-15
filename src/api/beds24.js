const API_KEY = import.meta.env.VITE_BEDS24_API_KEY;

export async function fetchProperties({ location, guests, checkin, checkout }) {
  const response = await fetch("https://api.beds24.com/json/getProperties", {
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

  // 👇 VERIFICAR O QUE VEM DA API
  const text = await response.text();
  console.log("📦 Resposta da API (raw):", text);

  try {
    const json = JSON.parse(text);
    return json.properties || [];
  } catch (error) {
    console.error("❌ Erro ao fazer parse do JSON:", error);
    return [];
  }
}
