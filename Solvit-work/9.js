// Using Object.entries() and map(), convert this object into an array of strings like "name: Alice":
const person = { name:"Alice", age:10, city: "Kigali"};
const result8 = Object.entries(person)
  .map(([key, value]) => `${key}: ${value}`);

console.log(result8);