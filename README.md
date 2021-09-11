# postchi

postchi is ~~a gender neutral Farsi word for mail carrier~~ an email validation tool that checks the authenticity of an email address without sending any email.

# API
### POST /v1/address/validate

Request example:

```bash
curl -XPOST -H 'Authorization: Basic api_token' \
    http://localhost:5000/v1/address/validate \
    -d email=user@domain.com
```
Example of successful mailbox verification result:
```json
{
    "address": "postchi@realdomain.com",
    "is_disposable_address": false,
    "is_valid": true
}
```
Example of a failed mailbox verification result:
```json
{
    "address": "non-existent-inbox@realdomain.com",
    "is_disposable_address": false,
    "is_valid": false,
    "reason": 'mailbox_does_not_exist'
}
```
