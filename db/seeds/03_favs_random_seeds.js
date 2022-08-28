const {addNFavs} = require("./query_functions/fav_generator_function");

let numberAdded = process.argv[2];

let show = process.argv[3];

addNFavs(numberAdded, show);


