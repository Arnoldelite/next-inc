// const Log = require("../models/log");
// const axios = require("axios");
const data = require("../config/db.js");
// const clients =  require('../config/db.js');



// Get CLient Side Resources
// @ get request - public
exports.getAllResources = async (req, res) => {
  try {
	console.log("resources >>", data.resources);

    res.status(200).json(data.resources);
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
  data.resources.push(newResource);
  res.status(200).json(newResource);
 
  } catch (e) {
    console.log("saveLog - error resource  id: " + id);
    return "Error saving log!";
  }
};

exports.deleteResource = async (req, res) => {
	const { id } = req.params;

	try {
  	const index = data.resources.findIndex((resource) => resource.id === JSON.parse(id));
	if (index !== -1) {
		data.resources.splice(index, 1);
		console.log("resources after delete removal>>", resources);
		res.sendStatus(204);
	} else {
		res.sendStatus(404);
	}
	} catch (e) {
	  //error handling
	  console.error(e);
	}
  };

  exports.getResource = async (req, res) => {
	try {
		const { id } = req.params;
		const index = data.resources.filter((resource) => resource.id === JSON.parse(id));
		if (index !== -1) {
			// res.sendStatus(204);
	
			res.status(200).json(index[0]);
		} else {
		  res.sendStatus(404);
		}
	} catch (e) {
	  //error handling
	  console.error(e);
	}
  };

  exports.handleSocketConnection = async (ws, req) => {

	data.clients.push(ws);

	try {
		ws.on('message', (message) => {
			console.log(`Received: ${message}`);
			data.clients.forEach((client) => {
				// console.log("currrent client >>", client);
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
			const cpuTemp = JSON.stringify(data.resources);
			// console.log("resources before broadcast >>", cpuTemp);
			console.log("resources before stringify >>", data.resources);
			ws.send(cpuTemp);
		}, 5000);
	} catch (e) {
	  //error handling
	  console.error(e);
	}
  };