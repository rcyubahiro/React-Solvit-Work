const students = [
  { id: 1, name: "Jolivet", age: 24 },
  { id: 2, name: "Aline", age: 21 },
  { id: 3, name: "Kevin", age: 28 },
  { id: 4, name: "Sarah", age: 19 }
];

// 1. Search by ID
export const searchById = (id) => {
  const student = students.find(s => s.id === id);
  return student || "Student not found";
};

// 2. Search by Name (case-insensitive)
export const searchByName = (name) => {
  const lower = name.toLowerCase();
  const student = students.find(s => s.name.toLowerCase() === lower);
  return student || "No student with that name";
};

// 3. Filter by Age
export const filterByAge = (minAge) => {
  return students.filter(s => s.age >= minAge);
};
