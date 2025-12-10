//7-Chain methods to extract words longer than 4 characters, capitalize them, and 
//reverse the order:
const sentence = "Method chsining makes code clear and readable";

const result5 = sentence
  .split(" ")                                      
  .filter(word => word.length > 4)                
  .map(word => word[0].toUpperCase() + word.slice(1)) 
  .reverse();                                      

console.log(result5);