'use strict';

const http = require('http');
const PORT = process.env.PORT || 5000;
const os = require('os');
const routes = require('./api/routes');
class postchi extends routes{
  constructor(os) {
    super();
    this.create_server(os);
    this.run_server();
  }

  create_server = (os) => {
    const server = http.createServer(async (req, res) => {
      const os_type = os.type();
      this.validate_route(req, res, os_type);
    });

    this.server = server;
  }

  run_server = () => {
    this.server.listen(PORT, () => {
      console.log(`postchi is running on: http://localhost:${PORT}`);
    });
  };
  
}

new postchi(os);

module.exports = postchi;
