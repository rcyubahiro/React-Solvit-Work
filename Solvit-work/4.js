//  4-Using chaining, filter products that have a price over $100, then get their names in 
//uppercase:
const products = [
    {name: "Laptop", price: 1200 },
    {name: "Book", price: 10 },
    {name: "phone", price: 800 },
    {name: "pen", price: 2 }
];
const result2 = products
  .filter(item => item.price > 100)    
  .map(item => item.name.toUpperCase()); 

console.log(result2);