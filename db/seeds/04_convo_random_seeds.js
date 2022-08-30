const {addNConvos} = require("./query_functions/convo_generator_function");

let show = process.argv[2];

let sender = process.argv[3];
let receiver = process.argv[4];
let item = process.argv[5];

addNConvos(show, sender, receiver, item);


