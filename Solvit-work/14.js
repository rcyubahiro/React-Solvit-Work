// Refactor the following code into a clean method chain:
const arr = [1, 3, 4, 5];
// const doubled = arr.map(n =>n * 2);
// const even = doubled.filter(n => n % 2 === 0);
// const total = even.reduce((sum, va1) => sum + va1, 0);
const total = arr
  .map(n => n * 2)               
  .filter(n => n % 2 === 0)      
  .reduce((sum, val) => sum + val, 0); 

console.log(total);
