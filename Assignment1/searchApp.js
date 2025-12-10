import { searchById, searchByName, filterByAge } from "./search.js";

// Test ID
console.log(`Search by ID:`, searchById(1));
console.log(`Search by ID:`, searchById(99));

// Test Name
console.log(`Search by Name:`, searchByName("joLiVeT"));
console.log(`Search by Name:`, searchByName("Unknown"));

// Test Age Filter
console.log(`Students aged 21 and above:`, filterByAge(21));
