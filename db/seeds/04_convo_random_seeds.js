const {addNConvos} = require("./query_functions/convo_generator_function");

let numberAdded = process.argv[2];

let show = process.argv[3];

addNConvos(numberAdded, show);


