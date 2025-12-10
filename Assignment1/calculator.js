// Import all functions using ES6 import
import { add, subtract, multiply, divide, power } from "./operations.js";

// Call functions with sample values
const sum = add(20, 10);
const diff = subtract(25, 7);
const product = multiply(6, 5);
const quotient = divide(40, 5);
const pow = power(2, 4);

// Store inside an object
const results = { sum, diff, product, quotient, pow };

// Loop and display output
for (let key in results) {
  console.log(`${key} → ${results[key]}`);
}

