// const Log = require("../models/log");
// const axios = require("axios");
const resources = require("../config/db.js");
const clients =  require('../config/db.js');



// Get CLient Side Resources
// @ get request - public
exports.getAllResources = async (req, res) => {
  try {
	console.log("resources >>", resources);

    res.status(200).json(resources);
  } catch (e) {
	//error handling
    console.log(e);
  }
};

exports.saveResource = async (req, res) => {
	const { body } = req;
	let id =Math.floor(Math.random() * 100);
  try {

  const newResource = {id: id, ...body};
  resources.push(newResource);
  res.status(200).json(newResource);
 
  } catch (e) {
    console.log("saveLog - error resource  id: " + id);
    return "Error saving log!";
  }
};

exports.deleteResource = async (req, res) => {
	const { id } = req.params;

	try {
  	const index = resources.findIndex((resource) => resource.id === JSON.parse(id));
	if (index !== -1) {
		resources.splice(index, 1);
		console.log("resources after delete removal>>", resources);
		res.sendStatus(204);
	} else {
		res.sendStatus(404);
	}
	} catch (e) {
	  //error handling
	  console.log(e);
	}
  };

  exports.getResource = async (req, res) => {
	try {
		const { id } = req.params;
		const index = resources.filter((resource) => resource.id === JSON.parse(id));
		if (index !== -1) {
			// res.sendStatus(204);
	
			res.status(200).json(index[0]);
		} else {
		  res.sendStatus(404);
		}
	} catch (e) {
	  //error handling
	  console.log(e);
	}
  };

  exports.handleSocketConnection =  (ws, req) => {
//   exports.handleSocketConnection = async (ws, req) => {
	
	clients.push(ws);

	console.log("clients >>", clients.length);

	

	// try {

		ws.on('message', (message) => {
			console.log(`Received: ${message}`);
			clients.forEach((client) => {
				// console.log("currrent client >>", client);
			if (client !== ws && client.readyState === 1) {
				client.send(`Server: ${message}`);
			}
			});
		});

		ws.on('close', () => {
			const index = clients.indexOf(ws);
			if (index !== -1) {
			clients.splice(index, 1);
			}
		});

		setInterval(async () => {
			const cpuTemp = JSON.stringify(resources);
			ws.send(cpuTemp);
		}, 5000);
	// } catch (e) {
	//   //error handling
	//   console.log(e);
	// }
  };