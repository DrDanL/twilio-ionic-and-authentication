# twilio-ionic-and-authentication

For a detailed explanation of the code please visit the following blog posts:

Front-api-interface-server: https://www.leightley.com/mean-stack-user-authentication-and-sms-validation-with-twilio-authy-part-1-2-developing-the-api/

Login-app: https://leightley.com/mean-stack-user-authentication-and-sms-validation-with-twilio-authy-part-2-2-creating-the-ionic-app/

# Running the backend server
First navigate to front-api-interface-server in the terminal and execute the following:

```
npm install
```

After installing the required packages, populate an .env or execute. Example below:

```
export TWILIO_ACCOUNT_SID=XX
export TWILIO_AUTH_TOKEN=XX
export TWILIO_NUMBER=+44000000
export AUTHY_API_KEY=XXX
export MONGO_URL='mongodb://localhost/LoginExample'
export APP_SECRET='lalalalala'
export enableValidationSMS=1
```

Please note that you will need to obtain your own unique SID, Token, API keys and
Twilio number from Twilio and Authy.

Then run nodemon and your backend should be operating. Check using Postman
