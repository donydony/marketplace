const {addNMsgs} = require("./query_functions/msg_generator_function");

let numberAdded = process.argv[2];

let show = process.argv[3];

addNMsgs(numberAdded, show);


