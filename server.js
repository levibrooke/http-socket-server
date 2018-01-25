const net = require(`net`);
const fs = require(`fs`);
const server = net.createServer();

server.on(`connection`, (socket) => {
  socket.setEncoding(`utf8`);
  console.log(`Connection established`);

  socket.on(`data`, (data) => {
    let request = data.toString().split(`\n`);
    console.log(request);
    request = request[0].split(` `);
    console.log(request);
    let http = request[2].trim();
    console.log(http);
    let uri = request[1].trim();
    console.log(uri);

    // parseRequest(data);
    console.log(http);

    socket.write(createResponse(http));
    
    socket.end();
  });

  socket.on(`end`, () => {
    console.log(`Client has disconnected.`);
  })
});

server.listen(8080, () => {
  console.log(`Server listening on port 8080`);
});

function parseRequest(data) {
  let request = data.toString().split(`\n`);
  console.log(request);
  request = request[0].split(` `);
  console.log(request);
  let http = request[2].trim();
  console.log(http);
  let uri = request[1].trim();
  console.log(uri);
}

function createResponse(http) {

  let date = new Date().toUTCString();

  // if (200) {
    return `${http} 200 OK\nServer: local server\nDate: ${date}\n\n<html><body>Success</body></html>`;
  // }

}