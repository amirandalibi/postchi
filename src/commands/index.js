'use strict';

const { spawnSync } = require('child_process');
const { Resolver } = require('dns');
const resolver = new Resolver();
const { sort_mx, get_cmd, get_domain } = require('../utils');

resolver.setServers(['8.8.8.8']); //set to an external DNS

class commands {
  constructor(os) {
    this.os = os;
  }
  /**
   * Extract the domain name and check the NS and MX records
   * @param {String} rcpt email address
   * @returns Promise
   */
  dig = (rcpt) => {
    const domain_name = get_domain(rcpt);
  
    return new Promise((resolve, reject) => {
      resolver.resolveNs(domain_name, (error) => {
        if (error) {
          reject('No domain found');
        }
        resolver.resolveMx(domain_name, (err, addresses) => {
          if (err) {
            reject(err);
          } else {
            const sorted_mx = sort_mx(addresses);

            resolve(sorted_mx);
          }
        });
      });
    })
  }

  /**
  * Spawn a telnet command and talk to SMTP server
  * @param {Object} os - The os object
  * @param {String} host - MX host name
  * @param {String} from - The sender's email address
  * @param {String} rcpt - Email to be validated
  * @returns Boolean
  */
  telnet = (os, host, from, rcpt) => {
    const cmd = get_cmd(os.type);
    const telnet = spawnSync(
      'sh',
      [
        '-c',
        `expect ${__dirname}/netcat.tcl ${cmd} ${host} 25 ${from} ${rcpt}`
      ]);
    const resp = telnet.stdout.toString();

    if (!/550 /gm.test(resp)) {
      return true;
    }

    return false;
  }
}

module.exports = commands;
