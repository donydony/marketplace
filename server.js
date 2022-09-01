// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');

const PORT = process.env.PORT || 8080;
const app = express();

const io = require('socket.io')(3000, {
  cors: { origin: "http://localhost:8080" }
});

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userApiRoutes = require('./routes/users-api');
const widgetApiRoutes = require('./routes/widgets-api');
const userRoutes = require('./routes/user');
const userFavRoutes = require('./routes/user-fav');
const messagesRoutes = require('./routes/messages');
const loginRoutes = require('./routes/login');
const postItemRoutes = require('./routes/post-item');
const registerRoutes = require('./routes/register');
const inboxRoutes = require('./routes/inbox');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/users', userApiRoutes);
app.use('/api/widgets', widgetApiRoutes);
app.use('/user', userRoutes);
app.use('/user/fav',userFavRoutes);
app.use('/messages', messagesRoutes);
app.use('/login',loginRoutes);
app.use('/post-item',postItemRoutes);
app.use('/register',registerRoutes);
app.use('/inbox',inboxRoutes);
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {
  res.render('index');
});

io.on('connection', (socket) => {
  console.log('a user has connected! id: ', socket.id);
  socket.on('send-message', (message) => {
    io.emit('receive-message', message);
  });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
