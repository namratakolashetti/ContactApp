const bodyParser = require("body-parser");
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("./db.json");

server.use(
  jsonServer.defaults({
    watch: true
  })
);

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.use('/api', router);

server.listen(5310, () => {
  console.log("JSON Server is running");
});
