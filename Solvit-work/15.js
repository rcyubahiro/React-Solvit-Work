//Write a reusable function formatNames that takes an array of names and returns a 
//string of capitalized names, sorted alphabetically and joined with a comma. Use 
//chaining.
//formatNames(["bob", "Alice", "david"])

function formatNames(names) {
  return names
    .map(name => name[0].toUpperCase() + name.slice(1).toLowerCase()) 
    .sort()                                                            
    .join(", ");                                                       
}


console.log(formatNames(["bob", "Alice", "david"]));



// function formatNames(names) {
//   return names
//     .map(name =>
//       name
//         .split(" ")                                       // Split full name into words
//         .map(word => word[0].toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
//         .join(" ")                                        // Join words back
//     )
//     .sort()                                              // Alphabetical order
//     .join(", ");                                        // Join names with comma
// }

// // Example usage:
// console.log(formatNames(["bob smith", "Alice Johnson", "david lee"]));
// // Output: "Alice Johnson, Bob Smith, David Lee"
