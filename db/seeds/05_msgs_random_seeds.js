const {addNMsgs} = require("./query_functions/msg_generator_function");

let numberAdded = process.argv[2];

let show = process.argv[3];

let setSenderId = Number(process.argv[4]);

let setConvoId = Number(process.argv[5]);

addNMsgs(numberAdded, show, setSenderId, setConvoId);


