const net = require(`net`);
const server = net.createServer();
const path = {
  index: require(`./index.js`),
  helium: require(`./helium.js`),
  hydrogen: require(`./hydrogen.js`),
  fourOhFour: require(`./404.js`),
  css: require(`./style.js`)
}

server.on(`connection`, (socket) => {
  socket.setEncoding(`utf8`);
  console.log(`Connection established`);

  socket.on(`data`, (data) => {
    let request = data.toString().split(`\n`);
    request = request[0].split(` `);
    let http = request[2].trim();
    let uri = request[1].trim();
    // parseRequest(data);

    socket.write(createResponse(http, uri));
    socket.end();
  });

  socket.on(`end`, () => {
    console.log(`Client has disconnected.`);
  })
});

server.listen(8080, () => {
  console.log(`Server listening on port 8080`);
});

// function parseRequest(data) {
//   let request = data.toString().split(`\n`);
//   request = request[0].split(` `);
//   let http = request[2].trim();
//   let uri = request[1].trim();
// }

function createResponse(http, uri) {

  let date = new Date().toUTCString();

  if (uri === `/index` || uri === `/`) {
    // return `${http} 200 OK\nServer: local server\nDate: ${date}\n\n${path[`/index`]}`;
    return "" + http + " 200 OK\nServer: local server\nDate: " + date + "\n\n" + path.index + "";
  }
  if (uri === `/helium.html`) {
    return "" + http + " 200 OK\nServer: local server\nDate: " + date + "\n\n" + path.helium + "";
  }
  if (uri === `/hydrogen.html`) {
    return "" + http + " 200 OK\nServer: local server\nDate: " + date + "\n\n" + path.hydrogen + "";
  }
  if (uri === `/css/styles.css`) {
    return "" + http + " 200 OK\nServer: local server\nDate: " + date + "\nContent-Type: text/css\n\n" + path.css + "";
  }
  else {
    return "" + http + " 404 NOT FOUND\nServer: local server\nDate: " + date + "\n\n" + path.fourOhFour + "";
  }
}