import MainLayout from "../layouts/MainLayout";
import ExpenseHeader from "../components/expense/ExpenseHeader";
import ExpenseFilters from "./../components/expense/ExpenseFilters";
import ExpenseTable from "./../components/expense/ExpenseTable";
import AddExpenseModal from "./../components/expense/AddExpenseModal";

function Expenses() {
  return (
    <MainLayout>
      <ExpenseHeader onAddExpense={() => {}} />
      <ExpenseFilters />
      <ExpenseTable />
      <AddExpenseModal />
    </MainLayout>
  );
}

export default Expenses;
