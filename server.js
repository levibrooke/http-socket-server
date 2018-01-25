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
    let request = parseRequest(data);
    socket.write(createResponse(request.http, request.uri));
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
  console.log(data);
  let parse = data.toString().split(`\n`);
  parse = parse[0].split(` `);
  method = parse[0].trim();
  uri = parse[1].trim();
  http = parse[2].trim();
  return {
    method: method,
    uri: uri,
    http: http 
  };
}

function createResponse(http, uri) {
  let date = new Date().toUTCString();

  if (uri === `/index` || uri === `/index.html` || uri === `/`) {
    return "" + http + " 200 OK\nServer: local server\nDate: " + date + "\n\n" + path.index + "";
  }
  if (uri === `/helium.html` || uri === `/helium`) {
    return "" + http + " 200 OK\nServer: local server\nDate: " + date + "\n\n" + path.helium + "";
  }
  if (uri === `/hydrogen.html` || uri === `/hydrogen`) {
    return "" + http + " 200 OK\nServer: local server\nDate: " + date + "\n\n" + path.hydrogen + "";
  }
  if (uri === `/css/styles.css`) {
    return "" + http + " 200 OK\nServer: local server\nDate: " + date + "\nContent-Type: text/css\n\n" + path.css + "";
  }
  else {
    return "" + http + " 404 NOT FOUND\nServer: local server\nDate: " + date + "\n\n" + path.fourOhFour + "";
  }
}