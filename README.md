
next-inc

Task: 
Create a WebSocket server and a RESTful API server using Node.js.

• Requirements:
1. WebSocket server should be capable of handling multiple connections and
broadcasting messages to all connected clients. Print out the message from both
client side and server side in different connections.

2. RESTful API server should have at least three endpoints: one for creating
resources, one for reading resources, and one for deleting resources.

3. Implement error handling and logging.

4. Code should be clean, well-commented, and follow good coding practices.

5. Upload the code to a public GitHub repository.




Part 2: Follow-Up Questions
• Explain the architecture of your WebSocket server and RESTful API server. How have
you structured your code to handle different endpoints and requests efficiently?

- The basic architecture of the implemented websocket server and and RESTful API server typically follow the singleton pattern.

A Websocket server has been implemented to handle multiple connections. For testing purposes, there are two html clients in the `/Clients` folder, for a third client, you can use postman and connect to the web socket url `ws://localhost:3000/ws`. 
Open the developer console in order to see messages and from other clients and a periodic broadcast of the created resourses to all connected clients after starting the websocket server.

For the RESTful api server, 4 endpoints have been implmented, that are as follows: 

`GET http://localhost:3000/api/resources` //retrieve all created resources
`GET http://localhost:3000/api/resource/:id` //get single resource using id
`POST http://localhost:3000/api/resource` //create new resource, example resource format: {
    "name": "Bruce",
    "location": "Gotham"
} //id assigned to resource before it is saved.
`DELETE http://localhost:3000/api/resource/:id` // delete existing resource using id

Error handling and logging of errors to console have also been implemented as per the requirement.

• Discuss the design decisions, libraries, and frameworks used in your implementation.
Explain how your servers handle different types of requests and how they could be
extended or modified for additional functionality in the future.

- Tools used, For the server I made use of Nodejs server with express.js framework and http module. the ws module was also used on the server to implement the web socket. For the client, we made use of websocket APi implemented on every browser, link provided below.
websocket api: https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API
websocket module: https://www.npmjs.com/package/ws

The requests handled by the server for the "resource" follow the standard RESTful API structure GET, POST and DELETE have been used to implement points for creation, retrieval and deletion. Each end point handler catches and logs errors to the console, this can be improved / Extended to include implementation of custome error message util, logging errors using third party tool like graphana, prometheus or datadog to collect logged error as well as other useful metrics like details involving how the existing endpoints are usedby the client. The client right now uses standard html with pre-set messages to be sent. This can be improved by using components created using semantic html and some other framework like react to handle sate of the client application, accept custom input message and also render brodcased ? sent messages from other clients and the server.

- To start server, Navigate to parent directory and run `npm start`.