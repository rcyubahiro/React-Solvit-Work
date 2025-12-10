// 5-Use method chaining to convert the following text into "Hello World"
const messyText = " hello_world ";


const result3 = messyText
  .trim()                          
  .replace("_", " ")               
  .toLowerCase()                   
  .split(" ")                      
  .map(word => word[0].toUpperCase() + word.slice(1)) 
  .join(" ");                      

console.log(result3);