const tableBody = document.getElementById("reportBody");
const token = localStorage.getItem("token");

const isPremiumUser = localStorage.getItem("isPremium") === "true";
const downloadBtn = document.getElementById("downloadBtn");

downloadBtn.disabled = !isPremiumUser;

/* DATE */
document.getElementById("generatedDate").innerText =
  new Date().toLocaleString();

/* FETCH DATA */
async function fetchReport() {
  try {
    const res = await axios.get("http://localhost:3000/report?type=monthly", {
      headers: { Authorization: token },
    });

    renderData(res.data);
  } catch (err) {
    console.log(err);
  }
}

/* RENDER */
function renderData(data) {
  tableBody.innerHTML = "";

  let totalIncome = 0;
  let totalExpense = 0;

  data.forEach((item) => {
    const isIncome = item.category === "Salary";

    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${new Date(item.createdAt).toLocaleDateString()}</td>
      <td>${item.description}</td>
      <td>${item.category}</td>
      <td>${isIncome ? item.amount : ""}</td>
      <td>${!isIncome ? item.amount : ""}</td>
    `;

    if (isIncome) totalIncome += item.amount;
    else totalExpense += item.amount;

    tableBody.appendChild(row);
  });

  document.getElementById("subtotalIncome").innerText = totalIncome;
  document.getElementById("subtotalExpense").innerText = totalExpense;

  document.getElementById("totalIncome").innerText = "₹ " + totalIncome;
  document.getElementById("totalExpense").innerText = "₹ " + totalExpense;

  const savings = totalIncome - totalExpense;
  document.getElementById("savings").innerText = "₹ " + savings;

  /* YEARLY */
  document.getElementById("yearIncome").innerText = "₹ " + totalIncome;
  document.getElementById("yearExpense").innerText = "₹ " + totalExpense;
  document.getElementById("yearSavings").innerText = "₹ " + savings;

  /* NOTES (STATIC) */
  const notesBody = document.getElementById("notesBody");
  notesBody.innerHTML = `
    <tr><td>11-03-2026</td><td>Advance given</td></tr>
    <tr><td>12-03-2026</td><td>Travel expense</td></tr>
  `;
}

/* DOWNLOAD CSV */
downloadBtn.addEventListener("click", async () => {
  const res = await axios.get("http://localhost:3000/report?type=monthly", {
    headers: { Authorization: token },
  });

  let csv = "Date,Description,Category,Income,Expense\n";

  res.data.forEach((item) => {
    const isIncome = item.category === "Salary";

    csv += `${new Date(item.createdAt).toLocaleDateString()},
    ${item.description},
    ${item.category},
    ${isIncome ? item.amount : ""},
    ${!isIncome ? item.amount : ""}\n`;
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "report.csv";
  a.click();
});

/* INIT */
fetchReport();
