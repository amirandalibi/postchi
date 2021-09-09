'use strict';

const get_domain = (url) => {
  const domain_address = url.split('@')[1];

  return domain_address;
}

const sort_mx = (arr) => {
  const sorted = Array.from(arr).sort((a,b) => b.priority - a.priority);
  
  return sorted[0].exchange;
}

const get_cmd = (os) => {
  if (/darwin/i.test(os)) {
    return 'nc';
  }
  return 'telnet';
}

function get_request_body(req) {
  return new Promise((resolve, reject) => {
    try {
      let body = '';
      // listen to data sent by client
      req.on('data', (chunk) => {
      // append the string version to the body
        body += chunk.toString();
      });
      // listen till the end
      req.on('end', () => {
        // send back the data
        resolve(body);
      });
    } catch (error) {
      reject(error);
    }
  });
}

const send_response = (res, valid, http_code) => {
  res.writeHead(
  http_code, {
    'Content-Type': 'application/json'
  });
  res.write(JSON.stringify({ 
    is_valid: valid,
  }));
  res.end();
}

module.exports = { 
  get_request_body,
  get_domain,
  send_response,
  sort_mx,
  get_cmd
};
