export async function fetchProperties({ location, guests, checkin, checkout }) {
  const res = await fetch("https://api.beds24.com/json/getProperties", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      authentication: {
        apiKey: import.meta.env.VITE_BEDS24_API_KEY,
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

  const text = await res.text(); // capturar resposta crua
  console.log("🔍 Resposta crua da API:", text);

  try {
    const json = JSON.parse(text);
    return json.properties || [];
  } catch (error) {
    console.error("❌ Erro ao fazer parse do JSON:", error);
    return [];
  }
}
