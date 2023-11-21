//Simulated database to hold Resources and Clients info.
const data = require("../config/db.js");



// Get all CLient Side Resources
// @ GET request - public
exports.getAllResources = async (req, res) => {
  try {
    res.status(200).json(data.resources);
  } catch (e) {
	//error handling
    console.log(e);
  }
};

// Save CLient Side Resource
// @ POST request - public
exports.saveResource = async (req, res) => {
	const { body } = req;
	const id = Math.floor(Math.random() * 100);
  try {

  const newResource = {id: id, ...body};
  data.resources.push(newResource);
  res.status(200).json(newResource);
 
  } catch (e) {
    console.error("save Resource - error resource  id: " + id);
  }
};

// Delete CLient Side Resource
// @ DELETE request - public
exports.deleteResource = async (req, res) => {
	const { id } = req.params;

	try {
  	const index = data.resources.findIndex((resource) => resource.id === JSON.parse(id));
	if (index !== -1) {
		data.resources.splice(index, 1);
		res.sendStatus(204);
	} else {
		res.sendStatus(404);
	}
	} catch (e) {
	  //error handling and logging to console
	  console.error(e);
	}
  };

  // Get single CLient Side Resource
// @ GET request - public
  exports.getResource = async (req, res) => {
	try {
		const { id } = req.params;
		const index = data.resources.filter((resource) => resource.id === JSON.parse(id));
		if (index !== -1) {	
			res.status(200).json(index[0]);
		} else {
		  res.sendStatus(404);
		}
	} catch (e) {
	  //error handling and logging to console
	  console.error(e);
	}
  };

  // Get CLient Side Resources
// @ get request - public
  exports.handleSocketConnection = async (ws, req) => {
	data.clients.push(ws);
	try {
		ws.on('message', (message) => {
			console.log(`Received: ${message}`);

			data.clients.forEach((client) => {

			if (client !== ws && client.readyState === 1) {
				client.send(`Server: ${message}`);
			}

			});
		});

		ws.on('close', () => {
			const index = data.clients.indexOf(ws);
			if (index !== -1) {
			data.clients.splice(index, 1);
			}
		});

		setInterval(async () => {
			const resources = JSON.stringify(data.resources);
			ws.send(resources);
		}, 7000);
	} catch (e) {
	  //error handling and logging to console
	  console.error(e);
	}
  };