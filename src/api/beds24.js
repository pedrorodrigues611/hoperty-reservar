export async function fetchProperties({ location, guests, checkin, checkout }) {
  const res = await fetch("/api/reservas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ location, guests, checkin, checkout }),
  });

  const text = await res.text();  // <- ler como texto
  console.log("🔍 Resposta crua da API:", text);

  try {
    return JSON.parse(text).properties || [];
  } catch (err) {
    console.error("❌ Erro ao converter JSON:", err);
    return [];
  }
}
