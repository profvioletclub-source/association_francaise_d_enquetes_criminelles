const calendar = document.getElementById("calendar");
const details = document.getElementById("event-details");

let current = new Date();
let events = []; // sera rempli depuis events.json
let decisions = [];

// -----------------------------
// 1. Charger les événements JSON
// -----------------------------

async function chargerEvenementsCalendrier() {
  try {
    const responseEvents = await fetch("events.json");
    events = await responseEvents.json();

    const responseDecisions = await fetch("decisions.json");
    decisions = await responseDecisions.json();

    renderCalendar();
  } catch (error) {
    console.error("Erreur lors du chargement :", error);
  }
}

// -----------------------------
// 2. Affichage du calendrier
// -----------------------------
function renderCalendar() {
  const year = current.getFullYear();
  const month = current.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  calendar.innerHTML = `
    <div class="cal-header">
      <button onclick="prevMonth()">◀</button>
      <h2>${current.toLocaleString("fr-FR", { month: "long" })} ${year}</h2>
      <button onclick="nextMonth()">▶</button>
    </div>
    <div class="cal-grid">
      <div>Lun</div><div>Mar</div><div>Mer</div><div>Jeu</div><div>Ven</div><div>Sam</div><div>Dim</div>
    </div>
  `;

  const grid = document.createElement("div");
  grid.className = "cal-grid";

  // Décalage du premier jour
  const offset = (firstDay === 0 ? 6 : firstDay - 1);
  for (let i = 0; i < offset; i++) {
    grid.innerHTML += `<div></div>`;
  }

  // Ajout des jours

  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

    const hasEvent = events.some(ev => ev.date === dateStr);
    const hasDecision = decisions.some(dec => dec.date === dateStr);

    let cssClass = "day";

    if (hasDecision) {
      cssClass += " decision-day"; // priorité au rouge
    } else if (hasEvent) {
      cssClass += " event-day";
    }

    grid.innerHTML += `
      <div class="${cssClass}" onclick="showEvents('${dateStr}')">
        ${d}
      </div>
    `;
  }


  calendar.appendChild(grid);
}

// -----------------------------
// 3. Affichage des événements du jour
// -----------------------------

function showEvents(dateStr) {
  const evts = events.filter(ev => ev.date === dateStr);
  const decs = decisions.filter(dec => dec.date === dateStr);

  let html = "";

  if (evts.length > 0) {
    html += "<h3>Événements</h3>";
    html += evts.map(ev =>
      `<p><strong>${new Date(ev.date).toLocaleDateString("fr-FR")}</strong> — ${ev.title}</p>`
    ).join("");
  }

  if (decs.length > 0) {
    html += "<h3>Décisions du Conseil</h3>";
    html += decs.map(dec =>
      `<p><strong>${new Date(dec.date).toLocaleDateString("fr-FR")}</strong> — ${dec.id} – ${dec.titre}</p>`
    ).join("");
  }

  if (html === "") {
    html = "<p>Aucun événement ce jour.</p>";
  }

  details.innerHTML = html;
}

// -----------------------------
// 4. Navigation mois précédent / suivant
// -----------------------------
function prevMonth() {
  current.setMonth(current.getMonth() - 1);
  renderCalendar();
}

function nextMonth() {
  current.setMonth(current.getMonth() + 1);
  renderCalendar();
}

// -----------------------------
// 5. Lancer le chargement
// -----------------------------
chargerEvenementsCalendrier();
