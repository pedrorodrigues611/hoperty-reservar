
export default async function handler(req, res) {
  const response = await fetch("https://api.beds24.com/json/getProperties", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      authentication: {
        apiKey: process.env.BEDS24_API_KEY,
      },
      parameters: req.body,
    }),
  });

  const data = await response.json();
  res.status(200).json(data);
}
