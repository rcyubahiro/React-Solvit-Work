// 6-From this list, return only the names of users with role "admin" and capitalize the 
//names:
const users = [
    { name: "alice", role: "admin" },
    { name: "role", role: "user" },
    { name: "charlie", role: "admin" }

];
const result4 = users
  .filter(user => user.role === "admin")        
  .map(user =>
    user.name[0].toUpperCase() + user.name.slice(1) 
  );

console.log(result4);