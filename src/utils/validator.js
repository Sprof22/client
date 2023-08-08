const Validator = require('validatorjs')


let data = {
  name: 'John',
  email: 'johndoe@gmail.com',
  age: 28
};

let rules = {
  name: 'required',
  email: 'required|email',
  age: 'min:18'
};

let validation = new Validator(data, rules);

// Check if the validation passes
let isValidationPassed = validation.passes(); // true

// Check if the validation fails
let isValidationFailed = validation.fails(); // false

console.log("Is validation passed?", isValidationPassed);
console.log("Is validation failed?", isValidationFailed);
