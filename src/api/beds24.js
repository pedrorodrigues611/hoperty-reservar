const API_KEY = import.meta.env.VITE_BEDS24_API_KEY;

export async function fetchProperties({ location, guests, checkin, checkout }) {
  const res = await fetch("/api/reservas?location=" + location + "&guests=" + guests + "&checkin=" + checkin + "&checkout=" + checkout);
  const text = await res.text(); // ⚠️ Para debugging

  try {
    const json = JSON.parse(text);
    console.log("✅ JSON recebido da API:", json);
    return json.properties || [];
  } catch (error) {
    console.error("❌ Erro ao fazer JSON.parse:", error.message);
    console.warn("📦 Conteúdo recebido da API:", text);
    return [];
  }
}
