#! /usr/bin/env expect

# get and set arguments
set cmd [lindex $argv 0]
set host [lindex $argv 1]
set port [lindex $argv 2]
set from [lindex $argv 3]
set rcpt [lindex $argv 4]

# Start a telnet communication with the SMTP server
spawn $cmd $host $port;
expect "220"
send "EHLO $host\r";
expect "250"
send "MAIL FROM: <$from>\r";
expect "250"
send "RCPT TO: <$rcpt>\r";
expect "*"
send "QUIT\r"
expect eof
