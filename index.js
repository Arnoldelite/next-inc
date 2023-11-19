const express = require('express');
const expressWs = require('express-ws');
const resourceController = require('./controllers/resourceController');

const app = express();
expressWs(app);

// WebSocket server
app.ws('/ws', resourceController.handleSocketConnection);

// RESTful API server
app.use(express.json());
//Init Middleware
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));
//Route Index
const indexRouter = require("./routes.js");

app.use('/api/', indexRouter);


// Error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Internal Server Error');
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
