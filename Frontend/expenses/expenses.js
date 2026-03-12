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

  const expense = { amount, description, category };

  try {
    if (editId) {
      await axios.put(
        `http://localhost:3000/expense/edit-expense/${editId}`,
        expense,
      );
      editId = null;
    } else {
      await axios.post("http://localhost:3000/expense/add-expense", expense);
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
    const res = await axios.get("http://localhost:3000/expense/get-expenses");

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
    await axios.delete(`http://localhost:3000/expense/delete-expense/${id}`);
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

/* Page Load */

document.addEventListener("DOMContentLoaded", renderExpenses);
