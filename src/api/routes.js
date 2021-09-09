'use strict';

const commands = require('../commands');
const { get_request_body, send_response } = require('../utils');

class routes extends commands{
  constructor(os) {
    super();
  }

  validate_route = async (req, res, os) => {
    if (req.url === "/v1/address/validate" 
      && req.method === "POST") {

      const body = await get_request_body(req);
      const email = body.split('=')[1];
      
      if (email) {
        try {
          const mx = await this.dig(email);
          if (mx) {
            const smtp_response = this.telnet(os, mx, 'test@example.org', email);

            send_response(res, smtp_response, 200);
          } else {
            send_response(res, 'Domain not found', 200);
          }
        } catch (e) {
          send_response(res, 'Domain not found', 200);
        }
      }
    } else {
      send_response(res, 'Invalid Request', 400);
    }
  }
}

module.exports = routes;
