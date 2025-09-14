import AddExpenseForm from '../components/AddExpenseForm';

export default function AddExpense() {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center px-3 bg-light">
      <div className="w-100" style={{ maxWidth: '640px' }}>
        <div className="bg-white rounded shadow p-4">
          <h2 className="h3 fw-bold text-dark text-center mb-4">
            Add New Expense
          </h2>
          <AddExpenseForm />
        </div>
      </div>
    </div>
  );
}
