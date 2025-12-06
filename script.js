// --- Gestion du formulaire de contact ---
const form = document.querySelector("form");
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Merci pour votre message ! Nous vous répondrons bientôt.");
  });
}

// --- Chargement des décisions du Conseil ---
async function chargerDecisions() {
  try {
    const response = await fetch("decisions.json");
    const decisions = await response.json();

    // Trier par date (du plus récent au plus ancien)
    decisions.sort((a, b) => new Date(b.date) - new Date(a.date));

    const container = document.getElementById("decisions-container");
    if (!container) return; // sécurité : ne fait rien si la page n'a pas ce conteneur

    decisions.forEach(decision => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <h3>${decision.id} · ${decision.titre}</h3>
        <p><strong>Date :</strong> ${decision.date}</p>
        <p><strong>Proposé par :</strong> ${decision.propose}</p>
        <p><strong>Votes :</strong> ${decision.votes}</p>
      `;

      container.appendChild(card);
    });
  } catch (error) {
    console.error("Erreur lors du chargement des décisions :", error);
  }
}

// Lancer le chargement des décisions uniquement si on est sur la page concernée
document.addEventListener("DOMContentLoaded", chargerDecisions);

// --- Chargement des membres ---
async function chargerMembres() {
  try {
    const response = await fetch("membres.json");
    const membres = await response.json();

    // Trier par date (du plus récent au plus ancien)
    //membres.sort((a, b) => new Date(b.date) - new Date(a.date));

    const container = document.getElementById("membres-container");
    if (!container) return; // sécurité : ne fait rien si la page n'a pas ce conteneur

    membres.forEach(membre => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <h3><a href=${membre.lien}>${membre.id}</a></h3>
      `;

      container.appendChild(card);
    });
  } catch (error) {
    console.error("Erreur lors du chargement des membres :", error);
  }
}

// Lancer le chargement des membres uniquement si on est sur la page concernée
document.addEventListener("DOMContentLoaded", chargerMembres);

// --- Chargement des membres ---
async function chargerAmembres() {
  try {
    const response = await fetch("amembres.json");
    const amembres = await response.json();

    // Trier par date (du plus récent au plus ancien)
    //membres.sort((a, b) => new Date(b.date) - new Date(a.date));

    const container = document.getElementById("amembres-container");
    if (!container) return; // sécurité : ne fait rien si la page n'a pas ce conteneur

    amembres.forEach(amembre => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <h3><a href=${amembre.lien}>${amembre.id}</a></h3>
      `;

      container.appendChild(card);
    });
  } catch (error) {
    console.error("Erreur lors du chargement des anciens membres :", error);
  }
}

// Lancer le chargement des anciens membres uniquement si on est sur la page concernée
document.addEventListener("DOMContentLoaded", chargerAmembres);

// Sidebar
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("open");
}
