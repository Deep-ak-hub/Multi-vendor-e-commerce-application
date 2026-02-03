const http = require("http");
const app = require("./src/config/express.config");
const { mongoDbInit } = require("./src/config/mongodb.config");

const server = http.createServer(app);

const HOST = "127.0.0.1";
const PORT = 9005;

(async () => {
  try {
    await mongoDbInit()
    server.listen(PORT, HOST, (err) => {
      if (!err) {
        console.log(`Server is running on the port ${PORT}`);
        console.log(`Press CTRL C to disconnect the server....`);
      }
    });
  } catch (exception) {
    console.log("error in server access");
    process.exit(1);
  }
})();
