'use strict';

const commands = require('../commands');
const c = new commands;
const { get_request_body } = require('../utils');
const response_obj = require('../api/response');
class routes {
  validate_route = async (req, res, os) => {
    if (req.url === "/v1/address/validate" 
      && req.method === "POST") {

      const body = await get_request_body(req);
      const email = body.split('=')[1];
      
      if (email) {
        try {
          const mx = await c.dig(email);

          if (mx) {
            const smtp_response = c.telnet(os, mx, 'test@example.org', email);

            response_obj(res, { email, is_valid: smtp_response });
          }
        } catch(e) {
          response_obj(res, {
            email,
            is_valid: false,
            reason: e
          });
        }
      }
    } else {
      response_obj(res, {
        status: 400,
        message: 'Invalid Request'
      });
    }
  }
}

module.exports = routes;
