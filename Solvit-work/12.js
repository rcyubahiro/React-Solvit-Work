// Convert the string "javascript-is-fun" into "Javascript Is Fun" using string built-in methods.
const text = "javascript-is-fun";

const result6 = text
  .split("-")                                 
  .map(word => word[0].toUpperCase() + word.slice(1)) 
  .join(" ");                                 

console.log(result6);