'use strict';

const response = (res, obj) => {
  const headers = { 'Content-Type': 'application/json' };
  let { 
    status = 200,
    is_disposable_address,
    reason = '',
    is_valid,
    email
  } = obj;

  res.writeHead(
    status,
    headers
  );
  
  res.write(
    JSON.stringify({ 
      address: email,
      is_valid,
      ...(is_disposable_address && {is_disposable_address}),
      ...(reason.length && {reason})
    })
  );
  res.end();
}

module.exports = response;
