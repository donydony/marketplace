const {addNItems} = require("./query_functions/item_generator_function");

let numberAdded = process.argv[2];

let show = process.argv[3];

addNItems(numberAdded, show);


