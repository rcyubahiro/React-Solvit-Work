import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "../features/expenses/expenseSlice";
import { apiSlice } from "../api/apiEntry";

// Configure the Redux store
export const store = configureStore({
  reducer: {
    expense: expenseReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },

  // Add the API middleware
  //Analogy:

  // Imagine your action is a letter you send in an office (Redux store).
  // Middleware is like the mailroom staff:

  // They can check the letter

  // Modify it

  // Add stamps/logs

  // Then deliver it to the right room (reducer)

  // 2️⃣ Why Middleware is Important

  // Middleware is often used for:

  // Async logic

  // Example: fetching data from an API (like redux-thunk or RTK Query)

  // Logging

  // Example: log every action for debugging

  // Error handling

  // Example: catch errors in async actions

  // Caching / extra features

  // RTK Query uses middleware to manage cache, refetching, and loading states
  // the staff that manages fetching, caching, and updates
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// Types for using in components
export type RootState = ReturnType<typeof store.getState>;




// dispatch(action) 
//      |
//      v
// [middleware] → can modify/log/async handling
//      |
//      v
// reducer → updates the store
//      |
//      v
// UI updates (components re-render)
