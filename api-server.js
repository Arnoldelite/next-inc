// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');

// app.use(bodyParser.json());

// const resources = [];

// app.post('/resources', (req, res) => {
//   const resource = req.body;
//   resources.push(resource);
//   res.status(201).json(resource);
// });

// app.get('/resources', (req, res) => {
//   res.json(resources);
// });

// app.delete('/resources/:id', (req, res) => {
//   const id = req.params.id;
//   const index = resources.findIndex((resource) => resource.id === id);

//   if (index !== -1) {
//     resources.splice(index, 1);
//     res.sendStatus(204);
//   } else {
//     res.status(404).json({ message: 'Resource not found' });
//   }
// });

// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`RESTful API server is running on port ${PORT}`);
// });
