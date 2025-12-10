//1-Take the array below, double the values, filter out those less than 10, and sort them 
//descending:
const numbers = [2, 5, 8, 10, 3];


const result = numbers
  .map(num => num * 2)       
  .filter(num => num >= 10)  
  .sort((a, b) => b - a);    

console.log(result);










