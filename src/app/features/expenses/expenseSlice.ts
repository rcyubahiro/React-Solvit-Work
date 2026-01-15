import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Expense } from "@/types/expenseType";

// Define the structure of an expense

// Define the state structure for expenses
interface ExpenseState {
  expenses: Expense[];
}

// Initial state
const initialState: ExpenseState = {
  expenses: [],
};

// Create the expense slice
const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    addExpense: (
      state,
      action: PayloadAction<{ title: string; amount: number }>
    ) => {
      // Add a new expense with an auto-generated ID
      state.expenses.push({ id: Date.now(), ...action.payload });
    },
    removeExpense: (state, action: PayloadAction<number>) => {
      // Remove an expense by ID
      state.expenses = state.expenses.filter(
        (exp) => exp.id !== action.payload
      );
    },
  },
});

// Export actions and reducer
export const { addExpense, removeExpense } = expenseSlice.actions;
export default expenseSlice.reducer;
