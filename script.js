
document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("alojamentosContainer");

  // Simulated data fetch (placeholder)
  const alojamentos = [
    {
      id: 1,
      name: "Bem Me Quer",
      cidade: "Santa Cruz",
      preco: "120€",
      rating: "4.8",
      imagem: "https://via.placeholder.com/300x200"
    }
  ];

  alojamentos.forEach(aloj => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${aloj.imagem}" alt="${aloj.name}" />
      <div class="info">
        <h3>${aloj.name}</h3>
        <p>${aloj.cidade}</p>
        <p>${aloj.preco} / noite</p>
        <p>${aloj.rating || '-'} ★</p>
      </div>
    `;
    container.appendChild(card);
  });
});
