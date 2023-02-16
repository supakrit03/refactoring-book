var employee = {
  eid: "E102",
  ename: "Jack",
  eaddress: "New York",
  salary: 50000,
};

console.log("Employee=> ", employee);
var newEmployee = Object.assign({}, employee); // Shallow copy
console.log("New Employee=> ", newEmployee);

console.log("---------After modification----------");
newEmployee.ename = "Beck";
console.log("Employee=> ", employee);
console.log("New Employee=> ", newEmployee);
