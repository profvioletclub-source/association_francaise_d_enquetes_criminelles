const calendar = document.getElementById("calendar");
const details = document.getElementById("event-details");

let current = new Date();

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

  for (let i = 1; i < (firstDay === 0 ? 7 : firstDay); i++) {
    grid.innerHTML += `<div></div>`;
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
    const hasEvent = events.some(ev => ev.date === dateStr);

    grid.innerHTML += `
      <div class="day ${hasEvent ? "event-day" : ""}" onclick="showEvents('${dateStr}')">
        ${d}
      </div>
    `;
  }

  calendar.appendChild(grid);
}

function showEvents(dateStr) {
  const list = events.filter(ev => ev.date === dateStr);

  if (list.length === 0) {
    details.innerHTML = "<p>Aucun événement ce jour.</p>";
    return;
  }

  details.innerHTML = list.map(ev =>
    `<p><strong>${new Date(ev.date).toLocaleDateString("fr-FR")}</strong> — ${ev.title}</p>`
  ).join("");
}

function prevMonth() {
  current.setMonth(current.getMonth() - 1);
  renderCalendar();
}

function nextMonth() {
  current.setMonth(current.getMonth() + 1);
  renderCalendar();
}

renderCalendar();
