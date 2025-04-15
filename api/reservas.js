export default async function handler(req, res) {
  const apiKey = process.env.VITE_BEDS24_API_KEY;

  const response = await fetch("https://api.beds24.com/json/getProperties", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      authentication: {
        apiKey: apiKey
      },
      parameters: {
        includeRooms: true
      }
    })
  });

  const data = await response.json();
  res.status(200).json(data);
}
