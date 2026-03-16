const amountInput = document.getElementById("amount");
const descInput = document.getElementById("description");
const categoryInput = document.getElementById("category");
const addBtn = document.getElementById("addBtn");
const expenseList = document.getElementById("expenseList");

let editId = null;

/* Add Expense */

addBtn.addEventListener("click", async () => {
  const amount = amountInput.value;
  const description = descInput.value;
  const category = categoryInput.value;

  if (!amount || !description) {
    alert("Please fill all fields");
    return;
  }

  const expense = { amount, description };

  const token = localStorage.getItem("token");

  try {
    if (editId) {
      await axios.put(
        `http://localhost:3000/expense/edit-expense/${editId}`,
        expense,
        {
          headers: { Authorization: token },
        },
      );
      editId = null;
    } else {
      await axios.post("http://localhost:3000/expense/add-expense", expense, {
        headers: { Authorization: token },
      });
    }

    clearInputs();
    renderExpenses();
  } catch (err) {
    console.log(err);
  }
});

/* Render Expenses */

async function renderExpenses() {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get("http://localhost:3000/expense/get-expenses", {
      headers: { Authorization: token },
    });

    expenseList.innerHTML = "";

    res.data.forEach((expense) => {
      const li = document.createElement("li");

      li.innerHTML = `
      
      <div class="expense-info">
      <span><b>Amount:</b> ${expense.amount}</span>
      <span><b>Description:</b> ${expense.description}</span>
      <span><b>Category:</b> ${expense.category}</span>
      </div>

      <div class="expense-buttons">
      <button class="edit-btn" onclick="editExpense(${expense.id},'${expense.amount}','${expense.description}','${expense.category}')">Edit</button>
      <button class="delete-btn" onclick="deleteExpense(${expense.id})">Delete</button>
      </div>

      `;

      expenseList.appendChild(li);
    });
  } catch (err) {
    console.log(err);
  }
}

/* Delete Expense */

async function deleteExpense(id) {
  try {
    const token = localStorage.getItem("token");

    await axios.delete(`http://localhost:3000/expense/delete-expense/${id}`, {
      headers: { Authorization: token },
    });
    renderExpenses();
  } catch (err) {
    console.log(err);
  }
}

/* Edit Expense */

function editExpense(id, amount, description, category) {
  amountInput.value = amount;
  descInput.value = description;
  categoryInput.value = category;

  editId = id;
}

/* Clear Inputs */

function clearInputs() {
  amountInput.value = "";
  descInput.value = "";
  categoryInput.value = "food";
}
document.getElementById("premium-btn").onclick = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      "http://localhost:3000/purchase/premium",
      {},
      {
        headers: { Authorization: token },
      },
    );

    const paymentSessionId = response.data.payment_session_id;

    const cashfree = Cashfree({
      mode: "sandbox",
    });

    let checkoutOptions = {
      paymentSessionId: paymentSessionId,
      redirectTarget: "_modal",
    };

    cashfree.checkout(checkoutOptions).then((result) => {
      if (result.error) {
        alert("TRANSACTION FAILED");
      }

      if (result.paymentDetails) {
        const token = localStorage.getItem("token");

        axios.post(
          "http://localhost:3000/purchase/updatetransactionstatus",
          {
            orderId: response.data.orderId,
            paymentId: result.paymentDetails.paymentId,
          },
          {
            headers: { Authorization: token },
          },
        );

        localStorage.setItem("isPremium", true);

        showPremiumUserMessage();
      }
    });
  } catch (error) {
    console.log("CASHFREE ERROR --->", error.response?.data || error);
    alert("Payment creation failed");
  }
};
function showPremiumUserMessage() {
  const message = document.createElement("h3");
  message.textContent = "You are a premium user now";

  document.body.insertBefore(message, document.body.firstChild);

  const leaderboardBtn = document.createElement("button");
  leaderboardBtn.textContent = "Show Leaderboard";
  leaderboardBtn.onclick = showLeaderboard;

  document.body.insertBefore(leaderboardBtn, message.nextSibling);
}

async function showLeaderboard() {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get("http://localhost:3000/premium/leaderboard", {
      headers: { Authorization: token },
    });

    const leaderBoard = document.getElementById("leaderboard");

    leaderBoard.innerHTML = "";

    res.data.forEach((user) => {
      const li = document.createElement("li");

      li.textContent = `Name - ${user.User.name} Total Expense - ${user.totalExpense}`;

      leaderBoard.appendChild(li);
    });
  } catch (err) {
    console.log(err);
  }
}

/* Page Load */
window.addEventListener("DOMContentLoaded", () => {
  renderExpenses();

  const isPremium = localStorage.getItem("isPremium");

  if (isPremium === "true") {
    showPremiumUserMessage();
    showLeaderboard();
  }
});
