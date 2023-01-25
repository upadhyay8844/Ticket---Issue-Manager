const form = document.querySelector("form");
const phase1 = document.querySelector("#phase1");
const phase2 = document.querySelector("#phase2");
const phase3 = document.querySelector("#phase3");
const phase4 = document.querySelector("#phase4");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const issueId = Math.floor(Math.random() * 100000);
  const issueStatus = "Open";
  const description = document.querySelector("#description").value;
  const severity = document.querySelector("#severity").value;
  const assignedTo = document.querySelector("#assigned-to").value;

  const card = document.createElement("div");
  card.classList.add("card");
  card.classList.add("list-group-item");
  card.setAttribute("draggable", "true");

  card.innerHTML = `
    <p><b>Issue ID:</b> ${issueId}</p>
    <div class="status">${issueStatus}</div>
    <p><b>Description:</b> ${description}</p>
    <p><b>Severity:</b> ${severity}</p>
    <p><b>Assigned To:</b> ${assignedTo}</p>
    <button class="close"><b>Close</b></button>
    <button class="delete"><b>Delete</b></button>
    <br>
    <button class="prev"><b>Prev</b></button>
    <button class="next"><b>Next</b></button>
  `;

  phase1.appendChild(card);
  vacateFields();
  scrolldToCurrentIssues();

  const closeBtn = card.querySelector(".close");
  closeBtn.addEventListener("click", () => {
    const issueStatus = card.querySelector("p:nth-of-type(2)");
    card.querySelector(".status").style.background = "gray";
    card.querySelector(".status").innerHTML = "Closed";
    card.querySelector(".prev").style.display = "none";
    card.querySelector(".next").style.display = "none";
    card.querySelector(".close").style.display = "none";
  });

  const deleteBtn = card.querySelector(".delete");
  deleteBtn.addEventListener("click", () => {
    card.remove();
  });

  let prevBtn = card.querySelector(".prev");
  let nextBtn = card.querySelector(".next");
  prevBtn.style.display = "none";
  nextBtn.addEventListener("click", () => {
    if (phase1.contains(card)) {
      prevBtn.style.display = "block";
      nextBtn.style.display = "block";
      phase1.removeChild(card);
      phase2.appendChild(card);
    } else if (phase2.contains(card)) {
      phase2.removeChild(card);
      phase3.appendChild(card);
    } else if (phase3.contains(card)) {
      nextBtn.style.display = "none";

      phase3.removeChild(card);
      phase4.appendChild(card);
    } else if (phase4.contains(card)) {
    }
  });

  prevBtn.addEventListener("click", () => {
    if (phase4.contains(card)) {
      phase4.removeChild(card);
      phase3.appendChild(card);

      nextBtn.style.display = "block";
    } else if (phase3.contains(card)) {
      phase3.removeChild(card);
      phase2.appendChild(card);
    } else if (phase2.contains(card)) {
      phase2.removeChild(card);
      phase1.appendChild(card);

      prevBtn.style.display = "none";
    }
  });
});
const columns = document.querySelectorAll(".phase");
columns.forEach((column) => {
  new Sortable(column, {
    group: "shared",
    animation: 500,
    ghostClass: "blue-background-class",
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const currentHeight = phase1.offsetHeight;

  phase1.style.height = `${currentHeight + card.offsetHeight}px`;

  const currentHeight1 = phase2.offsetHeight;

  phase2.style.height = `${currentHeight + card.offsetHeight}px`;

  const currentHeight2 = phase3.offsetHeight;

  phase3.style.height = `${currentHeight + card.offsetHeight}px`;

  const currentHeight3 = phase4.offsetHeight;

  phase4.style.height = `${currentHeight + card.offsetHeight}px`;
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  phase1.appendChild(card);

  const issue = {
    id: Date.now(),
    status: "Open",
    description: form.description.value,
    severity: form.severity.value,
    assignedTo: form.assignedTo.value,
  };

  localStorage.setItem("issue" + issue.id, JSON.stringify(issue));

  const storedIssue = JSON.parse(localStorage.getItem("issue" + issue.id));
});

function vacateFields() {
  document.getElementById("description").value = "";

  document.getElementById("severity").value = "";

  document.getElementById("assigned-to").value = "";
}

function scrolldToCurrentIssues() {
  var elem = document.getElementById("cards");

  elem.scrollIntoView();
}
