const reportList = document.getElementById("reportList");
const reportFilter = document.getElementById("reportFilter");

const totalIncome = document.getElementById("totalIncome");
const totalExpense = document.getElementById("totalExpense");
const totalSavings = document.getElementById("totalSavings");

const downloadBtn = document.getElementById("downloadBtn");

let reportData = [];

async function loadReports() {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      "http://localhost:3000/expense/get-expenses?page=1&limit=1000",
      {
        headers: {
          Authorization: token,
        },
      },
    );
    console.log(res.data.expenses);

    reportData = res.data.expenses;

    renderReports();
  } catch (err) {
    console.log(err);
  }
}

function renderReports() {
  reportList.innerHTML = "";

  let filtered = [...reportData];

  const filter = reportFilter.value;

  const today = new Date();

  if (filter === "daily") {
    filtered = reportData.filter((expense) => {
      const expenseDate = new Date(expense.createdAt);

      return (
        expenseDate.getDate() === today.getDate() &&
        expenseDate.getMonth() === today.getMonth() &&
        expenseDate.getFullYear() === today.getFullYear()
      );
    });
  }

  if (filter === "weekly") {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);

    filtered = reportData.filter((expense) => {
      return new Date(expense.createdAt) >= sevenDaysAgo;
    });
  }

  if (filter === "monthly") {
    filtered = reportData.filter((expense) => {
      const expenseDate = new Date(expense.createdAt);

      return (
        expenseDate.getMonth() === today.getMonth() &&
        expenseDate.getFullYear() === today.getFullYear()
      );
    });
  }

  let expenseTotal = 0;

  filtered.forEach((expense) => {
    expenseTotal += Number(expense.amount);

    const li = document.createElement("li");

    li.innerHTML = `
      <strong>Amount:</strong> ₹${expense.amount}<br>
      <strong>Description:</strong> ${expense.description}<br>
      <strong>Category:</strong> ${expense.category}<br>
      <strong>Date:</strong> ${new Date(expense.createdAt).toLocaleDateString()}
    `;

    reportList.appendChild(li);
  });

  totalIncome.textContent = 0;
  totalExpense.textContent = expenseTotal;
  totalSavings.textContent = -expenseTotal;
}

reportFilter.addEventListener("change", renderReports);

const isPremium = localStorage.getItem("isPremium");

if (isPremium !== "true") {
  downloadBtn.disabled = true;
  downloadBtn.textContent = "Premium Feature";
}

downloadBtn.addEventListener("click", () => {
  const content = reportData
    .map(
      (e) =>
        `Amount: ${e.amount}, Description: ${e.description}, Category: ${e.category}`,
    )
    .join("\n");

  const blob = new Blob([content], {
    type: "text/plain",
  });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");

  a.href = url;
  a.download = "expense-report.txt";

  a.click();

  URL.revokeObjectURL(url);
});

loadReports();
