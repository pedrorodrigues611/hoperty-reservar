document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("alojamentosContainer");

  // Obter parâmetros da URL
  const params = new URLSearchParams(window.location.search);
  const location = params.get("location") || "";
  const guests = params.get("guests") || "2";
  const checkin = params.get("checkin") || "";
  const checkout = params.get("checkout") || "";

  // Configurar a requisição à API
  const requestData = {
    authentication: {
      apiKey: "A9B7C3D2E6F1G4H8"
    },
    parameters: {
      location: location,
      guests: guests,
      checkin: checkin,
      checkout: checkout,
      includeRooms: true
    }
  };

  fetch("https://api.beds24.com/json/getProperties", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(requestData)
  })
    .then(response => response.json())
    .then(data => {
      const properties = data.properties || [];
      properties.forEach(property => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <img src="${property.images?.[0]?.url || 'https://via.placeholder.com/300x200'}" alt="${property.name}" />
          <div class="info">
            <h3>${property.name}</h3>
            <p>${property.city}</p>
            <p>${property.price || '---'} € / noite</p>
            <p>${property.rating || '-'} ★</p>
          </div>
        `;
        container.appendChild(card);
      });
    })
    .catch(error => {
      console.error("Erro ao buscar os dados dos alojamentos:", error);
    });
});
