const {addNUsers} = require("./query_functions/user_generator_function");

let numberAdded = process.argv[2];

let show = process.argv[3];

addNUsers(numberAdded, show);


