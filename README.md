# node-express-jwt-auth
    pass = test123

While signin:

1. hash pw and store in db
2. Instantly log the user in (create a jwt for them)
    1. create a jwt token and send it to the browser as http-only


while login:
1. get user from the DB using username and compare passwords
2. Create token for him. Send it to the browser as http-only