// Use array methods to remove duplicates from the following list and sort it 
//alphabetically:
const skills = ["JS", "React", "Node", "JS", "React"];
const  lowerCase=skills.map(skill => skill.toLocaleLowerCase());
const uniqueSkills = [...new Set(skills)]
  .sort();                              

console.log(uniqueSkills);