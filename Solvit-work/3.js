//3-Given this array of strings, remove empty strings, convert all to lowercase, and 
//reverse the order:
const tags = ["JS" , "", "React" , "NODE" , "", "Express"];

const result1 = tags
  .filter(tag => tag !== "")     
  .map(tag => tag.toLowerCase()) 
  .reverse();                    

console.log(result1);